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
    console.dir(genres);
    genres.forEach(async function(genre, index){
        console.log(genre);
        const genreArticle = document.createElement("article");
        genreArticle.innerHTML = `<h2>${genre["name"]}</h2>`;
        genresListSection.append(genreArticle);
        displayMoviesByGenre(genre, genreArticle);
    });
}

const displayMoviesByGenre = function(genre, genreArticle) {
    const carouselItem = document.createElement("div");
    carouselItem.classList.add("carousel", "js-product-carousel");

    const carouselViewItem = document.createElement("div");
    carouselViewItem.classList.add("carousel__view");

    const previousItem = document.createElement("span");
    previousItem.classList.add("carousel__control", "js-carousel-prev");
    previousItem.innerHTML = `<i class="icon">previous</i>`;

    const nextItem = document.createElement("span");
    nextItem.classList.add("carousel__control", "js-carousel-next");
    nextItem.innerHTML = `<i class="icon">next</i>`;

    const moviesListItem = document.createElement("ul");
    moviesListItem.classList.add("product-list", "js-product-list");

    const productListWidth = 0;
    const productAmountVisible = 3;
    const productAmount = 0;

    const moveProductList = function() {
    moviesListItem.style.transform = `translateX(-${205*genre["step"]}px)`;
    }

    previousItem.onclick = function() {
        if(genre["step"] > 0) {
            genre["step"]--;
            moveProductList();
        }
    };

    nextItem.onclick = function() {
        console.log("next");
        console.log(genre["step"]);
        console.log(genre["movies"].length)
        if(genre["step"] < genre["movies"].length-productAmountVisible) {
            genre["step"]++;
            moveProductList();
        }
    };
   
    
    carouselViewItem.appendChild(previousItem);
    carouselViewItem.appendChild(nextItem);

    console.log(genre);
    console.log(genre["movies"]);
    for (const movie of genre["movies"]) {
        const movieItem = document.createElement("li");
        movieItem.classList.add("product-list__item");
        movieItem.innerHTML = `<div class="product"><img src="${movie["image_url"]}" alt="${movie["title"]}" /></div>`;
        moviesListItem.appendChild(movieItem);
    }

    carouselViewItem.appendChild(moviesListItem);
    carouselItem.appendChild(carouselViewItem);
    genreArticle.appendChild(carouselItem);
}


const displayBestMovies = function(genre){
    displayMoviesByGenre(genre, document.querySelector("#best-movies"));
}
window.onload = async function(event) {
    console.log("Bonjour");
    const bestMovies = await fetchBestMovies();
    const bestMovie = bestMovies[0];
    const genres = await fetchGenresList();
    const genreList = [];
    for (const genre of genres) {
        const movies = await fetchMoviesByGenre(genre["name"]);
        genreList.push({
            "name": genre["name"],
            "movies": movies,
            "step": 0
        });
    }

    console.log(bestMovie);
    console.log(genreList);
    displayBestMovie(bestMovie);
    const bestMoviesGenre = {
        "movies": bestMovies,
        "step": 0
    }
    displayBestMovies(bestMoviesGenre);
    displayGenres(genreList);
}

