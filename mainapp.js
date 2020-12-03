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
    img.setAttribute('class', 'ost')
    div.addEventListener('click', function(event) { turnCard(event.target);})
    img.setAttribute('src', '/baksida.png')
    div.appendChild(img);
    img = document.createElement('img');
    img.setAttribute('class', 'ost' + cardCount)
    img.setAttribute('src', '/baksida.png')
    img.src = url;
    div.appendChild(img);
    img.style.display = 'none'
    bilder.push(img);
    // img.addEventListener('click', turnCard)
    console.log(randChild);
    }
}

button.addEventListener('click', newGame)
function newGame(){
    location.reload();
}

function scoreCount(){
    pointsDisplay.textContent = 'Congratulations! You found them all!';
    // alert('hej')
    console.log(cardNr);

}

function turnCard(element){
    //let img = document.querySelector('.baksida');
    element.style.display = 'none';
    let ost = document.querySelector('.ost');
    
    // bilder.setAttribute('src', '/Card.png')
    // console.log(bilder)
    // console.log(bilder)
}