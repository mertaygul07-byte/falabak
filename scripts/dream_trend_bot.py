import os
import time
import json
import requests
from pytrends.request import TrendReq
from openai import OpenAI
from datetime import datetime

# ==========================================
# AYARLAR VE YAPILANDIRMA
# ==========================================
OPENAI_API_KEY = os.getenv("OPENAI_API_KEY", "buraya_openai_api_anahtarinizi_yazin")
CMS_API_URL = os.getenv("CMS_API_URL", "https://falabak.com/wp-json/wp/v2") # Örnek WordPress REST API
CMS_USER = os.getenv("CMS_USER", "admin")
CMS_APP_PASSWORD = os.getenv("CMS_APP_PASSWORD", "uygulama_sifresi")

# OpenAI İstemcisi
client = OpenAI(api_key=OPENAI_API_KEY)

def get_trending_dreams():
    """
    1. Google Trends Entegrasyonu
    Türkiye lokasyonunda 'rüyada' kelimesiyle bağlantılı ve son 24 saatte aniden yükselişe geçen (rising) aramaları çeker.
    """
    print(f"[{datetime.now()}] Trendler kontrol ediliyor...")
    pytrends = TrendReq(hl='tr-Tr', tz=-180)
    
    # Hedef anahtar kelimeler
    kw_list = ["rüyada", "rüyada görmek", "rüya tabiri"]
    
    trending_terms = []
    
    for kw in kw_list:
        try:
            # Son 1 günlük veriyi TR lokasyonunda çeker
            pytrends.build_payload([kw], cat=0, timeframe='now 1-d', geo='TR', gprop='')
            related_queries = pytrends.related_queries()
            
            # İlgili kelime için yükselen (rising) aramalar
            if related_queries and kw in related_queries and related_queries[kw]['rising'] is not None:
                rising_df = related_queries[kw]['rising']
                # DataFrame içerisinden sadece sorgu metinlerini al
                terms = rising_df['query'].tolist()
                trending_terms.extend(terms)
        except Exception as e:
            print(f"Hata oluştu ({kw}): {e}")
            time.sleep(2)
            
    # Benzersiz hale getir ve listeyi döndür
    return list(set(trending_terms))

def is_topic_exist(trend_term):
    """
    2. Çakışma Kontrolü
    Mevcut sistemde (veritabanı veya CMS) bu rüya tabiri var mı kontrol eder.
    REST API veya doğrudan Veritabanı sorgusu kullanılabilir.
    """
    print(f"'{trend_term}' sistemde var mı kontrol ediliyor...")
    # Örnek WordPress araması:
    try:
        response = requests.get(
            f"{CMS_API_URL}/posts",
            params={'search': trend_term},
            auth=(CMS_USER, CMS_APP_PASSWORD)
        )
        if response.status_code == 200:
            posts = response.json()
            if len(posts) > 0:
                print(f"-> '{trend_term}' zaten sistemde mevcut. Atlanıyor.")
                return True
    except Exception as e:
        print(f"Çakışma kontrolünde hata: {e}")
        
    return False

def generate_dream_article(trend_term):
    """
    3. Yapay Zeka API (OpenAI) ile İçerik Üretimi
    Mistik bir dil kullanarak makale, başlık, etiket ve meta açıklaması üretir.
    JSON formatında geri döndürür.
    """
    print(f"'{trend_term}' için yapay zeka içerik üretiyor...")
    
    system_prompt = """Sen alanında son derece uzman, mistik enerjileri ve psikolojiyi çok iyi bilen kadim bir rüya tabircisisin. 
    Yazdığın yazılar SEO uyumlu, okuyucuyu içine çeken ve akıcı bir dile sahip olmalıdır. Çıktıyı MUTLAKA geçerli bir JSON formatında vermelisin."""
    
    user_prompt = f"""
    Lütfen "{trend_term}" konusu hakkında detaylı ve özgün bir rüya tabiri makalesi oluştur.
    
    İçerik Şartları:
    1. İçerik H2 ve H3 başlıkları içersin.
    2. Hem mistik/ruhsal anlamına hem de psikolojik anlamına değin.
    3. Diyanet veya İslami yorumlara da (uygunsa) saygılı bir dilde yer ver.
    4. Makale yaklaşık 400-600 kelime arası olsun.
    
    Bana sonucun tam olarak şu JSON yapısında olmasını sağla (başka bir şey ekleme):
    {{
        "title": "SEO uyumlu etkileyici bir başlık",
        "content": "HTML formatında makale içeriği (<h1> kullanma, <h2>, <h3>, <p>, <ul> kullan)",
        "meta_description": "Arama motorları için 150 karakterlik çarpıcı bir meta açıklama",
        "tags": ["etiket1", "etiket2", "rüya tabiri", "vs"]
    }}
    """
    
    try:
        response = client.chat.completions.create(
            model="gpt-4o", # veya gpt-3.5-turbo
            response_format={ "type": "json_object" },
            messages=[
                {"role": "system", "content": system_prompt},
                {"role": "user", "content": user_prompt}
            ],
            temperature=0.7,
        )
        
        result_json = response.choices[0].message.content
        return json.loads(result_json)
    except Exception as e:
        print(f"İçerik üretilirken hata oluştu: {e}")
        return None

