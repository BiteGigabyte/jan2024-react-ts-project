import React, {useEffect} from 'react';
import {useAppDispatch, useAppSelector} from "../../hooks/reduxHooks";
import {movieActions} from "../../redux/slices/movieSlice";
import {Movie} from "./Movie";

const Movies = () => {

    let {movies} = useAppSelector(state => state.movies);
    let dispatch = useAppDispatch();

    useEffect(() => {
        dispatch(movieActions.getMovies());
    }, [dispatch]);

    return (
        <div>
            {movies.map (movie => <Movie key={movie.id} movie={movie}/>)}
        </div>
    );
};


export {Movies};