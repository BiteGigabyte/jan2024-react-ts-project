import React, { useEffect, useState } from 'react';

import { useAppDispatch, useAppSelector } from "../hooks/reduxHooks";
import { movieActions } from "../redux/slices/movieSlice";
import { GenresComponent } from "../components/MoviesByGenres/GenresComponent/GenresComponent";
import { MoviesByGenresComponent } from "../components/MoviesByGenres/MoviesByGenresComponent";
import css from './Genres.module.css';

const GenresPage = () => {
    const { genres, moviesByGenre } = useAppSelector(state => state.movies);
    const dispatch = useAppDispatch();
    const [activeGenre, setActiveGenre] = useState<number | null>(null); // Додано стан для активного жанру

    useEffect(() => {
        if (!genres) {
            dispatch(movieActions.getGenres());
        }
    }, [dispatch]);

    const handleGenreClick = (genreId: number) => {
        setActiveGenre(genreId);
    };

    return (
        <div className={css.Genres}>
            <div className={css.GenresMainDiv}>
                {genres ? genres.genres.map((genre, index) => (
                    <GenresComponent
                        key={index}
                        genre={genre}
                        isActive={activeGenre === genre.id} // Передаємо активний стан
                        onClick={handleGenreClick} // Передаємо функцію обробки кліку
                    />
                )) : '...loading genres.'}
            </div>
            <MoviesByGenresComponent/>
        </div>
    );
};

export { GenresPage };
