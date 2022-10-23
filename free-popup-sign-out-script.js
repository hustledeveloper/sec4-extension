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
  window.location.replace("./popup-welcome.html");
  });



const scan_butonu = document.querySelector('.scan');

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


const search = document.querySelector('#search');
//bunu freetolls dan veri arayacak şekilde ayarla
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

/*
// search e tıklayınca bütün free tools tarama isimlerini alsın ve bunu search bara bağlayalım

const form = {
  submit: document.querySelector("#search"),
};
let button = form.submit.addEventListener('click', (e) => {
  e.preventDefault();
  fetch ('https://core.securityforeveryone.com/api/scans/list', {
    method: "POST",
    headers: {
      'Accept': 'application/json, text/plain',
      'Content-Type': 'application/json'
    },
     body: JSON.stringify({
    }),
})
  .then((response) => response.json())
  .then((freetools) => {
  console.log(freetools);
  });
});
*/
/*
 
//scan e tıklayınca alınan url ve seçilen scan formatı ile fetch yapıp sonucu döndürmesini istiyorum
//sonucun linkini döndür, linke tıklayıp siteye gidecek site trafiğini artırır

scan_butonu.addEventListener('click', (e) => {
  e.preventDefault();
  fetch ('https://api.securityforeveryone.com/api/scans/', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
        },
      body: JSON.stringify({
       "url": "url",
       "slug": "scan name",
     }),
   
    });

    const data = await response.json()
    console.log(data);  
    }
};
 */