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
document.querySelector('form').addEventListener('submit', event => {
    event.preventDefault();

    const email = document.querySelector('#username').value;
    const pass = document.querySelector('#password').value;

    if (email && password) {
        chrome.runtime.sendMessage({ message: 'login', 
      payload: { email, pass }},
      function (response) {
          if (response === 'success')
              window.location.replace('./popup-sign-out.html');
  });
    } else {
        document.querySelector('#username').placeholder = "Enter a username.";
        document.querySelector('#password').placeholder = "Enter a password.";
    }
});