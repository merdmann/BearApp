'use strict'
document.addEventListener('DOMContentLoaded', function () {
    console.log("DOMContentLoaded")

    /* called if the html dpocument has beem rendred */
    function main(title, id) {
        DecideToStart( title, id);
    } /* main */

    main("The Beer", 10)
}) // everything in his block has been called after the html file has been rendered.

    const _cart_ = document.getElementById("cart")
    let alreadyShown = [];   //this is a list of the shown beers
    let currentBeer = 0;

/* turn display for all elements with the given name */
function show(name) {
        const cls = document.querySelectorAll(name);
        console.log("show: " + name )
        cls.forEach( function( elem ) { elem.style.display = "initial"; })

        return cls;
}

/* turn display class on */
function hide(name) {
        const cls = document.querySelectorAll(name);
        console.log( "hide:" + name )
        cls.forEach( function( elem ) { elem.style.display = "none"; })

        return cls;
}

/*
 * Decide what needs to be done first
 */
function DecideToStart(where, beer) {
        console.log(where)

        switch( where ) {
            case "Info":
                console.log("Fetch beer" + beer )
                fetchData( "https://api.punkapi.com/v2/beers/"+beer );
                break;

            /* pick 10 random beer */
            case "The Beer":
                for(var i=0; i<beer; ++i) {
                    console.log(where + i);
                    fetchData( "https://api.punkapi.com/v2/beers/random" );
                }
        }
} /* DecideToStart */

/* proess and render the incomming data */
function ProcessAndRender(data) {
        const title=document.title;
        console.log("ProcessAndRender:"+ title);
        console.log(data);

        // assign a default image if nothing comes from the server
        let img_url =  data[0].image_url == null ? "./img/Beer-iStock.jpg" :  data[0].image_url ;

        // https://stackoverflow.com/questions/203198/event-binding-on-dynamically-created-elements

        switch( title ) {
            case "The Bear":
                show(".homepage")
                /* only if it has not been shown yet we show it now */
                if(!alreadyShown.includes( data[0].id) ) {
                    alreadyShown.push( data[0].id );  // item will be shown

                    let info=`
                    <a name="beer-${data[0].id}">
                    <div id="beer-${data[0].id}" class="card a-bottle text-center">
                        <img class="card-img-top bottle-s beer" src=${img_url} alt="${data[0].name}">
                        <div class="card-body lead s-card-body">
                            <h4 class="card-title">${data[0].name}</h4>
                            <p class="card-text">${data[0].tagline}</p>
                            <button onclick="readmore(${data[0].id})" type="button" class="btn btn-primary">Read more</button>
                        </div>
                    </div>`

                _cart_.innerHTML += info;
                } /* end of if includes */
            break;
        // this is beeing rendered on the info.html page only
        case "Info":
            hide(".homepage")
            show(".info");
            const _intro_  = document.getElementById("intro");
            const _food_   = document.getElementById("food");
            const _phys_   = document.getElementById("phys");
            const _hist_   = document.getElementById("history");
            const _ref_    = document.getElementById("references");
            const _return_ = document.getElementById("return");

            _intro_.innerHTML += `<p class="text-s info">${data[0].name} / ${data[0].tagline}</p>`;
            _intro_.innerHTML += `<p class="text-s info">${data[0].description}</p>`
            _intro_.innerHTML += `<p class="text-s" info>${data[0].brewers_tips}</p>`;

                data[0].food_pairing.forEach( function(pairing, idx ) {
                    _food_.innerHTML += `<p class="text-s">${pairing}</p>`;
                })
            _food_.innerHTML += `${data[0].food_pairing}`
            _hist_.innerHTML += `<p>First brewed:${data[0].first_brewed}</p>`
            _phys_.innerHTML += `<p>EBC: ${data[0].ebc},IBU:${data[0].ibu},PH: ${data[0].ph}</p>`;
            _return_.innerHTML = `<a href="#beer-${currentBeer}" onclick="goback(${currentBeer})" class="btn btn-info" role="button">Return</a>`;

            break;
        }
}

function  goback(id) {
    show(".homepage");
    console.log(id);   
}

function readmore(id) {
    currentBeer = id;
    hide(".homepage")
    document.title="Info"
    DecideToStart("Info", id);
} /* readmore */


   /* fetch data is fetching the data of  given url */
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
