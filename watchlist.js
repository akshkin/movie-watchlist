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
                                <button class="btn" id="${id}" onclick="removeFromWatchlist(id)">
                                    <svg class="remove-icon" xmlns="http://www.w3.org/2000/svg" 
                                    aria-hidden="true" role="img" 
                                    width="1.2em" 
                                    height="1.2em" 
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
    else
    {
       watchlistEl.innerHTML = `
                    <div class="empty-container">
                        <h3 class="empty-container-title">Your watchlist is looking a little empty...</h3>
                        <p class="empty-text watchlist-empty-text">
                            <a class="empty-link" href="index.html">
                            <svg class="plus-icon" xmlns="http://www.w3.org/2000/svg" 
                            aria-hidden="true" 
                            role="img" width="1em" 
                            height="1em" preserveAspectRatio="xMidYMid meet" 
                            viewBox="0 0 24 24">
                            <path fill="currentColor" 
                            fill-rule="evenodd" d="M12 1C5.925 1 1 5.925 1 12s4.925 11 11 11s11-4.925 11-11S18.075 1 12 1Zm1 15a1 1 0 1 1-2 0v-3H8a1 1 0 1 1 0-2h3V8a1 1 0 1 1 2 0v3h3a1 1 0 1 1 0 2h-3v3Z" clip-rule="evenodd"/>
                            </svg> 
                            <span class="add-hover">Let's add some movies!</span>
                            </a>
                        </p>

                    </div>` 

    }
}

function removeFromWatchlist(id){
    const watchlist = JSON.parse(localStorage.getItem("watchList"))
    const newWatchlist = watchlist.filter(movie => movie !== id)
    console.log(newWatchlist)
    localStorage.setItem("watchList", JSON.stringify(newWatchlist))
    displayWatchlist()
}

displayWatchlist()