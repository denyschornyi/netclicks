let leftMenu = document.querySelector('.left-menu');
let hamburger = document.querySelector('.hamburger');
let dropdownList = document.querySelector('.dropdown-list');



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

leftMenu.addEventListener('click', (event)=>{
    if(event.target.closest('.dropdown')){
        hamburger.classList.add('open');
        leftMenu.classList.add('openMenu');
        event.target.classList.toggle('active');
    }
});