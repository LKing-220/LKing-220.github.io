let userData = new Object;
let userDataPassword = null;
let loadSuccessful = null;
let body = null;
let load = null;
window.addEventListener('load', function() {

    body = document.querySelector('body');
    load = document.querySelector('#load');
    loadSuccessful = document.querySelector('#loadSuccessful');
    inputs = load.querySelectorAll('input');
    inputs[0].value = "zsj1";
    inputs[1].value = '111111';
    mainFn();
    essayFn();
    // loadFn();
})