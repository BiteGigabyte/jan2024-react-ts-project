import React, { FC } from 'react';
import { useNavigate } from "react-router-dom";

import { Genre } from "../../../interfaces/genres.interface";
import css from './GenresComponent.module.css';

interface IProps {
    genre: Genre;
    isActive: boolean; // Проп для активного стану
    onClick: (genreId: number) => void; // Проп для обробки кліку
}

const GenresComponent: FC<IProps> = ({ genre, isActive, onClick }) => {
    let navigate = useNavigate();

    const handleClick = () => {
        onClick(genre.id); // Встановлюємо активний жанр
        navigate(`/genres/${genre.id}`);
    };

    return (
        <div
            className={`${css.GenresComponent} ${isActive ? css.Active : ''}`} // Додаємо клас для активного стану
            onClick={handleClick}
        >
            {genre.name}
        </div>
    );
};

export { GenresComponent };
