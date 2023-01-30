const cikis_buton = document.querySelector(".cikis");
const go_to_verified_button = document.querySelector("#verified-btn");
const navbar_scan_butonu = document.querySelector(".navbar-scan");
const scan_butonu = document.querySelector("#free-scan");
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
  let apitoken = chrome.storage.local.get(["apitoken"]);
  apitoken = 0;
  chrome.storage.local.set({ apitoken: apitoken }).then(() => {});
  window.location.replace("./popup-welcome.html");
});

//SCAN
scan_butonu.addEventListener("click", () => {
  chrome.runtime.connect({ name: "scan_port" }).postMessage("start_scan");
});

//autocompleteautocompleteautocompleteautocompleteautocompleteautocompleteautocomplete

const endpoint =
  "https://gist.githubusercontent.com/hustledeveloper/3b82ed0e1291f2c990e076cd375b2830/raw/bb592f2a3aa02a3acd332889420b52ba8215afcc/Scan-tools-list.json";

const names = [];

fetch(endpoint)
  .then((blob) => blob.json())
  .then((data) => names.push(...data));

function findMatches(keyword, names) {
  return names.filter((place) => {
    const regex = new RegExp(keyword, "gi");
    return place.name.match(regex);
  });
}

// add results to HTML li
function displayMatches() {
  const matchArray = findMatches(this.value, names);
  const html = matchArray
    .map((place) => {
      const regex = new RegExp(this.value, "gi");
      const ScanName = place.name.replace(
        regex,
        `<span class="hl">${this.value}</span>`
      );
      return `
      <li>
      <a href="https://securityforeveryone.com/tools/${place.slug}" target="_blank">
        <span class="name">${ScanName}</span>
        </a>
       
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
