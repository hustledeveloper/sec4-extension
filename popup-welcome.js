
const giris_button = document.querySelector('#go');

giris_button.addEventListener('mouseover', () => {
    giris_button.style.backgroundColor = 'black';
    giris_button.style.color = 'white';
    giris_button.style.transform = 'scale(1.3)';
});

giris_button.addEventListener('mouseleave', () => {
    giris_button.style.backgroundColor = '#ee2c1e';
    giris_button.style.color = 'white';
    giris_button.style.transform = 'scale(1)';
});
giris_button.addEventListener('click', (e) => {
  e.preventDefault();
  window.location.replace("./popup-sign-in.html");
});



const guest_buton = document.querySelector('#guest');

guest_buton.addEventListener('mouseover', () => {
    guest_buton.style.backgroundColor = 'black';
    guest_buton.style.color = 'white';
    guest_buton.style.transform = 'scale(1.3)';
});

guest_buton.addEventListener('mouseleave', () => {
    guest_buton.style.backgroundColor = '#ee2c1e';
    guest_buton.style.color = 'white';
    guest_buton.style.transform = 'scale(1)';
});


guest_buton.addEventListener('click', (e) => {
    e.preventDefault();
    window.location.replace("./free-popup-sign-out.html");
    });



    