let leftMenu = document.querySelector('.left-menu');
let hamburger = document.querySelector('.hamburger');



hamburger.addEventListener('click', ()=>{
    leftMenu.classList.toggle('openMenu');
});