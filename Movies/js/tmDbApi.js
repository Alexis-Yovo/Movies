export class TmdbApi {
    constructor(token) {
        this.token = token;
        this.baseUrl = "https://api.themoviedb.org/3";
    }

    // Voir des films
    async discoverMovies(page = 1) {
        const response = await fetch(`${this.baseUrl}/discover/movie?api_key=${this.token}&page=${page}`);
        if (!response.ok) throw new Error("Erreur lors de la récupération des films.");
        const data = await response.json();
        return { results: data.results, totalResults: data.total_results };
    }

    // Rechercher des films
    async searchMovies(query, page = 1) {
        console.log(`Recherche pour le terme : ${query}`);
        const response = await fetch(`${this.baseUrl}/search/movie?api_key=${this.token}&query=${encodeURIComponent(query)}&page=${page}`);
        if (!response.ok) throw new Error("Erreur lors de la recherche des films.");
        const data = await response.json();
        console.log("Données API:", data);
        return { results: data.results, totalResults: data.total_results };
    }

}
