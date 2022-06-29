const fetchBestMovie = function() {
    return fetch("http://localhost:8000/api/v1/titles/?sort_by=-imdb_score").then(function (response) {
        return response.json();
    }).then(function (data) {
        return data["results"][0];
    })
}

const displayBestMovie = function(movie) {
    const bestVideoTitle = document.querySelector("#best-video-title");
    bestVideoTitle.innerHTML = movie["title"];

    const bestVideoImage = document.querySelector("#best-video-image");
    bestVideoImage.setAttribute("src", movie["image_url"]);
}

window.onload = async function(event) {
    console.log("Bonjour");
    const bestMovie = await fetchBestMovie();
    console.log(bestMovie);
    displayBestMovie(bestMovie);
}