const cikis_buton = document.querySelector(".cikis");
const go_to_verified_button = document.querySelector("#verified-btn");
const navbar_scan_butonu = document.querySelector(".navbar-scan");
const scan_butonu = document.querySelector("#scan");
//scan sayfasına gidecek sonra
navbar_scan_butonu.addEventListener("click", () => {
  window.location.replace("./free-popup-sign-out.html");
});
//go verified
go_to_verified_button.addEventListener("click", () => {
  window.location.replace("./verified-asset.html");
});
//logout butonu, apitokeni sıfırlayıp çıkış yapıyor
cikis_buton.addEventListener("click", () => {
  chrome.storage.local.set({ apitoken: 0 }).then(() => {});
  window.location.replace("./popup-welcome.html");
});

//SCAN butonu
scan_butonu.addEventListener("click", () => {
  chrome.runtime.connect({ name: "scan_port" }).postMessage("start_scan");
});


//hata mesajları
chrome.runtime.onMessage.addListener((message) => {
  if (message.type === "error") {
    document.getElementById("warning-message").innerHTML = message.message;
    document.getElementById("warning-message").style.display = "block";
  }
});
//asseti gösterme
chrome.storage.local.get("asseturl", function (result) {
  const myValue = result.asseturl;
  const inputElement = document.getElementById("assetaktive");
  inputElement.innerText = myValue;
});
//scan type gösterme
chrome.storage.local.get("scan_aktive", function (result) {
  const myValue = result.scan_aktive;
  const inputElement = document.getElementById("scan_aktive");
  inputElement.innerText = myValue;
});

