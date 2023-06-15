// declaring variables
var searchbutton = document.getElementById("searchbutton");

// search movies
async function searchMovies() {
    var input = document.getElementById("search").value;
    var apiKey = "f8e8a149"; //OMDB API key
    var url = `http://www.omdbapi.com/?apikey=${apiKey}&s=${encodeURIComponent(input)}`;
    try {
      var response = await fetch(url);
      var data = await response.json();
      if (data.Response === "True") {
        var movies = data.Search;
        var movieContainer = document.getElementById("movieContainer");
        movieContainer.innerHTML = ""; // Clear previous search results
        document.getElementById("notFound").style.display = "none";
        for (var i = 0; i < movies.length; i++) {
          var movie = movies[i];
          var movieElement = createMovieElement(movie);
          movieContainer.appendChild(movieElement);
        }
      } else {
        document.getElementById("movieContainer").innerHTML = "";
        document.getElementById("notFound").style.display = "block";
      }
    } catch (error) {
      console.log(error);
    }
  }

  // event listener when clicking search
  searchbutton.addEventListener("click", searchMovies);

// create movie element
function createMovieElement(movie) {
  var movieDiv = document.createElement("div");
  movieDiv.classList.add("movie");
  var img = document.createElement("img");
  img.src = movie.Poster;
  img.alt = movie.Title;
  var titleContainer = document.createElement("div");
  var title = document.createElement("h2");
  title.textContent = movie.Title;
  var heartIcon = document.createElement("i");
  heartIcon.classList.add("fas", "fa-heart");
  heartIcon.style.color = isMovieInFavorites(movie.Title) ? "red" : "black";
  titleContainer.appendChild(title);
  titleContainer.appendChild(heartIcon);
  movieDiv.appendChild(img);
  movieDiv.appendChild(titleContainer);

  // Event listener for movie title click
  title.addEventListener("click", function () {
    // Create the Google search URL for the movie title
    var searchQuery = "https://www.google.com/search?q=" + encodeURIComponent(movie.Title);
    // Open the Google search in a new tab
    window.open(searchQuery, "_blank");
  });

  // Event listener for heart icon click
  heartIcon.addEventListener("click", function () {
    if (heartIcon.style.color === "red") {
      // Heart is already red, toggle it back to black
      heartIcon.style.color = "black";
      removeMovieFromFavorites(movie.Title);
    } else {
      // Heart is black, toggle it to red
      heartIcon.style.color = "red";
      saveMovieToFavorites(movie.Title);
    }
  });

  return movieDiv;
}


// Save movie to favorites in local storage
function saveMovieToFavorites(movieTitle) {
  var favorites = localStorage.getItem("favorites") || "";
  favorites += movieTitle + ",";
  localStorage.setItem("favorites", favorites);
}

// Remove movie from favorites in local storage
function removeMovieFromFavorites(movieTitle) {
  var favorites = localStorage.getItem("favorites") || "";
  favorites = favorites.replace(movieTitle + ",", "");
  localStorage.setItem("favorites", favorites);
}

// Check if movie is in favorites in local storage
function isMovieInFavorites(movieTitle) {
  var favorites = localStorage.getItem("favorites") || "";
  return favorites.includes(movieTitle + ",");
}