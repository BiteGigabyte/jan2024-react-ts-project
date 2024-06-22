import React, { useEffect } from 'react';
import { useParams, useSearchParams } from "react-router-dom";

import { useAppDispatch, useAppSelector } from "../../hooks/reduxHooks";
import { movieActions } from "../../redux/slices/movieSlice";
import { Movie } from "../MovieComponent/Movie";
import { PaginationComponent } from "../PaginationComponent/PaginationComponent";
import css from './MoviesByGenres.module.css';

const MoviesByGenresComponent = () => {
    const { id } = useParams<{ id: string }>(); // Отримуємо genreId з URL
    const { moviesByGenre } = useAppSelector(state => state.movies);
    const [query, setQuery] = useSearchParams({ page: '1' });
    const dispatch = useAppDispatch();


    const pageId = query.get('page');



    useEffect(() => {
        if (id && id !== 'null') {
            const numericGenreId = +id;
            const numericPageId = pageId ? +pageId : 1; // Конвертуємо pageId в число або встановлюємо значення за замовчуванням 1
            const argArray = {
                id: numericGenreId,
                page: numericPageId
            }
            dispatch(movieActions.getMoviesByGenre(argArray));
        }
    }, [pageId, dispatch, id]);

    return (
        <div className={css.MoviesByGenres}>
            <div className={css.MoviesByGenresDiv}>
                {moviesByGenre && moviesByGenre.results.map(movie => <Movie key={movie.id} movie={movie} />)}
            </div>
            {moviesByGenre?.total_pages && <PaginationComponent page={query.get('page') || '1'} total_pages={moviesByGenre.total_pages} />}
        </div>
    );
};

export { MoviesByGenresComponent };