def get_or_create_tag(tag_name):
    """
    WordPress REST API üzerinden etiket (tag) ID'sini bulur veya yoksa oluşturur.
    """
    try:
        # Önce etiket var mı diye bak
        response = requests.get(
            f"{CMS_API_URL}/tags",
            params={'search': tag_name},
            auth=(CMS_USER, CMS_APP_PASSWORD)
        )
        tags = response.json()
        if tags and len(tags) > 0:
            # Tam eşleşen etiketi bul
            for tag in tags:
                if tag['name'].lower() == tag_name.lower():
                    return tag['id']
                    
        # Yoksa yeni etiket oluştur
        post_response = requests.post(
            f"{CMS_API_URL}/tags",
            json={'name': tag_name},
            auth=(CMS_USER, CMS_APP_PASSWORD)
        )
        if post_response.status_code == 201:
            return post_response.json()['id']
    except Exception as e:
        print(f"Etiket işleminde hata ({tag_name}): {e}")
    return None

def save_to_cms_as_draft(article_data):
    """
    4. Siteye Entegrasyon
    Üretilen makaleyi 'Taslak' (Draft) olarak WordPress'e gönderir.
    Etiketleri ve SEO meta verilerini (Yoast/RankMath) ekler.
    """
    print(f"Makale taslak olarak WordPress'e kaydediliyor: {article_data['title']}")
    
    # Kategori ID'si (Örn: Rüya Tabirleri kategorisi ID'si)
    category_id = 5 
    
    # Etiketleri ID'ye çevir
    tag_ids = []
    if 'tags' in article_data:
        for tag_name in article_data['tags']:
            t_id = get_or_create_tag(tag_name)
            if t_id:
                tag_ids.append(t_id)
    
    payload = {
        'title': article_data['title'],
        'content': article_data['content'],
        'excerpt': article_data['meta_description'],
        'status': 'draft', # Taslak olarak kaydeder
        'categories': [category_id],
        'tags': tag_ids,
        
        # Eğer WordPress'te özel alanlar (Custom Fields / Meta) REST API'ye açıksa
        # RankMath veya Yoast SEO metalarını bu şekilde gönderebilirsiniz:
        'meta': {
            'rank_math_description': article_data['meta_description'], # RankMath için
            '_yoast_wpseo_metadesc': article_data['meta_description'], # Yoast SEO için
            'rank_math_focus_keyword': article_data['tags'][0] if article_data.get('tags') else ''
        }
    }
    
    try:
        response = requests.post(
            f"{CMS_API_URL}/posts",
            json=payload,
            auth=(CMS_USER, CMS_APP_PASSWORD)
        )
        
        if response.status_code == 201:
            print("-> Makale BAŞARIYLA eklendi!")
        else:
            print(f"-> Makale eklenirken hata! Kod: {response.status_code}, Mesaj: {response.text}")
    except Exception as e:
        print(f"CMS entegrasyonu hatası: {e}")

def main():
    print("=== TREND RÜYA TABİRİ OTOMASYONU BAŞLADI ===")
    trending_terms = get_trending_dreams()
    
    if not trending_terms:
        print("Bugün için yeni bir trend bulunamadı veya bağlantı hatası oluştu.")
        return

    print(f"Bulunan Trendler: {trending_terms}")

    # Çok fazla makale üretmemek için limiti belirtebiliriz (örn: günde en fazla 3 tane)
    limit = 3
    processed = 0
    
    for term in trending_terms:
        if processed >= limit:
            break
            
        # Eğer bu rüya daha önce yazılmadıysa işlem yap
        if not is_topic_exist(term):
            article_data = generate_dream_article(term)
            
            if article_data:
                save_to_cms_as_draft(article_data)
                processed += 1
                
            # API sınırlarına takılmamak için biraz bekleme
            time.sleep(5)
            
    print("=== OTOMASYON TAMAMLANDI ===")

if __name__ == "__main__":
    main()
