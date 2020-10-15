let queryArray = window.location.search.split("&");
let queryString=queryArray[0].slice(7);
let queryType=queryArray[1].slice(5);
let searchBar=document.getElementById("searchBar");
searchBar.value = queryString;
displayResults(queryString, queryType);

function displayResults(string, type){
    fetch('https://api.themoviedb.org/3/search/'+type+'?api_key=87dfa1c669eea853da609d4968d294be&language=en-US&query='+string+'&page=1&include_adult=false')
    .then( data => data.json())
    .then( resultats => {
        if(resultats !=null){
            let resultsContainer = document.getElementById("resultsContainer");
            resultsContainer.innerHTML='';
            console.log(resultats)
            resultats.results.forEach((result, index) => {
                console.log(result);
                let resultDiv = document.createElement("div");
                resultsContainer.appendChild(resultDiv);
                resultDiv.className = "resultDiv";
                resultDiv.id="resultDiv"+index;
                let posterDiv = document.createElement("div");
                posterDiv.className="posterDiv";
                resultDiv.appendChild(posterDiv);
                let posterLink = document.createElement("a");
                posterLink.href="element.html?id="+result.id+"&type="+type;
                posterLink.className="posterLink";
                posterDiv.appendChild(posterLink);
                let posterImg= document.createElement("img");
                if(type=="person" && result.profile_path!= null){
                    posterImg.src='https://image.tmdb.org/t/p/w500'+result.profile_path;
                }
                else if(type == "movie" || type == "tv" || type == "collection"){
                    if (result.poster_path!= null){
                    posterImg.src='https://image.tmdb.org/t/p/w500'+result.poster_path;
                    }else {
                        posterImg.src='public/images/tmdb.png';
                    };
                } else {
                    posterImg.src='public/images/tmdb.png';
                };
                posterImg.className="posterImg";
                posterLink.appendChild(posterImg);
    
                posterLink.style.backgroundSize = "100%";
                posterLink.style.backgroundRepeat = "no-repeat";
                
                let descriptionDiv=document.createElement("div");
                descriptionDiv.className="descriptionDiv";
                resultDiv.appendChild(descriptionDiv);
                if(type == "movie"){
                    let movieDescription=document.createElement("span");
                    movieDescription.innerHTML="<h3>"+result.title+"</h3><br><span class='text-secondary'>"+result.release_date+"</span><br><p class='overview'>"+result.overview+"</p>";
                    descriptionDiv.appendChild(movieDescription);
                } else if (type=="person"){
                    let movieString = "";
                    if(result.known_for !=null){
                        result.known_for.forEach(element => {
                            movieString += element.original_title+", ";
                        })
                    }
                    let personDescription=document.createElement("span");
                    personDescription.innerHTML="<h3>"+result.name+"</h3><br><span class='text-secondary'>"+result.known_for_department+"</span><br><p class='overview'> Movies : "+movieString+"</p>";
                    descriptionDiv.appendChild(personDescription);
                }
                else if (type=="tv" || type=="collection"){
                    let movieDescription=document.createElement("span");
                    let first_air_date = '';
                    if(result.first_air_date){
                        first_air_date = result.first_air_date;
                    }
                    movieDescription.innerHTML="<h3>"+result.original_name+"</h3><br><span class='text-secondary'>"+first_air_date+"</span><br><p class='overview'>"+result.overview+"</p>";
                    descriptionDiv.appendChild(movieDescription);
                }
            });
        }
    })
    .catch( err => console.error('Ca deconne'))
}

document.getElementById("movie").addEventListener('click', event =>{
    displayResults(queryString, "movie")
});
document.getElementById("tv").addEventListener('click', event =>{
    displayResults(queryString, "tv")
});
document.getElementById("person").addEventListener('click', event =>{
    displayResults(queryString, "person")
});
document.getElementById("collection").addEventListener('click', event =>{
    displayResults(queryString, "collection")
});