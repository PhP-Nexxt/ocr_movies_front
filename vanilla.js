window.onload = function(event) {
    console.log("Bonjour")
    fetch("http://localhost:8000/api/v1/titles/?sort_by=-imdb_score").then(function (response) {
        return response.json();
    }).then(function (data) {
        console.log(data);
    })
}