const KEY = 'd47e7c95656f6a1961da9190c903ddb2';
let galleryId = '72157717114209588';
let cardCount = 0;
let button = document.querySelector('button')
let pointsDisplay = document.querySelector('.points')
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
    let kort = document.querySelector('.card-container');
    for(let i=0; i<2; i++){
    let div = document.createElement('div');
    div.setAttribute('class', 'card ' + 'card-id' + cardCount);
    // kort.appendChild(div);
    var children = kort.childNodes;
    var randChild = children[shuffleBoard(children.length)];
    kort.insertBefore(div, randChild)
    let img = document.createElement('img');
    img.setAttribute('src', '/kort.png')
    // img.src = url;
    div.appendChild(img);
    bilder.push(img);
    img.addEventListener('click', turnCard)
    console.log(randChild)
    }
}

button.addEventListener('click', newGame)
function newGame(){

}

function scoreCount(){
    pointsDisplay.textContent = 'Congratulations! You found them all!';
    // alert('hej')
    console.log(cardNr);

}

function turnCard(){
    let cardNr = this.getAttribute('card');
    console.log(cardNr);
}

/* function checkForMatch() {
    var cards = document.querySelectorAll('img')
    const optionOneId = cardsChosenId[0]
    const optionTwoId = cardsChosenId[1]
    
    if(optionOneId == optionTwoId) {
      cards[optionOneId].setAttribute('src', 'images/blank.png')
      cards[optionTwoId].setAttribute('src', 'images/blank.png')
      alert('You have clicked the same image!')
    }
    else if (cardsChosen[0] === cardsChosen[1]) {
      alert('You found a match')
      cards[optionOneId].setAttribute('src', 'images/white.png')
      cards[optionTwoId].setAttribute('src', 'images/white.png')
      cards[optionOneId].removeEventListener('click', flipCard)
      cards[optionTwoId].removeEventListener('click', flipCard)
      cardsWon.push(cardsChosen)
    } else {
      cards[optionOneId].setAttribute('src', 'images/blank.png')
      cards[optionTwoId].setAttribute('src', 'images/blank.png')
      alert('Sorry, try again')
    }
    cardsChosen = []
    cardsChosenId = []
    resultDisplay.textContent = cardsWon.length
    if  (cardsWon.length === cardArray.length/2) {
      resultDisplay.textContent = 'Congratulations! You found them all!'
    }
  } */
