const KEY = 'd47e7c95656f6a1961da9190c903ddb2';
let galleryId = '72157717114209588';

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

//för att visa bilden
function displayImg(url){
    let kort = document.querySelector('.card-container');

    for(let i=0; i<25; i++){
    let div = document.createElement('div');
    div.setAttribute('class', 'card '+'card'+[i])
    kort.appendChild(div);
    let img = document.createElement('img');
    img.src = url;
    div.appendChild(img);
    }
}
