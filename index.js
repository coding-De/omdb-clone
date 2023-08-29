
let searchbtn = document.getElementById("Searchbtn");
//input box
searchbtn.addEventListener("input", findMovies);
 


function findMovies(e) {
  fetchMovies(e.target.value)
  if(e.target.value==""){
    let movieCard = document.getElementById("search-listId");
      movieCard.innerHTML ="";
  }
}
async function fetchMovies(searchTerm) {
 
  const URL = `https://www.omdbapi.com/?t=${searchTerm}&apikey=d19cd846`;


  const res = await fetch(`${URL}`); //Fetching data from server

  const data = await res.json(); //convert data to readable format (JSON)
  // if(!movieArr.includes(data))
 
  displayMoviesList(data);

}


const displayMoviesList = (data) => {
  
   
    if (data.Response == "True") {
      let movieCard = document.getElementById("search-listId");
      movieCard.innerHTML += `
          <div class="cardlist" data-id = " ${data.Title} ">
          <a href="moviePage.html?${data.Title}" >
            <img
              src="${data.Poster} "
              class="card-img-top"
              alt="..."
              data-id = "${data.Title} "
            />
            <div class="card-body text-start">
              <h5 class="card-title" >
                <a href="moviePage.html?${data.Title}" data-id = "${data.Title} "> ${data.Title}  </a>
              </h5>
  
              
                <i class="fa-solid fa-star">
                  <span id="rating">&nbsp;${data.imdbRating}</span>
                </i>
                <a id="${data.Title} " accessKey="${data.Title} ">
                🧡
                </a>
            </div>
          </a>
        </div>
      `;
    }
 

}