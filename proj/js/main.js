/**
* @projectDescription javascript file of the movie page.
* @author Adriel Gaviola
*/

//MovieDb values
const api_key = 'd0d6c0927837ced48244f5ebbd4e489c';
const url = 'https://api.themoviedb.org/3/search/movie?api_key=d0d6c0927837ced48244f5ebbd4e489c';
const image_url = 'https://image.tmdb.org/t/p/w500';

//Selecting elements from the DOM
const searchButton = document.querySelector('#search');
const inputElement = document.querySelector('#search-value');
const searchedMovie= document.querySelector('#searched-movies');
const topRatedMovies = document.querySelector('#top-rated-movies');
const popularMovies = document.querySelector('#popular-movies');
const latestMovies = document.querySelector('#latest-movies');
const upcomingMovies = document.querySelector('#upcoming-movies');


//An event that handle the movie/s searched
searchButton.onclick = function(event) {
	event.preventDefault();
	const value = inputElement.value;
	const newUrl = url + '&query=' + value;

	fetch(newUrl)
		.then((res) => res.json())
		.then(renderSearchedMovie)
		.catch((error) => {
			console.log('Error', error);
		});
	inputElement.value = '';	
}

//An event that shows all the upcoming movies
upcomingMovies.onclick = function(event) {
	event.preventDefault();
	const upcomingUrl = 'https://api.themoviedb.org/3/movie/upcoming?api_key=' + api_key;
	fetch(upcomingUrl)
		.then((res) => res.json())
		.then(renderSearchedMovie)
		.catch((error) => {
			console.log('Error', error);
	});
}

//An event that shows all the latest movies
latestMovies.onclick = function(event) {
	event.preventDefault();
	const upcomingUrl = 'https://api.themoviedb.org/3/movie/now_playing?api_key=' + api_key;
	fetch(upcomingUrl)
		.then((res) => res.json())
		.then(renderSearchedMovie)
		.catch((error) => {
			console.log('Error', error);
	});	
}

//An event that shows all the popular movies
popularMovies.onclick = function(event) {
	event.preventDefault();
	const upcomingUrl = 'https://api.themoviedb.org/3/movie/popular?api_key=' + api_key;
	fetch(upcomingUrl)
		.then((res) => res.json())
		.then(renderSearchedMovie)
		.catch((error) => {
			console.log('Error', error);
	});
}

//An event that shows all the top rated movies
topRatedMovies.onclick = function(event) {
	event.preventDefault();
	const upcomingUrl = 'https://api.themoviedb.org/3/movie/top_rated?api_key=' + api_key;
	fetch(upcomingUrl)
		.then((res) => res.json())
		.then(renderSearchedMovie)
		.catch((error) => {
			console.log('Error', error);
	});
}

//Initialize the introductory page containing a list of latest movies
function introductoryDisplay() {
	latestMovies.click();
}
function getMovieImage(Movie) {	
	return Movie.map((Movie) => {
		if (Movie.poster_path) {
			return `<a onclick="MovieSelected('${Movie.id}')" class="btn btn-primary" href="#"><img
				src=${image_url + Movie.poster_path} 
				data-movie-id=${Movie.id}
			/></a>`;
		}
	})
}

//Create the container where the movies will be displayed
function createMovieContainer(Movie) {
	const MovieElement = document.createElement('div');
	MovieElement.setAttribute('class', 'Movie');

	const MovieTemplate = `
		<section class="movie-section">
			${getMovieImage(Movie)}
		</section>
		<div class="content">
			<p id="content-close">x</p>
		</div>
	`;

	MovieElement.innerHTML = MovieTemplate;
	return MovieElement;
}

//Gets the data related to the searched movie
function renderSearchedMovie(data) {
	searchedMovie.innerHTML = '';
	const Movie = data.results;
	const MovieList = createMovieContainer(Movie);
	searchedMovie.appendChild(MovieList);
}

//Stores the id of the selected movie
function MovieSelected(id) {
	sessionStorage.setItem('movieId', id);
	window.location = 'moviePage.html';
	return false;
}

//Gets the movie trailer using youtube iframe api
function getTrailer() {
	const MovieId = sessionStorage.getItem('movieId');
	const trailerUrl = "https://api.themoviedb.org/3/movie/" + MovieId + "/videos?api_key=" + api_key;
	fetch(trailerUrl)
		.then((res) => res.json())
		.then((data) => {
			const output =`
				<iframe class = "trailer" src = "https://www.youtube.com/embed/${data.results[0].key}" allowfullscreen></iframe>
			`;
			$(".video").html(output);
		})
		.catch((error) => {
			console.log('Error ', error);
		});
}

//Toggle the visibility of the trailer
function toggle() {
	var trailer = document.querySelector(".youtube");
	trailer.classList.toggle("active");
}

//Gets the details of the selected movie
function getMovie() {
	const MovieId = sessionStorage.getItem('movieId');
	const idUrl = "https://api.themoviedb.org/3/movie/" + MovieId + "?api_key=" + api_key;
	fetch(idUrl)
		.then((res) => res.json())
		.then((data) => {
			var x, name = "";
			var genre = data.genres;
			for (x in genre) {
			name += genre[x].name.valueOf() + ", ";
			};
			const output =`
				<div class="row">
					<div class="poster">
						<img src=${image_url + data.poster_path} data-movie-id=${MovieId}/>
					</div>
					<div class="movie-details">
						<h2>${data.title}</h2>
						<ul class="detail-list">
							<li class="movie-item"><strong>Genres: </strong>${name}</li>
							<li class="movie-item"><strong>Release Date: </strong>${data.release_date}</li>
							<li class="movie-item"><strong>Popularity: </strong>${data.popularity}</li>
							<li class="movie-item"><strong>Rating: </strong>${data.vote_average}</li>
							<li class="movie-item"><strong>Status: </strong>${data.status}</li>
						</ul>
						<h3>Overview</h3>
						<p>${data.overview}</p>
						<a href="http://imdb.com/title/${data.imdb_id}" target="_blank" class="imdb-button">View IMDB</a>
						<a onclick="toggle();" href="#" class="trailer-button">View Trailer</a>		
						<a href="movies.html" class="back-button">Go Back to Search Movies</a>	
					</div>
				</div>
			`;
			$(".overview").html(output);
		})
		.catch((error) => {
			console.log('Error', error);
	});
}