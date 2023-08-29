let movieName = window.location.href.split("?")[1].split("%20").join(" ");
let movieNameLocal = JSON.parse(localStorage.getItem("favMovies")); // Get movie ID from localstorage
let movieNameArr = [];
let togglename= document.getElementById("AddFavListbtn");
 
if(movieNameLocal){
movieNameLocal.forEach((ele)=>{
  if(ele===movieName){
    togglename.innerText="Added"
  }
  movieNameArr.push(ele);
})
}

fetchMovies(movieName);

async function fetchMovies(searchTerm){
  const URL = `https://www.omdbapi.com/?t=${searchTerm}&apikey=d19cd846`;


  const res = await fetch(`${URL}`); //Fetching data from server

  const data = await res.json();
   
  displayMovieOverview(data);
}

const displayMovieOverview = (moviedata)=>{
    let movieDetail = document.getElementById("movieDetail");
    movieDetail.innerHTML += `
        <div class="Moviecardlist" data-id = " ${moviedata.Title} ">
        
          <img
            src="${moviedata.Poster} "
            class="card-img-top"
            alt="..."
            data-id = "${moviedata.Title} "
          />
          <div class="card-body">
            <h1 class="card-title" >
               ${moviedata.Title}   
            </h1>

            <p class="card-text">
            <div class="movieYear">
            <h2>Year</h2>
            <div>${moviedata.Year}</div>
               
                <h2>Rating</h2>
                <span id="rating">&nbsp;${moviedata.imdbRating}</span>
              </div>
            </p>
            
            <h1>Description</h1>
            <li class="moviePlot"> ${moviedata.Plot}</li>
            <h2>Actors Name</h2>
            <li>
            ${moviedata.Actors} 
            </li>
            
             
          </div>
        
      </div>
    `;
}


const addfavListhandler=(e)=>{ 
  if(!(movieNameArr.includes(movieName))){
    movieNameArr.push(movieName);
  localStorage.setItem("favMovies", JSON.stringify(movieNameArr)); //set data to localstorage
  togglename.innerText = "Added Movie"
  }
}
let favbtn=document.getElementById("AddFavListbtn");
favbtn.onclick=addfavListhandler;


