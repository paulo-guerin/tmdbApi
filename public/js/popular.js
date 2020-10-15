fetch('https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=87dfa1c669eea853da609d4968d294be')
.then( data => data.json())
.then( resultats => {
  let randMoviesDiv = document.getElementById("randMoviesDiv");
  resultats.results.slice(0,7).forEach((result, index) => {

    let randMovieDiv = document.createElement("div");
    randMoviesDiv.appendChild(randMovieDiv);
    randMovieDiv.className = "randMovieDiv";
    randMovieDiv.id="randMovie"+index;
    let posterLink = document.createElement("a");
    posterLink.href="element.html?id="+result.id+"&type=movie";
    posterLink.className="posterDivPop";
    randMovieDiv.appendChild(posterLink);
    let poster = document.createElement("div");
    poster.className="posterDivPop";
    posterLink.appendChild(poster);
    poster.style.backgroundImage= "url('https://image.tmdb.org/t/p/w500"+result.poster_path+"')";
    poster.style.backgroundSize = "100%";
    poster.style.backgroundRepeat = "no-repeat";

    let movieTitle=document.createElement("h4");
    movieTitle.innerHTML=result.title+"<br><span class='text-secondary'>"+result.release_date+"</span>";
    randMovieDiv.appendChild(movieTitle);
  });
})
.catch( err => console.error('Ca deconne'))

