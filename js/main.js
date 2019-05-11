'use strict'
document.addEventListener('DOMContentLoaded', function () {
    console.log("DOMContentLoaded")
    const _cart_ = document.getElementById("cart")
    let alreadyShown = [];   //this is a list of the shown beers

    /* initiate the transacions */
    function main() {
        const title=document.title;
        let i = 0;
        console.log(window.innerHeight);
        console.log(window.innerWidth);

        if( window.innerWidth > window.innerHeight )
            alert( "Landscape view are not supported yet");

        console.log( title )

        switch( title ) {
            case "Info":
                console.log("found " + title);
                let params = (new URL(document.location)).searchParams;
                let id = parseInt(params.get('id'))
                fetchData( "https://api.punkapi.com/v2/beers/"+id );

                console.log( id );
                break;

            /* pick  random beer */
            case "The Bear":
                for( i=0; i<10; ++i) {
                    fetchData( "https://api.punkapi.com/v2/beers/random" );
                }

                var cards = document.querySelectorAll(".card")
                console.log(cards.length);
                cards.forEach( function(card) { console.log(card)} );
        }
    } /* main */

    /* turn display class on */
    function show(name) {
        const cls = document.querySelector(name);
        cls.forEach( function( elem ) { elem.style.display = "auto"; })
    }

       /* turn display class on */
       function hide(name) {
        const cls = document.querySelector(name);
        cls.forEach( function( elem ) { elem.style.display = "auto"; })
    }

    /* proess and render the incomming data */
    function ProcessAndRender(data) {
        const title=document.title;
        console.log("ProcessAndRender");
        console.log(data);

        // assign a default image if nothing comes from the server
        let img_url =  data[0].image_url == null ? "./img/Beer-iStock.jpg" :  data[0].image_url ;

        let cards = document.querySelectorAll(".btn-primary");
        cards.forEach( function(card){ 
           console.log(card);
           card.addEventListener('click', function() {console.log("click .... " + this.id)}) 
        })

        switch( title ) {
            case "The Bear":
                /* only if it has not been shown yet we show it now */
                if(!alreadyShown.includes( data[0].id) ) {
                    alreadyShown.push( data[0].id );  // item will be shown

                    let info=`
                    <div id="beer-${data[0].id}" class="card a-bottle beer">
                        <img class="card-img-top bottle-s beer "  src=${img_url} alt="${data[0].name}">
                        <div class="card-body lead s-card-body beer">
                            <h4 class="card-title beer">${data[0].name}</h4>
                            <p class="card-text beer">${data[0].tagline}</p>
                            <button id="${data[0].id}" type="button" class="btn btn-primary">Primary</button>
                        </div>
                    </div>`
                    
                _cart_.innerHTML += info;
                } /* end if if includes */
            break;
        // this is beeing rendered on the info.html page only
        case "Info":
            show("info");
            const _intro_ = document.getElementById("intro");
            const _food_ = document.getElementById("food");
            const _phys_ = document.getElementById("phys");
            const _hist_ = document.getElementById("history");
            const _ref_ = document.getElementById("references");

            _intro_.innerHTML = `<span class="text-s  info">${data[0].name} / ${data[0].tagline}</span>`;
            _intro_.innerHTML += `<span class="text-s info">${data[0].description}</span>`
            _intro_.innerHTML += `<span class="text-s" info>${data[0].brewers_tips}</span>`;

                data[0].food_pairing.forEach( function(pairing,idx ) {
                    _food_.innerHTML += `<span class="text-s">${idx}</span> ${pairing}`
                })
            _food_.innerHTML = `<span class="text-s info">${data[0].food_pairing}</span>`
            _hist_.innerHTML = `<span class="text-s info">First brewed:${data[0].first_brewed}</span>`
            _phys_.innerHTML += `<span class="text-s info"<strong>EBC:</strong> ${data[0].ebc} ,<strong>IBU:</strong> ${data[0].ibu}, <strong>PH:</strong> ${data[0].ph}`;
            break;
        }
    }


    // fetches data from the  server
    function fetchData(url) {
        console.log(url);
        console.log("fetching" + url);
        fetch(url )
            .then(function (response) {
                return response.json()
            })
            .then(function (myJson) {
                ProcessAndRender(myJson);
            })
            .catch(err => console.log(err))
    }

    main();
} ) // DOMContentLoaded handler

function readmore(id) {
    console.log("readmore" + id )
    fetchData( "https://api.punkapi.com/v2/beers/"+id );
}
