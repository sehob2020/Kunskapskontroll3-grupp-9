let bild = document.querySelector('.bildsak')
let bild1 = document.querySelector('.bildsak1')
let button = document.querySelector('.card')
// bild.setAttribute('src', 'https://live.staticflickr.com/65535/49730008467_ca7266df26_q.jpg')

// https://live.staticflickr.com/7372/12502775644_284b3183ca0a2ee9_w.jpg

// function Flickr(){


// Kanske inte ha som click utan ha dem för att kunna kalla på baksida för att det skall kunna va random osv.
// button.addEventListener('click', function(klicka){
   /*  fetch('https://www.flickr.com/services/rest/?method=flickr.urls.lookupGallery&api_key=33701ee2717d608a9811f5c5556d9078&url=https%3A%2F%2Fwww.flickr.com%2Fphotos%2Flibrary_of_congress%2Fgalleries%2F72157716271339617%2F&format=json&nojsoncallback=1') */
    fetch('https://api.flickr.com/services/rest?sort=relevance&parse_tags=1&content_type=7&extras=can_comment%2Ccount_comments%2Ccount_faves%2Cdescription%2Cisfavorite%2Clicense%2Cmedia%2Cneeds_interstitial%2Cowner_name%2Cpath_alias%2Crealname%2Crotation%2Curl_c%2Curl_l%2Curl_m%2Curl_n%2Curl_q%2Curl_s%2Curl_sq%2Curl_t%2Curl_z%2Cis_marketplace_licensable&per_page=50&page=1&lang=en-US&text=dog&viewerNSID=&method=flickr.photos.search&csrf=&api_key=d47e7c95656f6a1961da9190c903ddb2&format=json&hermes=1&hermesClient=1&reqId=f866abd5&nojsoncallback=1')
    // }
        
        
    
        //console.log(Flickr);
    
    // Flickr();
    
    
    .then(response => response.json())
    
    .then(data => {
        //let baksida1 = data['photos']['photo'][0]['url_q'];

        for(let i=0; i<12; i++){
            let baksida1 = data['photos']['photo'][i]['url_q'];
        }

        for(let j=0; j<12; j++){
            let baksida1 = data['photos']['photo'][j]['url_q'];
        }
       /*  let baksida2 = data['photos']['photo'][1]['url_q'];
        let baksida3 = data['photos']['photo'][2]['url_q'];
        let baksida4 = data['photos']['photo'][3]['url_q'];
        let baksida5 = data['photos']['photo'][4]['url_q'];
        let baksida6 = data['photos']['photo'][5]['url_q'];
        let baksida7 = data['photos']['photo'][6]['url_q'];
        let baksida8 = data['photos']['photo'][7]['url_q'];
        let baksida9 = data['photos']['photo'][8]['url_q'];
        let baksida10 = data['photos']['photo'][9]['url_q'];
        let baksida11 = data['photos']['photo'][10]['url_q'];
        let baksida12 = data['photos']['photo'][11]['url_q']; */
    
        // bild.innerHTML = 'src, '+bla;
        bild.setAttribute("src", baksida1);
        bild1.setAttribute("src", baksida2);

        console.log(baksida1);
    }
        )
// })

let card = {
    lol: 'öpö',

    turn: function(){
        card.classList.remove 
    }
}

let score = document.querySelector('.score-title')
score.innerText = 'Score: ${}';



function Card(value, ost) {
    this.cardValue = value;
    this.ost = ost;

  }
  
  var card1 = new Card(,);
