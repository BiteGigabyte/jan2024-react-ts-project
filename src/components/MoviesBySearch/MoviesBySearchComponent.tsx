import React, { FC, useEffect } from 'react';
import { useForm } from "react-hook-form";
import { useSearchParams } from "react-router-dom";

import { useAppDispatch, useAppSelector } from "../../hooks/reduxHooks";
import { movieActions } from "../../redux/slices/movieSlice";
import { Movie } from "../MovieComponent/Movie";
import { PaginationComponent } from "../PaginationComponent/PaginationComponent";
import css from './MoviesBySearchComponent.module.css';

interface IFormProps {
    searchName: string,
}

const MoviesBySearchComponent: FC = () => {
    const { moviesBySearch, searchName, searchPage } = useAppSelector(state => state.movies);
    const dispatch = useAppDispatch();

    const formObj = useForm<IFormProps>();
    const { register, handleSubmit, setValue } = formObj;

    const [query, setQuery] = useSearchParams();

    useEffect(() => {
        // Оновлюємо параметр page до значення '1' при монтажі компонента
        setQuery({ page: searchPage || '1' });
    }, []);

    useEffect(() => {
        // Викликаємо пошук фільмів при зміні параметра page
        dispatch(movieActions.searchMovies({
            name: formObj.getValues('searchName') || searchName,
            page: query.get('page') || searchPage || '1'
        }));
    }, [query.get('page')]);  // Вказуємо залежність від query.get('page')

    const save = (formValues: IFormProps) => {
        // Встановлюємо новий параметр page у URL при відправці форми
        setQuery({ page: '1' });

        // Зберігаємо значення searchName та оновлюємо searchPage у Redux store
        dispatch(movieActions.searchNameSaver({ searchName: formValues.searchName, searchPage: '1' }));

        // Оновлюємо значення searchName в локальному стані форми
        setValue('searchName', formValues.searchName);

        // Викликаємо пошук фільмів з новими значеннями
        dispatch(movieActions.searchMovies({
            name: formValues.searchName,
            page: '1'  // Встановлюємо значення '1' як стартове значення для page
        }));
    };

    return (
        <div className={css.MoviesBySearchComponent}>
            <form className={css.MoviesBySearchComponentForm} onSubmit={handleSubmit(save)}>
                <input className={css.MoviesBySearchComponentFormInput} placeholder='Movie name' type="text" {...register('searchName')} />
                <button className={css.MoviesBySearchComponentFormButton}>
                    <img src="https://img.icons8.com/?size=30&id=DZe3wFKTc8IK&format=png&color=000000"
                         alt="searchButton"/>
                </button>
            </form>
            <div className={css.MoviesBySearchComponentDiv}>
                {moviesBySearch && moviesBySearch.results.map(movie => (
                    <Movie key={movie.id} movie={movie}/>
                ))}
            </div>
            {moviesBySearch && moviesBySearch.results.length > 0 &&
                <PaginationComponent page={moviesBySearch.page.toString()} total_pages={moviesBySearch.total_pages}/>
            }
        </div>
    );
};

export default MoviesBySearchComponent;
