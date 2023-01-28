const cikis_buton = document.querySelector(".cikis");
const reset_asset_buton = document.querySelector(".reset-asset");
const scan_butonu = document.querySelector(".scan");
const change_asset_buton = document.querySelector(".change-asset");
const go_to_verified_button = document.querySelector("#verified-btn");
const navbar_scan_butonu = document.querySelector(".navbar-scan");

navbar_scan_butonu.addEventListener("click", () => {
  window.location.replace("./popup-sign-in.html");
});

//go verified
go_to_verified_button.addEventListener("click", () => {
  window.location.replace("./verified-asset.html");
});
go_to_verified_button.addEventListener("mouseover", () => {
  go_to_verified_button.style.backgroundColor = "black";
  go_to_verified_button.style.color = "white";
});

go_to_verified_button.addEventListener("mouseleave", () => {
  go_to_verified_button.style.backgroundColor = "#1879c0";
  go_to_verified_button.style.color = "white";
});

//SCAN
scan_butonu.addEventListener("click", () => {
  chrome.runtime.connect({ name: "scan_port" }).postMessage("start_scan");
});

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

reset_asset_buton.addEventListener("mouseover", () => {
  reset_asset_buton.style.backgroundColor = "black";
  reset_asset_buton.style.color = "white";
});

reset_asset_buton.addEventListener("mouseleave", () => {
  reset_asset_buton.style.backgroundColor = "#1879c0";
  reset_asset_buton.style.color = "white";
});
reset_asset_buton.addEventListener("click", () => {
  chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
    let activeTab = tabs[0];
    let asseturl = activeTab.url;
    let url = new URL(asseturl);
    let hostname = url.hostname;
    chrome.storage.local.set({ asseturl: hostname }).then(() => {});
  });
});

cikis_buton.addEventListener("mouseover", () => {
  cikis_buton.style.backgroundColor = "black";
  cikis_buton.style.color = "white";
});

cikis_buton.addEventListener("mouseleave", () => {
  cikis_buton.style.backgroundColor = "#1879c0";
  cikis_buton.style.color = "white";
});

//logout butonu, apitokeni sıfırlayıp çıkış yapıyor
cikis_buton.addEventListener("click", () => {
  let apitoken = chrome.storage.local.get(["apitoken"]);
  apitoken = 0;
  chrome.storage.local.set({ apitoken: apitoken }).then(() => {});
  window.location.replace("./popup-welcome.html");
});

scan_butonu.addEventListener("mouseover", () => {
  scan_butonu.style.backgroundColor = "black";
  scan_butonu.style.color = "white";
});

scan_butonu.addEventListener("mouseleave", () => {
  scan_butonu.style.backgroundColor = "#1879c0";
  scan_butonu.style.color = "white";
});

change_asset_buton.addEventListener("mouseover", () => {
  change_asset_buton.style.backgroundColor = "black";
  change_asset_buton.style.color = "white";
});

change_asset_buton.addEventListener("mouseleave", () => {
  change_asset_buton.style.backgroundColor = "#1879c0";
  change_asset_buton.style.color = "white";
});
//elle asset girme butonu
change_asset_buton.addEventListener("click", () => {
  let assetnew = document.querySelector("#new-asset").value;
  chrome.storage.local.set({ asseturl: assetnew }).then(() => {});
});

//autocomplete
const endpoint =
  "https://gist.githubusercontent.com/Miserlou/c5cd8364bf9b2420bb29/raw/2bf258763cdddd704f8ffd3ea9a3e81d25e2c6f6/cities.json";

const cities = [];

// fetch grabs endpoint - at this point a promise and generates readablestream
fetch(endpoint)
  .then((blob) => blob.json())
  .then((data) => cities.push(...data));

function findMatches(keyword, cities) {
  return cities.filter((place) => {
    // does city or state match? use paramater regex
    const regex = new RegExp(keyword, "gi");
    return place.city.match(regex) || place.state.match(regex);
  });
}

// add results to HTML li
function displayMatches() {
  const matchArray = findMatches(this.value, cities);
  const html = matchArray
    .map((place) => {
      const regex = new RegExp(this.value, "gi");
      const cityName = place.city.replace(
        regex,
        `<span class="highlight">${this.value}</span>`
      );
      const stateName = place.state.replace(
        regex,
        `<span class="hl">${this.value}</span>`
      );

      return `
      <li>
        <span class="name">${cityName}, ${stateName}</span>
        <span class="population">${place.population}</span>
      </li>
    `;
    })
    .join("");

  suggestions.innerHTML = html;
}

const searchInput = document.querySelector(".search-input");
const suggestions = document.querySelector(".suggestions");

searchInput.addEventListener("change", displayMatches);
searchInput.addEventListener("keyup", displayMatches);
