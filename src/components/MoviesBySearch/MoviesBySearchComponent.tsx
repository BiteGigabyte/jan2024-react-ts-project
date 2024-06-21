import React, { FC, useEffect } from 'react';
import { useForm } from "react-hook-form";
import { useAppDispatch, useAppSelector } from "../../hooks/reduxHooks";
import { movieActions } from "../../redux/slices/movieSlice";
import { Movie } from "../MovieComponent/Movie";
import { PaginationComponent } from "../PaginationComponent/PaginationComponent";
import { useSearchParams } from "react-router-dom";

interface IFormProps {
    searchName: string,
}

const FormComponent: FC = () => {
    const { moviesBySearch } = useAppSelector(state => state.movies);
    const dispatch = useAppDispatch();

    const formObj = useForm<IFormProps>();
    const { register, handleSubmit } = formObj;

    const [query, setQuery] = useSearchParams();

    useEffect(() => {
        // Оновлюємо параметр page до значення '1' при монтажі компонента
        setQuery({ page: '1' });
    }, []);

    useEffect(() => {
        // Викликаємо пошук фільмів при зміні параметра page
        dispatch(movieActions.searchMovies({
            name: formObj.getValues('searchName'),  // Отримуємо значення з форми
            page: query.get('page') || '1'  // Отримуємо значення параметра page
        }));
    }, [query.get('page')]);  // Вказуємо залежність від query.get('page')

    const save = (formValues: IFormProps) => {
        // Встановлюємо новий параметр page у URL при відправці форми
        setQuery({ page: '1' });
        dispatch(movieActions.searchMovies({
            name: formValues.searchName,
            page: '1'  // Встановлюємо значення '1' як стартове значення для page
        }));
    };

    return (
        <div>
            <form onSubmit={handleSubmit(save)}>
                <input type="text" {...register('searchName')} />
                <button>search</button>
            </form>
            {moviesBySearch && moviesBySearch.results.map(movie => (
                <Movie key={movie.id} movie={movie} />
            ))}
            {moviesBySearch &&  moviesBySearch.results.length > 0 &&
                <PaginationComponent page={moviesBySearch.page.toString()} total_pages={moviesBySearch.total_pages} />
            }
        </div>
    );
};

export default FormComponent;
