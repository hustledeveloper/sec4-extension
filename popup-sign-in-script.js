const giris_butonu = document.querySelector('.giris');

giris_butonu.addEventListener('mouseover', () => {
    giris_butonu.style.backgroundColor = 'black';
    giris_butonu.style.color = 'white';
    giris_butonu.style.transform = 'scale(1.3)';
});

giris_butonu.addEventListener('mouseleave', () => {
    giris_butonu.style.backgroundColor = '#ee2c1e';
    giris_butonu.style.color = 'white';
    giris_butonu.style.transform = 'scale(1)';
});

giris_butonu.addEventListener('click', () => {
    chrome.runtime.sendMessage({ message: 'login' }, function (response) {
        if (response === 'success') window.location.replace("./popup-sign-out.html");
    });
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

/*
 

scan e tıklayınca alınan url ve seçilen scan formatı ile fetch yapıp sonucu döndürmesini istiyorum

sonucun linkini döndür, linke tıklayıp siteye gidecek site trafiğini artırır

scan_butonu .addEventListener('click'){


const scanComplete = async (scan) => {
    const response = await fetch(`https://api.securityforeveryone.com/api/scans/list=${scanID+url?}`, {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'

        },
   
    });

    const data = await response.json()
    console.log(data);  
    }
};
 */


const search = document.querySelector('#search');
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
