const leftMenu = document.querySelector('.left-menu');
const hamburger = document.querySelector('.hamburger');
const modal = document.querySelector('.modal');
const tvShowsList = document.querySelector('.tv-shows__list');
const cross = document.querySelector('.cross');
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
tvShowsList.addEventListener('click', event =>{
    let target = event.target;
    let card = target.closest('.tv-card');
    if(card){
        modal.classList.remove('hide');
    }
});
cross.addEventListener('click', () => {
    modal.classList.add('hide');
});


leftMenu.addEventListener('click', (event)=>{
    let target = event.target;
    const dropdown = target.closest('.dropdown');
    if(dropdown){
        hamburger.classList.add('open');
        leftMenu.classList.add('openMenu');
        target.classList.toggle('active');
    }
});

