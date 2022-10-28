const search = document.querySelector('#scantipi');
//SEARCH BÖLÜMÜ freetolls dan veri arayacak şekilde ayarla
const todos = document.querySelectorAll('ul li');
const notFound = document.querySelector('#notFound');

search.addEventListener('keyup', filterFunctionality);

function filterFunctionality(e) {
  let searching = e.target.value.toLowerCase();

  // Filters the search
  [...todos].forEach(todo => {
    let todoContent = todo.textContent;
    if (todoContent.toLowerCase().includes(searching)) {
      todo.style.display = 'block';
    } else {
      todo.style.display = 'none';
    }
  });

  // Displays No search Found
  let result = [...todos].every(todo => {
    return todo.style.display === 'none';
  });

  result === true
    ? (notFound.style.display = 'block')
    : (notFound.style.display = 'none');
}
//TASARIM
const cikis_buton = document.querySelector('.cikis');

cikis_buton.addEventListener('mouseover', () => {
    cikis_buton.style.backgroundColor = 'black';
    cikis_buton.style.color = 'white';
    cikis_buton.style.transform = 'scale(1.3)';
});

cikis_buton.addEventListener('mouseleave', () => {
    cikis_buton.style.backgroundColor = '#ee2c1e';
    cikis_buton.style.color = 'white';
    cikis_buton.style.transform = 'scale(1)';
});

//logout butonu
cikis_buton.addEventListener('click', (e) => {
  e.preventDefault();
  window.location.replace("./popup-sign-in.html");
  });

const scan_butonu = document.querySelector('.scan');
//TASARIM
scan_butonu.addEventListener('mouseover', () => {
    scan_butonu.style.backgroundColor = 'black';
    scan_butonu.style.color = 'white';
    scan_butonu.style.transform = 'scale(1.3)';
});

scan_butonu.addEventListener('mouseleave', () => {
    scan_butonu.style.backgroundColor = '#ee2c1e';
    scan_butonu.style.color = 'white';
    scan_butonu.style.transform = 'scale(1)';
});

//SCAN CLICK
document.querySelector('form').addEventListener("#scan", event => {
  event.preventDefault();

  const asset = document.querySelector('#url').value;
  const slug = document.querySelector('#scantipi').value;

  if (asset && slug) {
      chrome.runtime.sendMessage({ message: 'premium-search', 
    payload: { asset, slug }},
    function (response) {
        if (response === 'success')
        window.location.replace("./popup-sign-in.html");
        //buraya scan raporu linki konacak
          
});
  } else {
      document.querySelector('#url').placeholder = "Enter an url.";
      document.querySelector('#scan').placeholder = "Enter a scan.";
  }
});
