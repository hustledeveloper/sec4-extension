const cikis_buton = document.querySelector(".cikis");
const scan_butonu = document.querySelector(".free-scan");


cikis_buton.addEventListener("mouseover", () => {
  cikis_buton.style.backgroundColor = "black";
  cikis_buton.style.color = "white";
});

cikis_buton.addEventListener("mouseleave", () => {
  cikis_buton.style.backgroundColor = "#1879c0";
  cikis_buton.style.color = "white";
});

//logout butonu
cikis_buton.addEventListener("click", () => {
  window.location.replace("./popup-sign-in.html");
});

scan_butonu.addEventListener("mouseover", () => {
  scan_butonu.style.backgroundColor = "black";
  scan_butonu.style.color = "white";
});

scan_butonu.addEventListener("mouseleave", () => {
  scan_butonu.style.backgroundColor = "#1879c0";
  scan_butonu.style.color = "white";
});
//SCAN
scan_butonu.addEventListener("click", () => {
  chrome.runtime.connect({ name: "scan_port" }).postMessage("start_scan");
});

