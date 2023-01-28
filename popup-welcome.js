// Check if the user is logged in with token
chrome.storage.local.get("apitoken", function (data) {
  let tokenone = data.apitoken;
  isValidToken(tokenone);
});
function isValidToken(mytoken) {
  // check if token is not undefined or null
  if (mytoken === undefined || mytoken === null) {
    // redirect to login page
    window.location.replace("./free-popup-sign-out.html");
    return;
  }
  // check if token length is between 32 and 256 characters
  if (mytoken.length >= 32 && mytoken.length <= 256) {
    //check if token contains only uppercase and lowercase letters, numbers and underscore
    const valid = /^[a-zA-Z0-9_\-]*$/.test(mytoken);
    if (valid) {
      // redirect to main page
      window.location.replace("./popup-sign-out.html");
    } else {
      // redirect to login page
      window.location.replace("./free-popup-sign-out.html");
    }
  } else {
    // redirect to login page
    window.location.replace("./free-popup-sign-out.html");
  }
}

const giris_button = document.querySelector("#go");

giris_button.addEventListener("mouseover", () => {
  giris_button.style.backgroundColor = "black";
  giris_button.style.color = "white";
});

giris_button.addEventListener("mouseleave", () => {
  giris_button.style.backgroundColor = "#1879c0";
  giris_button.style.color = "white";
});
giris_button.addEventListener("click", (e) => {
  e.preventDefault();
  window.location.replace("./popup-sign-in.html");
});

const guest_buton = document.querySelector("#guest");

guest_buton.addEventListener("mouseover", () => {
  guest_buton.style.backgroundColor = "black";
  guest_buton.style.color = "white";
});

guest_buton.addEventListener("mouseleave", () => {
  guest_buton.style.backgroundColor = "#1879c0 ";
  guest_buton.style.color = "white";
});

guest_buton.addEventListener("click", (e) => {
  e.preventDefault();
  window.location.replace("./free-popup-sign-out.html");
});
