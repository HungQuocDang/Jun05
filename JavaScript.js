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

  function createMovieElement(movie) {
    var movieDiv = document.createElement("div");
    movieDiv.classList.add("movie");

    var img = document.createElement("img");
    img.src = movie.Poster;
    img.alt = movie.Title;

    var title = document.createElement("h2");
    title.textContent = movie.Title;

    movieDiv.appendChild(img);
    movieDiv.appendChild(title);

    return movieDiv;
  }