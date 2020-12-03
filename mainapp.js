const KEY = 'd47e7c95656f6a1961da9190c903ddb2';
let galleryId = '72157717114209588';
let cardCount = 0;
let button = document.querySelector('button')
let pointsDisplay = document.querySelector('.points')
pointsDisplay.textContent = 0;
let kort = document.querySelector('.card-container')
let cardsChosen = []
let cardsChosenId = []
let bilder = [];

// const url = `https://www.flickr.com/services/rest/?api_key=${KEY}&gallery_id=${galleryId}&format=json&nojsoncallback=1`;
const url = `https://www.flickr.com/services/rest/?method=flickr.galleries.getPhotos&api_key=${KEY}&gallery_id=${galleryId}&format=json&nojsoncallback=1`;




fetch(url).then(
    function(response){
        console.log(response);
        return response.json();
    }
).then(
    function(data){
        for(let i=0; i<12; i++){
            console.log(data.photos.photo[i]);
            getImageUrl(data.photos.photo[i]);
            cardCount++
        }
    }
)

//här ska vi pussla ihop bild urlen
function getImageUrl(photoObject){
    let photo = photoObject;
    let size = 'q';

    let imgUrl = `https://live.staticflickr.com/${photo.server}/${photo.id}_${photo.secret}_${size}.jpg`;

    console.log(imgUrl);
    displayImg(imgUrl);
}



function shuffleBoard(max) {
    return Math.floor(Math.random() * Math.floor(max));
}


//för att visa bilden
function displayImg(url){
    // let kort = document.querySelector('.card-container');
    for(let i=0; i<2; i++){
    let div = document.createElement('div');
    // div.setAttribute('class', 'card ' + 'card-id' + cardCount);
    div.classList.add('card');
    div.id = cardCount
    div.dataset.id = cardCount;
    // kort.appendChild(div);
    var children = grid.childNodes;
    var randChild = children[shuffleBoard(children.length)];
    grid.insertBefore(div, randChild)
    grid.dataset.id = cardCount;
    let img1 = document.createElement('img');
    img1.setAttribute('class', 'front')
    // div.addEventListener('click', function(event) { turnCard(event.target);})
    img1.setAttribute('src', '/baksida.png')
    div.appendChild(img1);
    let img = document.createElement('img');
    img.setAttribute('class', 'back' + cardCount)
    img.dataset.id = cardCount;
    img.src = url;
    div.appendChild(img);
    // img.style.display = 'none'
    bilder.push(img);
    // img.addEventListener('click', turnCard)
    console.log(randChild);
    console.log(img.id)
    
    }
}

button.addEventListener('click', newGame)
function newGame(){
    location.reload();
}

function scoreCount(){
    pointsDisplay.textContent ++
}

let firstGuess = '';
let secondGuess = '';
let count = 0;
let previousTarget = null;
let delay = 1200;
let cards = document.querySelectorAll('.card')
let grid = document.createElement('section');
grid.setAttribute('class', 'grid');
kort.appendChild(grid);

const match = () => {
    const selected = document.querySelectorAll('.selected');
    selected.forEach(card => {
      card.classList.add('match');
    });
  };
  
const resetGuesses = () => {
    firstGuess = '';
    secondGuess = '';
    count = 0;
    previousTarget = null;
  
    var selected = document.querySelectorAll('.selected');
    selected.forEach(card => {
    card.classList.remove('selected');
    });
};
const resetTurned = () => {
  firstGuess = '';
  secondGuess = '';
  count = 0;
  previousTarget = null;

  var selected = document.querySelectorAll('.turned');
  selected.forEach(card => {
    if(!card.classList.contains('match')){
      card.classList.remove('turned');
    }
  });
};

grid.addEventListener('click', event => {

    const clicked = event.target;
  
    if (
      clicked.nodeName === 'SECTION' ||
      clicked === previousTarget ||
      clicked.parentNode.classList.contains('selected') ||
      clicked.parentNode.classList.contains('match')
    ) {
      return;
    }
  
    if (count < 2) {
      count++;
      if (count === 1) {
        firstGuess = clicked.parentNode.dataset.id;
        console.log(firstGuess);
        clicked.parentNode.classList.add('selected');
        clicked.parentNode.classList.add('turned');
      } else {
        secondGuess = clicked.parentNode.dataset.id;
        console.log(secondGuess);
        clicked.parentNode.classList.add('selected');
        clicked.parentNode.classList.add('turned');
      }
  
      if (firstGuess && secondGuess) {
        if (firstGuess === secondGuess) {
            scoreCount();
          setTimeout(match, delay);
          setTimeout(resetGuesses, delay);
        }else {
          setTimeout(resetGuesses, delay);
          setTimeout(resetTurned, delay);
        }
      }
      previousTarget = clicked;
    }
  
});
