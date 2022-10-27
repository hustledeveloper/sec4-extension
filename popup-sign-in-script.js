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