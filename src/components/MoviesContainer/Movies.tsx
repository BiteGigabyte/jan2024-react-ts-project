import React, {useEffect} from 'react';
import {useAppDispatch, useAppSelector} from "../../hooks/reduxHooks";
import {movieActions} from "../../redux/slices/movieSlice";
import {Movie} from "./Movie";
import {useSearchParams} from "react-router-dom";
import {PaginationComponent} from "../PaginationComponent/PaginationComponent";

const Movies = () => {

    let {movies, total_pages} = useAppSelector(state => state.movies);
    let dispatch = useAppDispatch();

    let [query] = useSearchParams({page: '1'});


    useEffect(() => {
        dispatch(movieActions.getMovies(query.get('page') || '1'));
    }, [dispatch, query]);

    return (
        <div>
            {total_pages ? (
                <div>
                    <PaginationComponent page={query.get('page') || '1'} total_pages={total_pages}/>
                    {movies.map(movie => (
                        <Movie key={movie.id} movie={movie}/>
                    ))}
                </div>
            ) : (
                <div>Loading...</div>
            )}
        </div>
    );
};


export {Movies};