'use strict'
document.addEventListener('DOMContentLoaded', function () {
    console.log("DOMContentLoaded")
    const _cart_ = document.getElementById("cart")

    function main() {
        const title=document.title;
        let i = 0;

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
                console.log("loading randomly");
                for( i=0; i<10; ++i) {
                    fetchData( "https://api.punkapi.com/v2/beers/random" );
                }
                break;
        }
    } /* main */


    function ProcessAndRender(data) {
        const title=document.title;
        const _intro_ = document.getElementById("intro");
        const _food_ = document.getElementById("food");
        const _phys_ = document.getElementById("phys");
        const _hist_ = document.getElementById("history");
        const _ref_ = document.getElementById("references");

        console.log("ProcessAndRender");
        console.log(data);

        let img_url =  data[0].image_url == null ? "./img/bottle_brewdog-hocus-pocus.png" :  data[0].image_url ;

        switch( title ) {
            case "The Bear":
        let info=`
        <div id="beer-${data[0].id}" class="card a-bottle">
            <img class="card-img-top" src=${img_url} alt="${data[0].name}">
            <div class="card-body lead">
                <h4 class="card-title">${data[0].name}</h4>
                <p class="card-text">${data[0].tagline}</p>
                <a href="./info.html?id=${data[0].id}" class="card-link">more info</a>
            </div>
        </div>
        `
        _cart_.innerHTML += info;
        break;

        case "Info":
            _intro_.innerHTML = `${data[0].name} / ${data[0].tagline}`;
            _intro_.innerHTML += `${data[0].description}`
            _intro_.innerHTML += `${data[0].brewers_tips}`;

                data[0].food_pairing.forEach( function(pairing,idx ) {
                    _food_.innerHTML += `<span class="lead">${idx}</span> ${pairing}`
                } )
            _food_.innerHTML = `${data[0].food_pairing}`
            _hist_.innerHTML = `${data[0].first_brewed}`
            _phys_.innerHTML += `EBC: ${data[0].ebc} ,IBU: ${data[0].ibu}, PH: ${data[0].ph}`
        
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
                console.log(myJson)
            })
            .catch(err => console.log(err))
    }

    main();
}) // DOMContentLoaded handler
