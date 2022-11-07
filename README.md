# Security for Everyone Chrome Extension

# Yapacaklarımın listesi

Branch'e eklenenler:
5- options page eklendi, bildirim seçeneklerini alıp kaydediyor, bunu bloga ve yeni tool bildirimine bağlarım sonra

Branch öncesi versiyonda olmayanlar:
1-api token al, bunu lokalde sakla api call atarken kullan scan vs ile, bununla giriş yapılacak şekilde pass ve username menüsünü modifiye et
chrome.storage.sync.set(
chrome.storage.sync.get(
kullanılacak çükü api anahtarını bir kere alacak ve hep kullanacak, çıkış yapmak istediğinde bu anahtar sıfırlanacak

2-search için autocomplite açık kaynak bulup ekleyeceğim

3-asseti aktif tab iken al
assetin default value su aktif tab olacak, clear edip kendisi asset girebilecek

4-job slug id dönecek, ondan bizim apin report sayfasına girip detaylara baksın

5-blog notification, optionsa blog bildirimi yoll/yollama koy, yeni tool geldibilirimi al /alma

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
