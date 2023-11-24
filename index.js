const searchInput = document.getElementById("input");
const form = document.querySelector("form");
const searchBtn = document.getElementById("search-btn");
const main = document.getElementById("main");
const emptyContainer = document.querySelector(".empty-container");
const loader = document.getElementById("loader");
const moviesContainer = document.getElementById("movies-container");
const watchlistEl = document.getElementById("watchlist");

// store movie details in an object
let movies = {};

// store watchlist movie details in an object
let watchlistMovies = {};

// get watchlist movieIds if they exist in localStorage or set to an empty array
let watchlistArray = JSON.parse(localStorage.getItem("watchList")) || [];

// fetch imdb ids
async function fetchMovieIds(event) {
  event.preventDefault();
  let moviesIdArray = [];
  movies = {};

  loader.hidden = false;

  try {
    const response = await fetch(
      `https://www.omdbapi.com/?apikey=907fb758&s=${searchInput.value}`
    );
    const data = await response.json();

    if (!data.Search) {
      main.innerHTML = `<div class="empty-container"><h3 class="empty-container-title">Unable to find what you are looking for.<br>Please try 
            another search.</h3></div>`;
    } else {
      data.Search.map((result) => moviesIdArray.push(result.imdbID));
      fetchMovies(moviesIdArray, movies);

      searchInput.value = "";
    }
  } catch (error) {
    loader.hidden = true;
    emptyContainer.textContent = "Something went wrong!";
  }
}

// fetch movie details and store in an object
async function fetchMovies(movieIds, movies) {
  for (const id of movieIds) {
    const response = await fetch(
      `https://www.omdbapi.com/?apikey=907fb758&i=${id}`
    );
    const data = await response.json();
    const imdbId = data.imdbID;
    movies[imdbId] = data;
  }

  moviesContainer
    ? displayMovies(moviesContainer, movies)
    : displayMovies(watchlistEl, watchlistMovies);
}

// display movies
function displayMovies(element, movies) {
  loader.hidden = true;
  if (emptyContainer) emptyContainer.style.display = "none";

  let html = "";
  html = Object.keys(movies)
    .map((movieId) => {
      const movie = movies[movieId];
      return `<div id="container" class="container">  
                <div id="poster" class="column1">
                    <img src="${movie.Poster}" alt="${movie.Title} poster"/>
                </div>
                <div class="info" class="column2">
                    <div class="rows">
                        <h4 class="movie-title">${movie.Title}</h4> 
                        <span class="movie-rating">⭐${movie.imdbRating}</span>
                    </div>
                    <div class="rows">
                        <p  class="movie-runtime">${movie.Runtime}</p> 
                        <p class="movie-genre">${movie.Genre}</p> 
                        <button class="btn" onclick=toggleWatchlist("${
                          movie.imdbID
                        }")>
                            ${
                              !watchlistArray.includes(movie.imdbID)
                                ? '<img src="./images/plus-circle-fill.svg" class="plus-icon"/>'
                                : '<img src="./images/minus-circle-filled.svg" class="remove-icon" />'
                            }                                      
                            watchlist
                        </button>
                    </div>
                    <p  class="movie-plot">${movie.Plot}</p>
                </div> 
            </div>        
                        `;
    })
    .join("");
  element.innerHTML = html;
}

function addToWatchlist(id) {
  watchlistArray.push(id);
  localStorage.setItem("watchList", JSON.stringify(watchlistArray));
}

function removeFromWatchlist(id) {
  watchlistArray = watchlistArray.filter((movie) => movie !== id);
  localStorage.setItem("watchList", JSON.stringify(watchlistArray));
  delete watchlistMovies[id];
}

function toggleWatchlist(id) {
  if (!watchlistArray.includes(id)) {
    addToWatchlist(id);
  } else if (watchlistArray.includes(id)) {
    removeFromWatchlist(id);
  }
  moviesContainer
    ? displayMovies(moviesContainer, movies)
    : displayMovies(watchlistEl, watchlistMovies);
  watchlistEl && displayWatchlist();
}

// display watchlist
function displayWatchlist() {
  // display movies if watchlist array
  if (watchlistArray.length > 0) {
    fetchMovies(watchlistArray, watchlistMovies);
    displayMovies(watchlistEl, watchlistMovies);
  } else {
    // display no result
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
        </div>`;
  }
}

document.addEventListener("DOMContentLoaded", () => {
  if (watchlistEl) {
    displayWatchlist();
  }
  //   form event listener
  if (form) {
    form.addEventListener("submit", fetchMovieIds);
  }
});
