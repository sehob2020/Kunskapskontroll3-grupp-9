const KEY = 'apikey';
let searchText = 'soda';

const url = 'URL'

fetch(url).then(
    function(response){
    return response.json();
    }
).then(
    functin(data){
        console.log(data.photo.photo[0]);
        getImageUrl(data.photos.photo[0]);
    }
)

function getImageUrl(photoObject){
    let photo = photoObject;
    let size = 'q';

    let imgUrl = 'https://*****'

    console.log(imgUrl);
    displayImg(imgUrl);
}

function displayImg(url){
    let img = document.createElement('img');
    img.scr = url;

    let body = document.querySelector()
    body.appendChild('img')
}