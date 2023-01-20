const cikis_buton = document.querySelector(".cikis");
const reset_asset_buton = document.querySelector(".reset-token");
const scan_butonu = document.querySelector(".scan");
const change_asset_buton = document.querySelector(".change-asset");
//SCAN CLICK düzenlemeler yapılacak
scan_butonu.addEventListener("click", () => {
  chrome.runtime.connect({ name: "scan_port" }).postMessage("start_scan");
});
//asseti gösterme
chrome.storage.local.get("asseturl", function (result) {
  const myValue = result.asseturl;
  const inputElement = document.getElementById("assetaktive");
  inputElement.innerText = myValue;
});
//scan type yansıtıcı olacak bu
chrome.storage.local.get("scan_aktive", function (result) {
  const myValue = result.scan_aktive;
  const inputElement = document.getElementById("scan_aktive");
  inputElement.innerText = myValue;
});

//TASARIM

reset_asset_buton.addEventListener("mouseover", () => {
  reset_asset_buton.style.backgroundColor = "black";
  reset_asset_buton.style.color = "white";
  reset_asset_buton.style.transform = "scale(1.3)";
});

reset_asset_buton.addEventListener("mouseleave", () => {
  reset_asset_buton.style.backgroundColor = "#6366F1";
  reset_asset_buton.style.color = "white";
  reset_asset_buton.style.transform = "scale(1)";
});
reset_asset_buton.addEventListener("click", () => {
  chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
    var activeTab = tabs[0];
    var asseturl = activeTab.url;
    var url = new URL(asseturl);
    var hostname = url.hostname;
    chrome.storage.local.set({ asseturl: hostname }).then(() => {});
  });
});

cikis_buton.addEventListener("mouseover", () => {
  cikis_buton.style.backgroundColor = "black";
  cikis_buton.style.color = "white";
  cikis_buton.style.transform = "scale(1.3)";
});

cikis_buton.addEventListener("mouseleave", () => {
  cikis_buton.style.backgroundColor = "#6366F1";
  cikis_buton.style.color = "white";
  cikis_buton.style.transform = "scale(1)";
});

//logout butonu

cikis_buton.addEventListener("click", () => {
  let apitoken = chrome.storage.local.get(["apitoken"]);
  apitoken = 0;

  chrome.storage.local.set({ apitoken: apitoken }).then(() => {});
  //token sıfırlandı bildirimi gönderilmeli
  window.location.replace("./popup-welcome.html");
});

//TASARIM
scan_butonu.addEventListener("mouseover", () => {
  scan_butonu.style.backgroundColor = "black";
  scan_butonu.style.color = "white";
  scan_butonu.style.transform = "scale(1.3)";
});

scan_butonu.addEventListener("mouseleave", () => {
  scan_butonu.style.backgroundColor = "#6366F1";
  scan_butonu.style.color = "white";
  scan_butonu.style.transform = "scale(1)";
});

change_asset_buton.addEventListener("mouseover", () => {
  change_asset_buton.style.backgroundColor = "black";
  change_asset_buton.style.color = "white";
  change_asset_buton.style.transform = "scale(1.3)";
});

change_asset_buton.addEventListener("mouseleave", () => {
  change_asset_buton.style.backgroundColor = "#6366F1";
  change_asset_buton.style.color = "white";
  change_asset_buton.style.transform = "scale(1)";
});
change_asset_buton.addEventListener("click", () => {
  let assetnew = document.querySelector("#new-asset").value;
  chrome.storage.local.set({ asseturl: assetnew }).then(() => {});
});

//autocompleteautocompleteautocompleteautocompleteautocompleteautocompleteautocomplete

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
//autocompleteautocompleteautocompleteautocompleteautocompleteautocompleteautocomplete
