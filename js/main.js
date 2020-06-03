const imgUrl = 'https://image.tmdb.org/t/p/w185_and_h278_bestv2';
const serverLink = 'https://api.themoviedb.org/3';
const ApiKey = 'a50cde705e9b73389fbfaad0fd645e4f';

const leftMenu = document.querySelector('.left-menu');
const hamburger = document.querySelector('.hamburger');
const modal = document.querySelector('.modal');
const tvShowsList = document.querySelector('.tv-shows__list');
const tvShows = document.querySelector('.tv-shows');
const tvCardImg = document.querySelector('.tv-card__img');
const modalTitle = document.querySelector('.modal__title');
const genresList = document.querySelector('.genres-list');
const rating = document.querySelector('.rating');
const description = document.querySelector('.description');
const modalLink = document.querySelector('.modal__link');

//Create a preloader
const loading = document.createElement('DIV');
loading.classList.add('loading');

const GetDB = class {
    getData = async (url) =>{
        const res = await fetch(url);
        if(res.ok){
            return await res.json();
        }else{
            throw new Error(` Can't get data from ${url}`);
        }
    }  

    getTestData = () => {
        return  this.getData('test.json');
    }

    getTestCard = () => {
        return this.getData('card.json');
    }

    getSearchResult = (query) => {
        return this.getData(`${serverLink}/search/movie?api_key=${ApiKey}&language=en-US&query=${query}&page=1&include_adult=false`);
        // https://api.themoviedb.org/3/search/tv?api_key=<<api_key>>&language=en-US&page=1&query=query&include_adult=false    
    }
}

const renderCard = (data) => {
    let info = data.results;
    tvShowsList.textContent = '';
    console.log(info);
    info.forEach(item => {
        // one more way to insert value to our card
        // const {
        //     vote_average: vote, 
        //     poster_path: poster,
        //     backdrop_path: backdrop, 
        //     name: title 
        // } = item;

        const card = document.createElement('LI');
        card.classList.add('tv-shows__item');
        card.innerHTML = `
            <a href="#" class="tv-card">
                ${item.vote_average ? `<span class="tv-card__vote">${item.vote_average }</span>` : '' }
                <img class="tv-card__img"
                    src="${item.poster_path ? imgUrl + item.poster_path : (item.backdrop_path ? imgUrl + item.backdrop_path : 'img/no-poster.jpg' )}"
                    data-backdrop="${item.backdrop_path ? imgUrl + item.backdrop_path : ''}"
                    alt="${item.name}">
                <h4 class="tv-card__head">${item.name}</h4>
            </a>
        `;
        loading.remove();
        tvShowsList.append(card);
    });
}
 
{
    tvShows.append(loading);
    new GetDB().getTestData().then(renderCard);
}   

   console.log( new GetDB().getSearchResult('batman'));


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
    event.preventDefault();
    let target = event.target;
    let card = target.closest('.tv-card');
    if(card){
        
        new GetDB().getTestCard()
                            .then(data => {
                                console.log(data);
                                tvCardImg.src = imgUrl + data.poster_path;
                                modalTitle.innerText = data.name;
                                genresList.innerHTML = '';
                                data.genres.forEach(item =>{
                                    genresList.innerHTML  += `
                                        <li>${item.name}</li>
                                    `;
                                });
                                rating.innerText = data.vote_average;
                                description.innerText = data.overview;
                                modalLink.href = data.homepage;
                    
                            })
                            .then( () => {
                                modal.classList.remove('hide');
                                document.body.style.overflow = 'hidden';
                            })
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
        if(img.getAttribute('data-backdrop').match("((http|https):\/\/)?(www.)?([a-z0-9-]+\.)+[a-z]{2,6}")){         
            // let atrSrc = img.getAttribute('data-backdrop');
            // img.setAttribute('data-backdrop', img.src);
            // img.src = atrSrc;
            //    the same above and  below.  using the destructuring below
            [img.src, img.dataset.backdrop] = [img.dataset.backdrop, img.src];
        }
    }
}




