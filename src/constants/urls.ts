const baseURL = 'https://api.themoviedb.org/3';

const movies = '/discover/movie';
const genres = '/genre/movie/list';
const account = '/account';
const movie_details = '/movie';


const urls = {
    movies: {
        base: movies,
        genres: genres,
        movie_details: (movie_id: number) => movie_details + `${movie_id}?language=en-US`
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
    urls
}