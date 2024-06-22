import React, { FC } from 'react';
import { RatingStar } from 'react-ts-rating-star';
import { useNavigate } from 'react-router-dom';

import { IMovie } from '../../interfaces/movies.interface';
import { imageURL, urls } from '../../constants/urls';
import css from './Movie.module.css';

interface IProps {
    movie: IMovie;
}

const Movie: FC<IProps> = ({ movie }) => {
    const { id, original_title, poster_path, vote_average } = movie;
    const navigate = useNavigate();

    const handleMovieClick = () => {
        navigate(`/info/${id}`);
    };

    return (
        <div className={css.movieComponent} onClick={handleMovieClick}>
            <div className={css.playIcon}></div>
            <img src={imageURL + urls.movies.getImage(poster_path)} alt={`${id}`} />
            <RatingStar
                iconHeight={'2em'}
                iconWidth={'5em'}
                numberOfStars={10}
                averageRating={vote_average}
                iconHoverEffect={'none'}
            />
            <div className={css.movieTitle}>{original_title}</div>
        </div>
    );
};

export { Movie };
