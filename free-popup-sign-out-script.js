const cikis_buton = document.querySelector(".cikis");
const go_to_verified_button = document.querySelector("#verified-btn");
const navbar_scan_butonu = document.querySelector(".navbar-scan");
const scan_butonu = document.querySelector("#free-scan");
const go_scan_butonu = document.querySelector("#scan-btn");

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
      <option id="${place.slug}" class="tool-button">
      
        <span class="name">${ScanName}</span>
      
      </option>
    `;
    })
    .join("");

  suggestions.innerHTML = html;
  document.querySelector("#free-scan").style.display = "block";
  document.querySelector("#scan-btn").style.display = "block";
  document.querySelector(".suggestions").size = matchArray.length;
  document.querySelector(".suggestions").style.display = "block";
}

const searchInput = document.querySelector(".search-input");
const suggestions = document.querySelector(".suggestions");

searchInput.addEventListener("change", displayMatches);
searchInput.addEventListener("keyup", displayMatches);

//autocompleteautocompleteautocompleteautocompleteautocompleteautocompleteautocomplete
const searchIn = document.querySelector(".search-input");
const select = document.querySelector(".suggestions");

searchIn.addEventListener("focus", () => {
  select.style.display = "block";
});

select.addEventListener("change", (event) => {
  searchIn.value = event.target.value;
  select.style.display = "none";
});


go_scan_butonu.addEventListener("click", () => {
  const selectedOption = document.querySelector(".suggestions option:checked");
  if (selectedOption) {
    let takeslug = selectedOption.id;
    chrome.storage.local.set({ scan_aktive: takeslug }).then(() => {});
    window.location.replace("./popup-sign-out.html");
  }
});
scan_butonu.addEventListener("click", () => {
  const selectedOption = document.querySelector(".suggestions option:checked");
  if (selectedOption) {
    const url = "https://securityforeveryone.com/tools/" + selectedOption.id;
    let takeslug = selectedOption.id;
    chrome.storage.local.set({ scan_aktive: takeslug }).then(() => {});
    chrome.tabs.create({ url: url });
  }
});
select.addEventListener("change", (event) => {
  const selectedOption = document.querySelector(".suggestions option:checked");
  if (selectedOption) {
    let takeslug = selectedOption.id;
    chrome.storage.local.set({ scan_aktive: takeslug }).then(() => {});
  }
  searchIn.value = event.target.value;
  searchIn.style.width = event.target.value.length * 9 + "px";
  searchIn.style.lineHeight = "20px";
  searchIn.style.height = "40px";
  select.style.display = "none";
});
