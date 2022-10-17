const giris_butonu = document.querySelector('.giris');

giris_butonu.addEventListener('mouseover', () => {
    giris_butonu.style.backgroundColor = 'black';
    giris_butonu.style.color = 'white';
    giris_butonu.style.transform = 'scale(1.3)';
});

giris_butonu.addEventListener('mouseleave', () => {
    giris_butonu.style.backgroundColor = '#ee2c1e';
    giris_butonu.style.color = 'white';
    giris_butonu.style.transform = 'scale(1)';
});

giris_butonu.addEventListener('click', () => {
    chrome.runtime.sendMessage({ message: 'login' }, function (response) {
        if (response === 'success') window.location.replace("./popup-sign-out.html");
    });
});


const scan_butonu = document.querySelector('.scan');

scan_butonu.addEventListener('mouseover', () => {
    scan_butonu.style.backgroundColor = 'black';
    scan_butonu.style.color = 'white';
    scan_butonu.style.transform = 'scale(1.3)';
});

scan_butonu.addEventListener('mouseleave', () => {
    scan_butonu.style.backgroundColor = '#ee2c1e';
    scan_butonu.style.color = 'white';
    scan_butonu.style.transform = 'scale(1)';
});

/*
scan_butonu .addEventListener('click', () => {

scan e tıklayınca alınan url ve seçilen scan formatı ile fetch yapıp sonucu döndürmesini istiyorum

const response = await fetch(`https://api.securityforeveryone.com/api/scans/list' + url + scan formatı , {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
              
    };
});

      // 9 saniye bekle scan sonucu için 
await delay(20000);

 sonucun linkini döndür, linke tıklayıp siteye gidecek site trafiğini artırır




*/
// bunun sitede search yapması lazım
search.onchange = () => {
    link.href = `https://google.com/search?q=${encodeURIComponent(search.value)}`
 }