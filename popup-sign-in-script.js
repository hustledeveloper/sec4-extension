const giris_buton = document.querySelector("#gir");

giris_buton.addEventListener("mouseover", () => {
  giris_buton.style.backgroundColor = "black";
  giris_buton.style.color = "white";
});

giris_buton.addEventListener("mouseleave", () => {
  giris_buton.style.backgroundColor = "#1879c0";
  giris_buton.style.color = "white";
});

document.querySelector("form").addEventListener("submit", (event) => {
  event.preventDefault();
  let apitoken = document.querySelector("#api-token").value;
  //apitoken localde kaydedildi
  isValidToken(apitoken);
});
function isValidToken(mytoken) {
  if (mytoken === undefined || mytoken === null) {
    document.getElementById("warning-message").style.display = "block";
    return;
  }
  if (mytoken.length < 32) {
    document.getElementById("warning-message").innerHTML =
      "Token 32 karakterden küçük olamaz";
    document.getElementById("warning-message").style.display = "block";
    return;
  }
  if (mytoken.length > 256) {
    document.getElementById("warning-message").innerHTML =
      "Token 256 karakterden büyük olamaz";
    document.getElementById("warning-message").style.display = "block";
    return;
  }
  const valid = /^[a-zA-Z0-9_\-]*$/.test(mytoken);
  if (!valid) {
    document.getElementById("warning-message").innerHTML =
      "Token geçerli karakterler içermelidir";
    document.getElementById("warning-message").style.display = "block";
  }
  if (valid) {
    let apitoken = document.querySelector("#api-token").value;
    chrome.storage.local.set({ apitoken: apitoken }).then(() => {});
    window.location.replace("./popup-welcome.html");
  }
}
