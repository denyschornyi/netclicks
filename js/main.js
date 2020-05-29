const leftMenu = document.querySelector('.left-menu');
const hamburger = document.querySelector('.hamburger');
const modal = document.querySelector('.modal');
const tvShowsList = document.querySelector('.tv-shows__list');
// Menu action
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
    let target = event.target;
    const dropdown = target.closest('.dropdown');
    if(dropdown){
        hamburger.classList.add('open');
        leftMenu.classList.add('openMenu');
        target.classList.toggle('active');
    }
});
// Modal action
tvShowsList.addEventListener('click', event =>{
    let target = event.target;
    let card = target.closest('.tv-card');
    if(card){
        modal.classList.remove('hide');
        document.body.style.overflow = 'hidden';
    }
});
modal.addEventListener('click', (event) => {
    if(event.target.closest('.cross') || event.target.classList.contains('modal')){
        modal.classList.add('hide');
        document.body.style.overflow = '';
    }
});
// Change img action
tvShowsList.addEventListener('mouseover', changeImg);
tvShowsList.addEventListener('mouseout', changeImg);

function changeImg(){
    if(event.target.closest('.tv-card')){
        let card = event.target.closest('.tv-card');
        let img = card.querySelector('.tv-card__img');
        let atrSrc = img.getAttribute('data-backdrop');
        img.setAttribute('data-backdrop', img.src);
        img.src = atrSrc;
    }
}




