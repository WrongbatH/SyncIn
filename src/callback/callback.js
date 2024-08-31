// take the auth code and put it in localstorage for ease of use
let params = new URLSearchParams(document.location.search);

let code = params.get('code');

localStorage.setItem('code', code);

console.log('localstorage updated with code');

window.location.href = '/';