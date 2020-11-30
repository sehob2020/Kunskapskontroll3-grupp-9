let bild = document.querySelector('.bildsak')
let button = document.querySelector('.card')
// bild.setAttribute('src', 'https://live.staticflickr.com/65535/49730008467_ca7266df26_q.jpg')

// https://live.staticflickr.com/7372/12502775644_284b3183ca0a2ee9_w.jpg

// function Flickr(){


// Kanske inte ha som click utan ha dem för att kunna kalla på baksida för att det skall kunna va random osv.
button.addEventListener('click', function(klicka){
    fetch('https://www.flickr.com/services/rest/?method=flickr.urls.lookupGallery&api_key=33701ee2717d608a9811f5c5556d9078&url=https%3A%2F%2Fwww.flickr.com%2Fphotos%2Flibrary_of_congress%2Fgalleries%2F72157716271339617%2F&format=json&nojsoncallback=1')
    // }
        
        
    
        //console.log(Flickr);
    
    // Flickr();
    
    
    .then(response => response.json())
    
    .then(data => {
        let baksida1 = data['gallery']['cover_photos']['photo'][0]['url'];
        let baksida2 = data['gallery']['cover_photos']['photo'][1]['url']
        let baksida3 = data['gallery']['cover_photos']['photo'][2]['url']
        let baksida4 = data['gallery']['cover_photos']['photo'][2]['url']
        let baksida5 = data['gallery']['cover_photos']['photo'][2]['url']
        let baksida6 = data['gallery']['cover_photos']['photo'][0]['url'];
        let baksida7 = data['gallery']['cover_photos']['photo'][1]['url']
        let baksida8 = data['gallery']['cover_photos']['photo'][2]['url']
        let baksida9 = data['gallery']['cover_photos']['photo'][2]['url']
        let baksida10 = data['gallery']['cover_photos']['photo'][2]['url']
        let baksida11 = data['gallery']['cover_photos']['photo'][2]['url']
        let baksida12 = data['gallery']['cover_photos']['photo'][2]['url']
    
        // bild.innerHTML = 'src, '+bla;
        bild.setAttribute("src", baksida1);

        console.log(bla, ost, asd);
    }
        )
})