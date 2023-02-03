//token check
chrome.storage.local.get("apitoken", function (data) {
  let tokenone = data.apitoken;
  isValidToken(tokenone);
});
function isValidToken(mytoken) {
  if (mytoken === undefined || mytoken === null || mytoken === 0) {
    window.location.replace("./popup-sign-in.html");
  }
}
//token check
const cikis_buton = document.querySelector(".cikis");
const go_to_verified_button = document.querySelector("#verified-btn");
const navbar_scan_butonu = document.querySelector(".navbar-scan");

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
  window.location.replace("./popup-sign-in.html");
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
  if (myValue === undefined || myValue === null) {
    const inputElement = document.getElementById("assetaktive");
    inputElement.innerText = "Please send an asset";
  } else {
    const inputElement = document.getElementById("assetaktive");
    inputElement.innerText = myValue;
  }
});
//scan type gösterme
chrome.storage.local.get("scan_shown", function (result) {
  const myValue = result.scan_shown;
  if (myValue === undefined || myValue === null) {
    const inputElement = document.getElementById("scan_shown");
    inputElement.innerText = "Please choose a scan";
  } else {
    const inputElement = document.getElementById("scan_shown");
    inputElement.innerText = myValue;
  }
});
/*
scan button bir timer a bağlandı, yapacağım şu olacak ilerde:
bu timer normal scande değil verified asset scande ve nonpaid member için(günlük sınırlı hakkı olan)
çalışacak, onun verified asset scanleri arasında sayaç çalışacak ve 5 dakika sonra ona hakkın yenilendi diye küçük bir bildirim yollayacak.
bunu ertesi gün 3 hakkına tekrar kavuştuğunda da yapacak. bu şekilde kullanım alışkanlığını 
artırmak ve bu adamı verified asset scanlerini her gün yapmaya teşvik ederekn daha sonra sınırsız hak için pro olmasını sağlamak
*/

let timeLeft = 0;
let timerInterval = null;

document.addEventListener("DOMContentLoaded", function () {
  const timerDiv = document.getElementById("timer");
  const scanButton = document.getElementById("scan");

  // Load timer from storage
  chrome.storage.local.get("timer", function (data) {
    if (data.timer) {
      timeLeft = data.timer;
    }

    scanButton.addEventListener("click", () => {
      if (timeLeft > 0) {
        timerDiv.innerHTML =
          "Your package's daily limit exceeded. Please wait " +
          timeLeft +
          " seconds";
        return;
      }

      // Start timer
      timeLeft = 10;
      timerDiv.innerHTML = "";

      // Send scan message
      chrome.runtime.connect({ name: "scan_port" }).postMessage("start_scan");

      timerInterval = setInterval(function () {
        if (timeLeft <= 0) {
          clearInterval(timerInterval);
          timerDiv.innerHTML = "";
          return;
        }

        timeLeft--;
        timerDiv.innerHTML =
          "Your package's daily limit exceeded. Please wait " +
          timeLeft +
          " seconds";

        // Save timer to storage
        chrome.storage.local.set({ timer: timeLeft });
      }, 1000);
    });

    if (timeLeft > 0) {
      timerDiv.innerHTML =
        "Your package's daily limit exceeded. Please wait " +
        timeLeft +
        " seconds";
      timerInterval = setInterval(function () {
        if (timeLeft <= 0) {
          clearInterval(timerInterval);
          timerDiv.innerHTML = "";
          return;
        }

        timeLeft--;
        timerDiv.innerHTML =
          "Your package's daily limit exceeded. Please wait " +
          timeLeft +
          " seconds";

        // Save timer to storage
        chrome.storage.local.set({ timer: timeLeft });
      }, 1000);
    }
  });
});
