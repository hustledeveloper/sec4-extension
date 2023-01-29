chrome.storage.local.get("apitoken", function (data) {
  let tokenone = data.apitoken;
  isValidToken(tokenone);
});
function isValidToken(mytoken) {
  // check if token is not undefined or null
  if (mytoken === undefined || mytoken === null) {
    // redirect to login page
    window.location.replace("./popup-sign-in.html");
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
      window.location.replace("./popup-sign-in.html");
    }
  } else {
    // redirect to login page
    window.location.replace("./popup-sign-in.html");
  }
}
const giris_button = document.querySelector("#go");


giris_button.addEventListener("click", (e) => {
  e.preventDefault();
  window.location.replace("./popup-sign-in.html");
});

const guest_buton = document.querySelector("#sign-up");



guest_buton.addEventListener("click", (e) => {
  e.preventDefault();
  const url = "https://app.securityforeveryone.com/sign-up";
  chrome.tabs.create({ url: url });
});
