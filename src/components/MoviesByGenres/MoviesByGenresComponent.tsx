import React, { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from "../../hooks/reduxHooks";
import { useParams, useSearchParams } from "react-router-dom";
import { movieActions } from "../../redux/slices/movieSlice";
import { Movie } from "../MovieComponent/Movie";
import { PaginationComponent } from "../PaginationComponent/PaginationComponent";

const MoviesByGenresComponent = () => {
    const { id } = useParams<{ id: string }>(); // Отримуємо genreId з URL
    const { moviesByGenre } = useAppSelector(state => state.movies);
    const [query, setQuery] = useSearchParams({ page: '1' });
    const dispatch = useAppDispatch();


    const pageId = query.get('page');
    console.log('pageId');
    console.log(pageId);
    console.log(pageId);
    console.log(pageId);
    console.log('pageId');


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
        console.log('MoviesByGenresComponent useEffect triggered for Genre ID:', id);
    }, [pageId, dispatch, id]);

    return (
        <div>
            {moviesByGenre?.total_pages && <PaginationComponent page={query.get('page') || '1'} total_pages={moviesByGenre.total_pages} />}
            {moviesByGenre && moviesByGenre.results.map(movie => <Movie key={movie.id} movie={movie} />)}
        </div>
    );
};

export { MoviesByGenresComponent };
