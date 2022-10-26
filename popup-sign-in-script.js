
const giris_buton = document.querySelector('#gir');

giris_buton.addEventListener('mouseover', () => {
    giris_buton.style.backgroundColor = 'black';
    giris_buton.style.color = 'white';
    giris_buton.style.transform = 'scale(1.3)';
});

giris_buton.addEventListener('mouseleave', () => {
    giris_buton.style.backgroundColor = '#ee2c1e';
    giris_buton.style.color = 'white';
    giris_buton.style.transform = 'scale(1)';
});
giris_buton.addEventListener('click', () => {
  chrome.runtime.sendMessage({ message: 'login' }, function (response) {
      if (response === 'success') window.location.replace("./popup-sign-out.html");
  });
});z