import { TmdbApi } from './TmdbApi.js';

const apiKey = 'e46518a87af070dae71459742e1fd43a';
const tmdbApi = new TmdbApi(apiKey);

const movieList = document.getElementById('moviesList');
const searchForm = document.getElementById('searchForm');
const searchInput = document.getElementById('searchInput');
const pagination = document.getElementById('pagination');

let currentPage = 1;
let totalPages = 1;

// Afficher les films
function displayMovies(movies) {
    movieList.innerHTML = '';
    if (movies.length === 0) {
        movieList.innerHTML = '<li>Aucun film trouvé.</li>';
        return;
    }
    movies.forEach(movie => {
        const movieItem = document.createElement('li');
        movieItem.textContent = movie.title;
        movieList.appendChild(movieItem);
    });
}

// Gérer la pagination
function setupPagination(page, totalPages) {
    pagination.innerHTML = '';
    if (page > 1) {
        const prevButton = document.createElement('button');
        prevButton.textContent = 'Précédent';
        prevButton.onclick = () => changePage(page - 1);
        pagination.appendChild(prevButton);
    }
    if (page < totalPages) {
        const nextButton = document.createElement('button');
        nextButton.textContent = 'Suivant';
        nextButton.onclick = () => changePage(page + 1);
        pagination.appendChild(nextButton);
    }
}

// Changer de page
function changePage(page) {
    currentPage = page;
    fetchMovies(searchInput.value, currentPage);
}

// Récupérer les films
async function fetchMovies(query = '', page = 1) {
    try {
        loader.style.display = 'block';
        let movies;
        if (query) {
            console.log("Recherche de films pour :", query);
            movies = await tmdbApi.searchMovies(query, page);
        } else {
            movies = await tmdbApi.discoverMovies(page);
        }

        console.log("Réponse API :", movies);

        totalPages = Math.ceil(movies.totalResults / 20);
        displayMovies(movies.results);
        setupPagination(page, totalPages);
    } catch (error) {
        console.error("Erreur lors de la récupération des films:", error.message);
        alert(error.message);
    } finally {
        loader.style.display = 'none';  /
    }
}



// Submit du formulaire
searchForm.addEventListener('submit', (event) => {
    event.preventDefault();
    currentPage = 1;
    fetchMovies(searchInput.value, currentPage);
});

// Chargement initial des films à découvrir
fetchMovies();
