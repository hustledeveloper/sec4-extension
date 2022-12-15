const search = document.querySelector("#scantipi");
//SEARCH BÖLÜMÜ freetolls dan veri arayacak şekilde ayarla
const todos = document.querySelectorAll("ul li");
const notFound = document.querySelector("#notFound");

search.addEventListener("keyup", filterFunctionality);

function filterFunctionality(e) {
  let searching = e.target.value.toLowerCase();

  // Filters the search
  [...todos].forEach((todo) => {
    let todoContent = todo.textContent;
    if (todoContent.toLowerCase().includes(searching)) {
      todo.style.display = "block";
    } else {
      todo.style.display = "none";
    }
  });

  // Displays No search Found
  let result = [...todos].every((todo) => {
    return todo.style.display === "none";
  });

  result === true
    ? (notFound.style.display = "block")
    : (notFound.style.display = "none");
}
//TASARIM
const cikis_buton = document.querySelector(".cikis");

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
cikis_buton.addEventListener("click", (e) => {
  e.preventDefault();
  window.location.replace("./popup-sign-in.html");
});

const scan_butonu = document.querySelector(".scan");
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

//SCAN CLICK
document.querySelector("form").addEventListener("#scan", (event) => {
  event.preventDefault();

  const asset = document.querySelector("#url").value;
  const slug = document.querySelector("#scantipi").value;

  if (asset && slug) {
    chrome.runtime.sendMessage(
      { message: "premium-scan", payload: { asset, slug } },
      function (response) {
        if (response === "success")
          window.location.replace("./popup-sign-in.html");
        //buraya scan raporu linki konacak
      }
    );
  } else {
    document.querySelector("#url").placeholder = "Enter an url.";
    document.querySelector("#scan").placeholder = "Enter a scan.";
  }
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
