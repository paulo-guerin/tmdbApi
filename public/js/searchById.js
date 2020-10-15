let queryArray = window.location.search.split("&");
console.log(queryArray);
let id = queryArray[0].slice(4);
let type = queryArray[1].slice(5);

fetch('https://api.themoviedb.org/3/'+type+'/'+id+'?api_key=87dfa1c669eea853da609d4968d294be&language=en-US')
.then( data => data.json())
.then( result => {
    console.log(result);
    if(result !=null){
        let img = document.getElementById("elementImg");
        if(type=="person" && result.profile_path!= null){
            img.src='https://image.tmdb.org/t/p/w500'+result.profile_path;
        }
        else if(type == "movie" || type == "tv" || type == "collection"){
            if (result.poster_path!= null){
            img.src='https://image.tmdb.org/t/p/w500'+result.poster_path;
            }else {
                img.src='public/images/tmdb.png';
            };
        } else {
            img.src='public/images/tmdb.png';
        };

        let elementDescription=document.getElementById("elementDescription");
        if(type == "movie"){
            let movieDescription=document.createElement("span");
            movieDescription.innerHTML="<h3>"+result.title+"</h3><br><span class='text-secondary'>"+result.release_date+"</span><br><p class='overview'>"+result.overview+"</p>";
            elementDescription.appendChild(movieDescription);
        } else if (type=="person"){
            let personDescription=document.createElement("span");
            personDescription.innerHTML="<h3>"+result.name+"</h3><br><span class='text-secondary'>"+result.known_for_department+"</span><br><p class='overview'> Biographie : "+result.biography+"</p>";
            elementDescription.appendChild(personDescription);
        }
        else if (type=="tv" || type=="collection"){
            let movieDescription=document.createElement("span");
            let first_air_date = '';
            if(result.first_air_date){
                first_air_date = result.first_air_date;
            }
            movieDescription.innerHTML="<h3>"+result.original_name+"</h3><br><span class='text-secondary'>"+first_air_date+"</span><br><p class='overview'>"+result.overview+"</p>";
            elementDescription.appendChild(movieDescription);
        }
    }
})
.catch( err => console.error('Ca deconne'))
