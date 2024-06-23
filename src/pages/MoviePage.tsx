import React, { useEffect, useState } from 'react';
import { MovieInfoComponent } from "../components/MovieInfoContainer/MovieInfoComponent";
import { movieService } from "../services/movieService";
import { useParams } from "react-router-dom";
import {IMovieInterface} from "../interfaces/movie.interface";

const MoviePage = () => {
    const [movie, setMovie] = useState<IMovieInterface | null>(null);

    let { id} = useParams<{ id: string }>();

    useEffect(() => {
        const fetchMovie = async () => {
            if (id) {
                try {
                    const response = await movieService.getMovie(+id);
                    setMovie(response.data);
                } catch (error) {
                    console.error("Failed to fetch movie", error);
                }
            }
        };

        fetchMovie().catch((error) => {
            console.error("An unexpected error occurred:", error);
        });
    }, [id]);

    return (
        <div>

            {movie ? <MovieInfoComponent movie={movie}/> : <div>Loading...</div>}
        </div>
    );
};

export { MoviePage };
