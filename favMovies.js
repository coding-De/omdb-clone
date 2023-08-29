let movieNameLocal = JSON.parse(localStorage.getItem("favMovies"));
let favList = document.getElementById("favList");

movieNameLocal.map((movieName) => {
  fetchMovies(movieName);
})


async function fetchMovies(searchTerm) {

  const URL = `https://www.omdbapi.com/?t=${searchTerm}&apikey=d19cd846`;


  const res = await fetch(`${URL}`); //Fetching data from server

  const data = await res.json(); //convert data to readable format (JSON)
  // if(!movieArr.includes(data))

  displayMoviesList(data);

}

const displayMoviesList = (data) => {
  const favMoviesList = document.createElement("div");
  favMoviesList.innerHTML = " ";
  favMoviesList.setAttribute("id", "deletefavId"); //Set unique id to delete exact movie
  favMoviesList.setAttribute("class", "result-grid"); //Add CSS
  favMoviesList.innerHTML += `
    <div   data-id = " ${data.Title} ">
        
    <img
      src="${data.Poster} "
      class="cardimgtop"
      alt="..."
      data-id = "${data.Title} "
    />
    <div class="textCointainer" >
      <h1 class="card-title" >
         ${data.Title}   
      </h1>

      <p  >
      <div class="movieYear">
      <h2>Year</h2>
      <div>${data.Year}</div>
         
            <h2>Rating</h2>
          <span id="rating">&nbsp;${data.imdbRating}</span>
        </div>
      </p>
      
      <h1>Description</h1>
      <li class="moviePlot"> ${data.Plot}</li>
      <h2>Actors Name</h2>
      <li>
      ${data.Actors} 
      </li>
      
       
    </div>
  
</div>
        `
  const btn = document.createElement("button");
  btn.setAttribute("id", "delete-btn"); // Add CSS
  btn.innerHTML = `<button id="${data.Title}">❌</button>`; //Set unique id to delete exact movie

  btn.addEventListener("click", deleteMovie); // Add event listener to each button
  favMoviesList.appendChild(btn); //Add button to Movie

  favList.appendChild(favMoviesList);
}


const deleteMovie = (e) => {
  console.log(e.target.id)
  const favMoviesList = document.getElementById("favList");
  favMoviesList.innerHTML = "";
  let favMovies = [];
  const index = movieNameLocal.indexOf(e.target.id);
  if (index > -1) { // only splice array when item is found
    movieNameLocal.splice(index, 1); // 2nd parameter means remove one item only
    console.log(index)

    favMovies = movieNameLocal;
    console.log(movieNameLocal)
    movieNameLocal.map((movieName) => {
      fetchMovies(movieName);
    })
    // set favourite movie in localStorage
    localStorage.setItem("favMovies", JSON.stringify(movieNameLocal));
  }
};
