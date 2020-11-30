let bild = document.querySelector('.bildsak')
// bild.setAttribute('src', 'https://live.staticflickr.com/65535/49730008467_ca7266df26_q.jpg')

// https://live.staticflickr.com/7372/12502775644_284b3183ca0a2ee9_w.jpg

// function Flickr(){
    fetch('https://www.flickr.com/services/rest/?method=flickr.urls.lookupGallery&api_key=33701ee2717d608a9811f5c5556d9078&url=https%3A%2F%2Fwww.flickr.com%2Fphotos%2Flibrary_of_congress%2Fgalleries%2F72157716271339617%2F&format=json&nojsoncallback=1')
// }
    
    

    //console.log(Flickr);

// Flickr();


.then(response => response.json())

.then(data => {
    let bla = data['gallery']['cover_photos']['photo'][0]['url'];

    // bild.innerHTML = 'src, '+bla;
    bild.setAttribute("src", bla);

    console.log(bla);
}