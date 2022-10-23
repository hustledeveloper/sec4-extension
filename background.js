   //update olunca kullanıcıya bildirim gönderen fonksiyon(bunu lokalde deneme imkanım yok ama çalışıyordur muhtemelen)
   chrome.runtime.onUpdateAvailable.addListener( hasUpdate );
   function hasUpdate( e ) {
       console.log( 'hasUpdate', e );
       chrome.runtime.reload();
   }

//extension yüklenince konsola bildirim gönderen fonksiyon
chrome.runtime.onInstalled.addListener(() => {
    console.log("Extension have been successfully installed!");
  });


/*
//BU KISMI OAUTH2 GİRİSİ İÇİN YAPMIŞTIM
const DISCORD_URI_ENDPOINT = 'https://discord.com/api/oauth2/authorize';
const CLIENT_ID = encodeURIComponent('1028594481588604938');
const RESPONSE_TYPE = encodeURIComponent('token');
const REDIRECT_URI = encodeURIComponent(chrome.identity.getRedirectURL());
const SCOPE = encodeURIComponent('identify email');
const STATE = encodeURIComponent('meet' + Math.random().toString(36).substring(2, 15));

console.log(chrome.identity.getRedirectURL)

let user_signed_in = false;

function create_auth_endpoint() {
    let nonce = encodeURIComponent(Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15));

    let endpoint_url =
        `${DISCORD_URI_ENDPOINT}
?client_id=${CLIENT_ID}
&redirect_uri=${REDIRECT_URI}
&response_type=${RESPONSE_TYPE}
&scope=${SCOPE}
&nonce=${nonce}`;

    return endpoint_url;
}

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if (request.message === 'login') {
        chrome.identity.launchWebAuthFlow({
            url: create_auth_endpoint(),
            interactive: true
        }, function (redirect_uri) {
            if (chrome.runtime.lastError || redirect_uri.includes('access_denied')) {
                console.log("Could not authenticate.");
                sendResponse('fail');
            } else {
                user_signed_in = true;
                sendResponse('success');
            }
        });

        return true;
    } else if (request.message === 'logout') {
        user_signed_in = false;

        sendResponse('success');
    }
});
*/
/* 
// TOKEN YAZIM FORMATLARI

          //'Authorization': 'Bearer ' + token
          //'Authorization' : `Bearer ${token}`

  // TOKEN İLE FETCH YAPMA      
try{
    const response = await fetch('https://core-test.s4e.link/api/scan-group/list', {
        method: "GET",
        headers: {
          'Accept': 'application/json, text/plain, ',
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ${token}',
        },
         
    }) 
      const result = await response.json();
      console.log(result);
    } catch (err) {
      console.log(err);
         
https://core.securityforeveryone.com/api/user/login  bu sitede kullanılan api , benim hesapla da çalışıyor
https://core-test.s4e.link/api/user/login bu sadece onur beyin hesabı ile çalışıyor
https://core.securityforeveryone.com/api/scans/list

// kendi mailim ile de çalışan api yok, çalışan tek login apisi onur beyin adresi ile çalışıyor
get ile veri çeken, token almayan apiler çalışıyor:

https://core-test.s4e.link/api/health-check
https://core-test.s4e.link/api/blog/feed
https://core-test.s4e.link/api/sitemap/sitemap
bunlar çalışıyor.
       "email": "faruk008887@gmail.com",
       "password": "Ankara.832",
} 

*/
chrome.runtime.onInstalled.addListener(onInstalled);
async function onInstalled() {
 try {
   const response = await fetch('https://core.securityforeveryone.com/api/user/login ', {
     method: "POST",
     headers: {
       'Accept': 'application/json, text/plain, */*',
       'Content-Type': 'application/json',
     },
      body: JSON.stringify({     

        "email": "faruk008887@gmail.com",
        "password": "Ankara.832",
     }),
 }) 
   const result = await response.json();
   console.log(result);
 } catch (err) {
   console.log(err);
 }
}


    chrome.runtime.onInstalled.addListener(deneme);
    async function deneme() {
     try {
       const response = await fetch('https://core.securityforeveryone.com/api/scans/list', {
         method: "POST",
         headers: {
           'Accept': 'application/json, text/plain, */*',
           'Content-Type': 'application/json',
         },
         body: JSON.stringify({     
          "page":"1",
          "per_page": "10",

       }),

     }) 
       const result = await response.json();
       console.log(result);
     } catch (err) {
       console.log(err);
     }
    }


    chrome.runtime.onInstalled.addListener(deneme2);
    async function deneme2() {
     try {
       const response = await fetch('https://core.securityforeveryone.com/api/blog/list', {
         method: "POST",
         headers: {
           'Accept': 'application/json, text/plain, */*',
           'Content-Type': 'application/json',
         },
         body: JSON.stringify({     
          "page":"1",
          "per_page": "10",
          "search": "",
          "tag_slug": ""

       }),

     }) 
       const result = await response.json();
       console.log(result);
     } catch (err) {
       console.log(err);
     }
    }