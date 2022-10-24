
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

/*
//CLİCK FONKSİYONU ESKİ TASARIM
giris_buton.addEventListener('click', () => {
    chrome.runtime.sendMessage({ message: 'login' }, function (response) {
        if (response === 'success') window.location.replace("./popup-sign-out.html");
    });
});

//LOGİN FONKSİYONU ESKİ TASARIM

const form = {
    email: document.querySelector(".signin-email"),
    password: document.querySelector(".signin-password"),
    submit: document.querySelector(".gir"),
    messages: document.getElementById("form-messages"),
  };
  let button = form.submit.addEventListener('click', (e) => {
    e.preventDefault();
    const login = "https://core-test.s4e.link/api/user/login";
  
    fetch(login, {
      method: "POST",
      headers: {
        'Accept :application/json, text/plain',
        'Content-Type : application/json' 
      },
      body: JSON.stringify({
        email: form.email.value,
        password: form.password.value,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        // code here //
        if (data.error) {
          alert("Error Password or Username"); /*displays error message
        } else {
          window.location.replace("./popup-sign-out.html");
        }
      })
      .catch((err) => {
        console.log(err);
      });


      //LOGİN PARAMETRELERİ
        email: form.email.value,
        password: form.password.value,
  });
  */
  const form = {

    submit: document.querySelector("#gir"),
    messages: document.getElementById("form-messages"),
  };
  let button = form.submit.addEventListener('click', (e) => {
    e.preventDefault();
    fetch ('https://core.securityforeveryone.com/api/user/login ', {
      method: "POST",
      headers: {
        'Accept': 'application/json, text/plain, */*',
        'Content-Type': 'application/json'
      },
       body: JSON.stringify({

        "email": "faruk008887@gmail.com000",
        "password": "Ankara.832",
      }),
  })
    .then((response) => response.json())
    .then((result) => {
      if(result.message === "login: true"){
        alert("You are logged in.");
        window.location.replace("./popup-sign-out.html");
       } else {
        alert("Please check your login information");
       }
    });
  });

  