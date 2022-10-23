   //update session
   chrome.runtime.onUpdateAvailable.addListener( hasUpdate );
   function hasUpdate( e ) {
       console.log( 'hasUpdate', e );
       chrome.runtime.reload();
   }


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
         
      //ALTERNATİF LİNKLER?

//https://api.securityforeveryone.com/api/scans/list bu da çalışmıyor 

https://core.securityforeveryone.com/api/user/login  bu sitede kullanılan api herhangi bir hesapla girilemiyor

https://core-test.s4e.link/api/user/login bu sadece onur beyin hesabı ile çalışıyor
https://core.securityforeveryone.com/api/scans/list
} 





*/
//
chrome.runtime.onInstalled.addListener(onInstalled);
async function onInstalled() {
 try {
   const response = await fetch('https://core-test.s4e.link/api/user/login', {
     method: "POST",
     headers: {
       'Accept': 'application/json, text/plain, */*',
       'Content-Type': 'application/json',
     },
      body: JSON.stringify({

       "email": "sosyal@onuraktas.net",
       "password": "DemoDemo_1234!",
     }),
 }) 
   const result = await response.json();
   console.log(result);
 } catch (err) {
   console.log(err);
 }
}



    
