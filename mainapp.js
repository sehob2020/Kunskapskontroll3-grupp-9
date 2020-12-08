//Memory Game 9000

// här deklarera vi våra variabler och skapa vår URL till API med hjälps av template literals.
const KEY = 'd47e7c95656f6a1961da9190c903ddb2';
let galleryId = '72157717114209588';
let cardCount = 0;
let button = document.querySelector('button')
let pointsDisplay = document.querySelector('.points')
pointsDisplay.textContent = 0;
let kort = document.querySelector('.card-container')
let bilder = [];//skapa en array för att pusha upp alla bilder 

// Bas URL för att hämta bilder i json format.
const url = `https://www.flickr.com/services/rest/?method=flickr.galleries.getPhotos&api_key=${KEY}&gallery_id=${galleryId}&format=json&nojsoncallback=1`;

//Konstruktor
function Card (){
  this.id = cardCount;
  this.class = 'card';
  this.frontUrl = '/baksida.png';
  this.backUrl = url;
  this.element = document.createElement('div');
}

//Prototype
Card.prototype.giveBackground = function(url){
  let img1 = document.createElement('img');
  img1.setAttribute('class', 'front')
  img1.setAttribute('src', '/baksida.png')
  this.element.appendChild(img1);
  let img = document.createElement('img');
  img.setAttribute('class', 'back' + cardCount);
  img.dataset.id = cardCount;
  img.src = url;
  this.element.appendChild(img);
  bilder.push(img);//pusha upp till bilder array
}
//fetch för att anropa API .
fetch(url).then(
  function(response){
    console.log(response);
    return response.json();
}
).then(
  function(data){//Funktion där vi hämtar bilder
    for(let i=0; i<12; i++){//Loop för att hämta 12 st bilder
      getImageUrl(data.photos.photo[i]);
      cardCount++
    }
  }
)
// Errorhantering, detta meddelande kommer att logas vid eventuella fel.
.catch(
  function (e) {
    console.log('Something went wrong!');
  }
)

//Lägga ihop url och skicka ut
function getImageUrl(photoObject){
  let photo = photoObject;
  let size = 'q';

  let imgUrl = `https://live.staticflickr.com/${photo.server}/${photo.id}_${photo.secret}_${size}.jpg`;

  displayImg(imgUrl);
}
//Funktion för att blanda placeringen på korten
function shuffleBoard(max) {
  return Math.floor(Math.random() * Math.floor(max));
}

//Funktion för att skapa kort och tilldela dem placering
function displayImg(url){
  for(let i=0; i<2; i++){//Loop som skapar dubletter av bilderna
  let div = new Card();
  div.element.classList.add('card');
  div.element.dataset.id = cardCount;
  var children = grid.childNodes;
  var randChild = children[shuffleBoard(children.length)];
  grid.insertBefore(div.element, randChild)
  grid.dataset.id = cardCount;
  div.giveBackground(url);
  }
}

//Skapar knapp och ger den funktion för att starta om spelet
button.addEventListener('click', newGame)
function newGame(){
  location.reload();
}

//Funktion för att räkna poängen
function scoreCount(){
  pointsDisplay.textContent ++
}

//Variabler för olika funktioner
let firstGuess = '';// första gissning
let secondGuess = '';// andra gissning
let count = 0; //Antal gissningar
let previousTarget = null;
let delay = 1200;
//Skapar section
let cards = document.querySelectorAll('.card');
let grid = document.createElement('section');
grid.setAttribute('class', 'grid');
kort.appendChild(grid);


//Funktion för att lägga till klassen match
const match = () => {
  const selected = document.querySelectorAll('.selected');
  selected.forEach(card => {
    card.classList.add('match');
  });
};

//Funktion för att återställa valda kort. Tar bort gissningar och klassen selected
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

//Funktion för att bara vända tillbaka kort som inte har klassen match i sig
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

//Sätter klick funktion på korten
grid.addEventListener('click', event => {

    const clicked = event.target;
    //Kollar efter klasser på det klickade kort
    if (
      clicked.nodeName === 'SECTION' ||
      clicked === previousTarget ||
      clicked.parentNode.classList.contains('selected') ||
      clicked.parentNode.classList.contains('match')
    ) {
      return;
    }
  
    if (count < 2) {//Kollar antal gissningar.
      count++;
      if (count === 1) {//Första gissning lägg till klass selected och turned
        firstGuess = clicked.parentNode.dataset.id;
        console.log(firstGuess);
        clicked.parentNode.classList.add('selected');
        clicked.parentNode.classList.add('turned');
      } else { //Andra gissning lägg till klass selected och turned
        secondGuess = clicked.parentNode.dataset.id;
        console.log(secondGuess);
        clicked.parentNode.classList.add('selected');
        clicked.parentNode.classList.add('turned');
      }
  
      if (firstGuess && secondGuess) { //Om man gjort båda gissningarna
        if (firstGuess === secondGuess) {//Om första gissning är samma som andra gissning
          scoreCount();//Poäng funktion
          setTimeout(match, delay);//Match funktion
          setTimeout(resetGuesses, delay);//Gissnings funktion
        }else {
          setTimeout(resetGuesses, delay);//Gissnings funktion
          setTimeout(resetTurned, delay);//Turned funktion
        }
      }
      previousTarget = clicked;
    }
  
});