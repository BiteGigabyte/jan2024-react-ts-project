import React, { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from "../hooks/reduxHooks";
import { movieActions } from "../redux/slices/movieSlice";
import { GenresComponent } from "../components/GenresComponent/GenresComponent";
import { Movie } from "../components/MoviesContainer/Movie";
import {MoviesByGenresComponent} from "../components/MoviesByGenres/MoviesByGenresComponent";

const GenresPage = () => {
    const { genres, moviesByGenre } = useAppSelector(state => state.movies);
    const dispatch = useAppDispatch();

    useEffect(() => {
        if (!genres) {
            dispatch(movieActions.getGenres());
        }
        console.log('GenresPage useEffect triggered');
    }, [dispatch]);

    console.log('Movies by Genre:', moviesByGenre);

    return (
        <div>
            {genres ? genres.genres.map((genre, index) => (
                <GenresComponent key={index} genre={genre} />
            )) : '...loading genres.'}
            {/*{moviesByGenre && moviesByGenre.map(movie => (*/}
            {/*    <Movie key={movie.id} movie={movie} />*/}
            {/*))}*/}
            {/*{moviesByGenre && <MoviesByGenresComponent/>}*/}
            <MoviesByGenresComponent/>
        </div>
    );
};

export { GenresPage };
