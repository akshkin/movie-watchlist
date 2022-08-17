// const apikey = "907fb758"
const searchInput = document.getElementById("input")
const main = document.getElementById("main")

let moviesIdArray = []
let watchlistArray = JSON.parse(localStorage.getItem("watchList")) || []
let html = ""

document.getElementById("search-btn").addEventListener("click", searchMovie)

async function searchMovie(event){
    event.preventDefault()
    // get imdb id array
    moviesIdArray = []
    const response = await fetch(`https://www.omdbapi.com/?apikey=907fb758&s=${searchInput.value}`)
    const data = await response.json()
            
            console.log(data.Search)
            for (let id of data.Search){
                imdbId = id.imdbID
                moviesIdArray.push(imdbId)
            }
            console.log(moviesIdArray) 
            displayMovies(imdbId)
        }
            
      
    function displayMovies(id){
      
        let html = ""
     
            for(let id of moviesIdArray) {                             
                fetch(`https://www.omdbapi.com/?apikey=907fb758&i=${id}`)
                    .then(response => response.json())
                    .then(data => {  
                                         
                            html += `<div id="container" class="container">  
                                       <div id="poster" class="column1">
                                           <img src="${data.Poster}" alt="${data.Title} poster"/>
                                       </div>
                                       <div class="info" class="column2">
                                           <div class="rows">
                                               <h4 class="movie-title">${data.Title}</h4> 
                                               <span class="movie-rating">⭐${data.imdbRating}</span>
                                           </div>
                                           <div class="rows">
                                               <p  class="movie-runtime">${data.Runtime}</p> 
                                               <p class="movie-genre">${data.Genre}</p> 
                                               <button class="btn" id="${id}" onclick="addToWatchlist(id)">
                                                   <svg class="plus-icon" xmlns="http://www.w3.org/2000/svg" 
                                                   aria-hidden="true" 
                                                   role="img" width="1.2em" 
                                                   height="1.2em" preserveAspectRatio="xMidYMid meet" 
                                                   viewBox="0 0 24 24">
                                                   <path fill="currentColor" 
                                                   fill-rule="evenodd" d="M12 1C5.925 1 1 5.925 1 12s4.925 11 11 11s11-4.925 11-11S18.075 1 12 1Zm1 15a1 1 0 1 1-2 0v-3H8a1 1 0 1 1 0-2h3V8a1 1 0 1 1 2 0v3h3a1 1 0 1 1 0 2h-3v3Z" clip-rule="evenodd"/>
                                                   </svg> 
                                               watchlist</button>
                                           </div>
                                           <p  class="movie-plot">${data.Plot}</p>
                                       </div> 
                                   </div>        
                                 ` 
                    
                              main.innerHTML = html 
             })  
        }  
}

function addToWatchlist(id){
    const btn = document.getElementById(id)
    console.log(watchlistArray)
    if (!watchlistArray.includes(id) ){
        watchlistArray.push(id)
    }
    localStorage.setItem("watchList", JSON.stringify(watchlistArray))
}







