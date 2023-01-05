# Security for Everyone Chrome Extension

# yeni eklenenler

1. api token sıfırlama özelliği eklendi ve logout gibi çalışıyor
2. asseti aktif tab olarak alıp resetleme eklendi
3. asseti elle girip kaydetme eklendi
4. login-logout kontrolü kurdum. Tokenin 0 olma durumuna göre free scan ya da memeber scan kısmına yönlendiriyor
5. eski login kısmına ait, usename ve password ile çalıması tasarladığım kısımları çıkardım, kodları biraz temizledim
6. options kısmı 2 tane değer için notificatin on/off seçeneğine sahip, faz 2 de eklenebilir bildirimler.

# ocak öncesi notları

[DONE]1-blog notification için seçenekleri options'ta ayarlayıp kaydedebiliyoruz bunu siteye bağlamak için https://core-test.s4e.link/api/blog/feed mevcut, bu xml, rss formatında. buradan kaynak olarak kullanabilirsin.

[DONE]2-api token alıyor, bunu lokalde saklayıp istendiğinde js dosyalarından veya bg'dan erişebiliyor, konsola yazabiliyor bununla fetch atabiliyor. Bu kısma ekleyeceklerim: "api tokenin 0'dan farklı olup olmamasına göre login olma kontrolü kuracağım. Ayrıca logout butonu tokeni sıfırlayacak şekilde değiştireceğim, tokeni sıfırlamak için logout a bağla token sıfırdan farklı ise oto giriş yap sıfırsa girmesini isteyecek şekilde ayarla 2. uygundur, aslında tam login logout olduğu anlamına gelmiyor bu. ama yine de bu şekilde kullanılabilir.

3-search için autocomplite açık kaynak ekledim, ama siteye entegre etme kısmı kafamı çok karıştırınca onu sonraya bıraktım. 3. export const list = ({ page, per_page, query, scan_parent_id, min_score, max_score }) => {
return request.post(${apiPrefix}/list, { page, per_page, query, scan_parent_id, min_score, max_score })
} apiPrefix: api/scans/ core-test ile kullanabilirsin. burada standart page 1, per-page 100 tanımlayabilrisin. query'e arama verini girebilirsin.

[DONE]4-asseti aktif tab iken alıyorum bg script'te. assetin default value su aktif tab olarak lokalde saklanıyor, consol'a yazılabiliyor veya çağrılıp başka js dosyalarından erişilebiliyor. sıfırlayıp yeni asset girip kaydetme seçeneği koyacağım. 4. uygundur
4-assetin default value su aktif tab olacak, clear edip kendisi asset girebilecek,aktif tabı alma butonu koy, sıfırlayıp url girip kaydetme seçeneği koy. asseti i alıp kaydeden bg, bundan messaging ile sign in popup'a mesaj yolla onu bir şekilde html e yansıt

5-job slug id döndürme 5. aynı şekilde bunları hallettikten sonraki adım.
5-job slug id dönecek, ondan bizim apin report sayfasına girip detaylara baksın
https://app.securityforeveryone.com/reports/77d7c031-b505-4038-acf3-f31ddd702bf3 buraya gönderen link tanımla, oldukça basit, api call yolla sonuç için sonuc çıkana kadar, response farklı olunca linki user'a yolla.

## Installation

To use the Chrome extension, please follow the steps below:

1. Install the Chrome browser
2. Go to the address: `chrome://extensions`
3. Enable `Developer mode` (found on the top right of the screen)
4. Click the `Load unpacked` button and select the folder housing the chrome extension
5. The extension should be installed and you can use it!

# Kaynaklar

1. [Google dökümanı](https://developer.chrome.com/docs/extensions/mv3/)
   Burada chrome extension ile alakalı hemen her şey var
2. Sorunlar için stackoverflow
3. Github
4. CRX extension source viewer, bu eklenti ile google eklenti marketindeki eklentilerin kaynak kodu anında görüntülenebilir

# Dosyaların Açıklamaları

1. manifest file
   extension'ın kimliği sayılabilecek dosya, MV3 formatında(güncel) hazırladım, kaynakların tanıtıldığı, eklentinin adlandırıldığı dosya
2. background.js
   extension çalıştığı sürece arka planda çalışan js dosyası, temel işlevler burada yapılır
3. content-script.js
   açık olan sekmede değişiklik yapmak için js dosyası(örneğin dark mode sekmeyi dark tema yapar). Bizim açık sayfa ile alakalı bir işlemimiz olmadığı için dosya boş, ama sayfalara bildirim vermek isterseniz, yeni blog yazısı veya scan sonuçları için buraya ekleyebiliriz, sayfanın köşesinde buton veya uyarı olarak çıkabilir.
4. sayfalar ve onlara ait js dosyaları
   her ekrana ait html ve js dosyaları var,
   giriş ekranını(popup-welcome.html)
   login olursak kullanıcı search ekranına,
   use as guest butonuna tıklarsak free search ekranına yönlendiriyor.
   bu 2 ekran da kendi search sistemlerine sahipler(free ve user olarak ayrı)
