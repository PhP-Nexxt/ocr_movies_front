const fetchBestMovies = function() {
    return fetch("http://localhost:8000/api/v1/titles/?sort_by=-imdb_score").then(function (response) {
        return response.json();
    }).then(function (data) {
        return data["results"];
    })
}

const fetchGenresList = function() {
    return fetch("http://localhost:8000/api/v1/genres/").then(function (response) {
        return response.json();
    }).then(function (data) {
        return data["results"];
    })
}


const fetchMoviesByGenre = function(genre_name) {
    return fetch(`http://localhost:8000/api/v1/titles/?genre=${genre_name}`).then(function (response) {
        return response.json();
    }).then(function (data) {
        return data["results"];
    })
}

const displayBestMovie = function(movie) {
    const bestVideoTitle = document.querySelector("#best-video-title");
    bestVideoTitle.innerHTML = movie["title"];

    const bestVideoImage = document.querySelector("#best-video-image");
    bestVideoImage.setAttribute("src", movie["image_url"]);
}

const displayGenres = function(genres) {
    const genresListSection = document.querySelector("#genres-list");
    for (const genre in genres) {
        console.log(genre);
        const genreArticle = document.createElement("article");
        genreArticle.innerHTML = `<h2>${genres[genre]["name"]}</h2>`;
        genresListSection.append(genreArticle);
        displayMoviesByGenre(genres[genre]["movies"], genreArticle);
    }
}

const displayMoviesByGenre = function(movies, genreArticle) {
    const moviesList = document.createElement("div");
    moviesList.classList.add("slider")
    for (const movie in movies) {
        const movieElement = document.createElement("div");
        movieElement.classList.add("slide");
        movieElement.innerHTML = `<img src="${movies[movie]["image_url"]}" alt="${movies[movie]["title"]}" />`;
        movieElement.style.transform = `translateX(${movie * 100}%)`;
        moviesList.append(movieElement);
    }
    const buttonNext = document.createElement("button");
    buttonNext.classList.add("btn");
    buttonNext.classList.add("btn-next")
    buttonNext.innerHTML = "&gt;";
    moviesList.append(buttonNext);

    const buttonPrev = document.createElement("button");
    buttonPrev.classList.add("btn");
    buttonPrev.classList.add("btn-prev")
    buttonPrev.innerHTML = "&lt;";
    moviesList.append(buttonPrev);

    genreArticle.append(moviesList);
}

const displayBestMovies = function(bestMovies){
    displayMoviesByGenre(bestMovies, document.querySelector("#best-movies"));
}
window.onload = async function(event) {
    console.log("Bonjour");
    const bestMovies = await fetchBestMovies();
    const bestMovie = bestMovies[0];
    const genres = await fetchGenresList();
    for (const genre in genres) {
        const movies = await fetchMoviesByGenre(genres[genre]["name"]);
        genres[genre]["movies"] = movies;
    }

    console.log(bestMovie);
    console.log(genres);
    displayBestMovie(bestMovie);
    displayBestMovies(bestMovies);
    displayGenres(genres);
}

