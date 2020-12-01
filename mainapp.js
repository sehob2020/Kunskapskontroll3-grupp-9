const KEY = '';
let searchText = 'animal';

const url = `https://www.flickr.com/services/rest/?api_key=${KEY}&method=flickr.photos.search&text=${searchText}&format=json&nojsoncallback=1&per_page=1&page=10`;

fetch(url).then(
    function(response){
        console.log(response);
        return response.json();
    }
).then(
    function(data){
        console.log(data.photos.photo[0]);
        getImageUrl(data.photos.photo[0]);
    }
)

//här ska vi pussla ihop bild urlen
function getImageUrl(photoObject){
    let photo = photoObject;
    let size = 'b';

    let imgUrl = `https://live.staticflickr.com/${photo.server}/${photo.id}_${photo.secret}_${size}.jpg`;

    console.log(imgUrl);
    displayImg(imgUrl);
}

//för att visa bilden
function displayImg(url){
    let img = document.createElement('img');
    img.src = url;
    // img.setAttribute('src', url);

    let body = document.querySelector('body');
    body.appendChild(img);

}