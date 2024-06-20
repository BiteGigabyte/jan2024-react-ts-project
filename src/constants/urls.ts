const baseURL = 'https://api.themoviedb.org/3';
const imageURL = 'https://image.tmdb.org/t/p/w500';


const movies = '/discover/movie';
const genres = '/genre/movie/list';
const account = '/account';
const movie_details = '/movie';
const searchMovie = 'search/movie'


const urls = {
    movies: {
        base: (page: string) => movies + `?page=${page}`,
        genres: genres,
        sortByGenres: (genreNumber: number, page: number) => movies + `?with_genres=${genreNumber}&page=${page}`,
        movie_details: (movie_id: number) => movie_details + `/${movie_id}`,
        searchMovie: (query: string) => searchMovie + `?query=${query}`,
        getImage:  (posterName: string) => imageURL + '/' + posterName
    },
    account: {
        base: account,
        account_details: (account_id: string) :string => account + `/${account_id}`
    },
    auth: {

    }
}

export {
    baseURL,
    imageURL,
    urls
}