export interface IMovieInterface {
    backdrop_path: string;
    genres: {
        id: number;
        name: string;
    }[];
    id: number;
    original_language: string;
    original_title: string;
    overview: string;
    poster_path: string;
    video: boolean | string;
    release_date: string;
    vote_average: number;
}

