'use strict'
document.addEventListener('DOMContentLoaded', function () {
    console.log("DOMContentLoaded")
    const _cart_ = document.getElementById("cart")
    /* pick a random beer */
    function main() {
        const title=document.title;
        let i = 0;

        console.log( title )
        
        switch( title ) {
            case "info":
                console.log(document.getElementById('id').value );
                break;

            case "The Bear":
                console.log("loading randomly");
                for( i=0; i<10; ++i) {
                    fetchData( "https://api.punkapi.com/v2/beers/random" );
                }
                break;
        }
    } /* main */


    function ProcessAndRender(data) {
        console.log("ProcessAndRender");
        console.log(data);

        let img_url =  data[0].image_url == null ? "./img/bottle_brewdog-hocus-pocus.png" :  data[0].image_url ;

        let info=`
        <div id="beer-${data[0].id}" class="card a-bottle">
            <img class="card-img-top" src=${img_url} alt="${data[0].name}">
            <div class="card-body lead">
                <h4 class="card-title">${data[0].name}</h4>
                <p class="card-text">${data[0].tagline}</p>
            </div>
        </div>
        `
        _cart_.innerHTML += info

        const _bottle_ = document.getElementById("beer-" + data[0].id);
        console.log(_bottle_);

        _bottle_.addEventListener('click', function() {
            window.open("./info.html?id="+ this.id);
        })

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
