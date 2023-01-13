// Check if the user is logged in

chrome.storage.local.get("apitoken", function (data) {
  if (data.apitoken !== 0) {
    // buraya tokenin kontrölü için bir kısım eklenecek
    //gerçek bir token mi kontrol edilecek membere sokmadan önce
    //bg a send message ile token check yap
    chrome.runtime.sendMessage("token_check", (response) => {});
    window.location.replace("./popup-sign-out.html");
  } else {
    // User is not logged in, redirect to login page
    window.location.replace("./free-popup-sign-out.html");
  }
});

const giris_button = document.querySelector("#go");

giris_button.addEventListener("mouseover", () => {
  giris_button.style.backgroundColor = "black";
  giris_button.style.color = "white";
  giris_button.style.transform = "scale(1.3)";
});

giris_button.addEventListener("mouseleave", () => {
  giris_button.style.backgroundColor = "#6366F1";
  giris_button.style.color = "white";
  giris_button.style.transform = "scale(1)";
});
giris_button.addEventListener("click", (e) => {
  e.preventDefault();
  window.location.replace("./popup-sign-in.html");
});

const guest_buton = document.querySelector("#guest");

guest_buton.addEventListener("mouseover", () => {
  guest_buton.style.backgroundColor = "black";
  guest_buton.style.color = "white";
  guest_buton.style.transform = "scale(1.3)";
});

guest_buton.addEventListener("mouseleave", () => {
  guest_buton.style.backgroundColor = "#6366F1 ";
  guest_buton.style.color = "white";
  guest_buton.style.transform = "scale(1)";
});

guest_buton.addEventListener("click", (e) => {
  e.preventDefault();
  window.location.replace("./free-popup-sign-out.html");
});
