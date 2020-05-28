let leftMenu = document.querySelector('.left-menu');
let hamburger = document.querySelector('.hamburger');



hamburger.addEventListener('click', ()=>{
    leftMenu.classList.toggle('openMenu');
    hamburger.classList.toggle('open');
    
});

document.body.addEventListener('click', (event)=>{
    if(!event.target.closest('.left-menu')){
        leftMenu.classList.remove('openMenu');
        hamburger.classList.remove('open');
    }
});