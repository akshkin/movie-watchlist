const watchlistEl = document.getElementById("watchlist")
let watchlistArray = JSON.parse(localStorage.getItem("watchList")) || []


function displayWatchlist(){
    const watchlist = JSON.parse(localStorage.getItem("watchList"))
    let html = ""
    if(watchlist && watchlist.length > 0){
        for (let id of watchlist){
            fetch(`https://www.omdbapi.com/?apikey=907fb758&i=${id}`)
                .then(response => response.json())
                .then(data => {
            html += `<div id="container" class="container">  
                        <div id="poster" class="column1">
                            <img src="${data.Poster}"/>
                        </div>
                        <div class="info" class="column2">
                            <div class="rows">
                                <h4 class="movie-title">${data.Title}</h4> 
                                <span class="movie-rating">⭐${data.imdbRating}</span>
                            </div>
                            <div class="rows">
                                <p  class="movie-runtime">${data.Runtime}</p> 
                                <p class="movie-genre">${data.Genre}</p> 
                                <button class="btn" id="${id}" onclick="removeFromWatchlist(id, event)">
                                    <svg class="remove-icon" xmlns="http://www.w3.org/2000/svg" 
                                    aria-hidden="true" role="img" 
                                    width="1em" 
                                    height="1em" 
                                    preserveAspectRatio="xMidYMid meet" 
                                    viewBox="0 0 1024 1024">
                                    <path fill="currentColor" d="M512 64C264.6 64 64 264.6 64 512s200.6 448 448 448s448-200.6 448-448S759.4 64 512 64zm192 472c0 4.4-3.6 8-8 8H328c-4.4 0-8-3.6-8-8v-48c0-4.4 3.6-8 8-8h368c4.4 0 8 3.6 8 8v48z"/>
                                    </svg> 
                                remove</button>
                            </div>
                            <p  class="movie-plot">${data.Plot}</p>
                        </div> 
                    </div>        
                              ` 
                    watchlistEl.innerHTML = html
                })
        }
    }
}

function removeFromWatchlist(id){
   
    const watchlist = JSON.parse(localStorage.getItem("watchList"))
    const newWatchlist = watchlist.filter(movie => movie !== id)
    console.log(newWatchlist)
    localStorage.setItem("watchList", JSON.stringify(newWatchlist))
    if (newWatchlist.length === 0){
        watchlistEl.innerHTML = 
        `<div> Your watchlist looks empty, let's add some movies
        </div>`
    } else {
        displayWatchlist()
    }
    
}

displayWatchlist()