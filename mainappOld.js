//Memory Game 9000

// här deklarera vi våra variabler och skapa vår URL till API med hjälps av template literals.
const KEY = 'd47e7c95656f6a1961da9190c903ddb2';
let galleryId = '72157717114209588';
let cardCount = 0;
let button = document.querySelector('button')
let pointsDisplay = document.querySelector('.points')
pointsDisplay.textContent = 0;
let kort = document.querySelector('.card-container')
let bilder = []; //skapa en array för att pusha upp alla bilder 

// Bas URL för att hämta bilder i json format.
const url = `https://www.flickr.com/services/rest/?method=flickr.galleries.getPhotos&api_key=${KEY}&gallery_id=${galleryId}&format=json&nojsoncallback=1`;



//fetch för att anropa API .
fetch(url).then(
    function(response){
        console.log(response);
        return response.json();
    }
).then(
    function(data){ // funktion för att loopa genom bilder och hämta 
        for(let i=0; i<12; i++){ // for loop för att hämta 12 unika bilder.
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

    displayImg(imgUrl);
}


// funktion för random så kortet inte lägger på samma plats 
function shuffleBoard(max) {
    return Math.floor(Math.random() * Math.floor(max));
}


//för att visa bilden 
// skapa två bilder bak och fram-sidan
function displayImg(url){
    for(let i=0; i<2; i++){ // loop för att skaffa dubbletter av bilderna.
    let div = document.createElement('div');
    div.classList.add('card');
    div.id = cardCount
    div.dataset.id = cardCount;
    var children = grid.childNodes;// childNodes för grid
    var randChild = children[shuffleBoard(children.length)];// blanda korten
    grid.insertBefore(div, randChild)// sättta in 
    grid.dataset.id = cardCount;
    let img1 = document.createElement('img');
    img1.setAttribute('class', 'front')
    img1.setAttribute('src', '/baksida.png')
    div.appendChild(img1);
    let img = document.createElement('img');
    img.setAttribute('class', 'back' + cardCount);
    img.dataset.id = cardCount;
    img.src = url;
    div.appendChild(img);
    bilder.push(img);//pusha upp till bilder array
    }
}

// Knapp som start om spelet
button.addEventListener('click', newGame)
function newGame(){
    location.reload();
}

// Lägger till poäng när man får rätt
function scoreCount(){
    pointsDisplay.textContent ++
}

// variabler för att hålla koll på de olika gissingar
let firstGuess = '';// första gissing
let secondGuess = '';// andra gissing
let count = 0;
let previousTarget = null;
let delay = 1200;
let cards = document.querySelectorAll('.card')
let grid = document.createElement('section');
grid.setAttribute('class', 'grid');
kort.appendChild(grid);


// match funktionen om kort är lika så lägger det till classen match
const match = () => {
    const selected = document.querySelectorAll('.selected');
    selected.forEach(card => {
      card.classList.add('match');
    });
  };
  
  // funcktionen gör så att när man clicka på korten så vänds de tillbaka om inte kort matcha.
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
    if(!card.classList.contains('match')){// två kort som har match stanna 
      card.classList.remove('turned');// inte två är lika som vänder kort tillbaka 
    }
  });
};

//en click event för kort
grid.addEventListener('click', event => {

    const clicked = event.target;
  
    // om clicka på korten sök den efter selected eller match
    if (
      clicked.nodeName === 'SECTION' ||
      clicked === previousTarget ||
      clicked.parentNode.classList.contains('selected') ||
      clicked.parentNode.classList.contains('match')
    ) {
      return;
    }

    // om första gissningen och andra gissningen inte matchar går de till turned som kommer vända tillbaka korten , men om de matcha så stannar korten kvar.
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
