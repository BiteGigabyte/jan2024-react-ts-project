import React, { FC, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { RatingStar } from 'react-ts-rating-star';

import { imageURL, urls } from '../../constants/urls';
import css from './MovieInfoComponent.styles.module.css';
import { IMovieInterface } from '../../interfaces/movie.interface';
import { useAppSelector, useAppDispatch } from '../../hooks/reduxHooks';
import { movieActions } from '../../redux/slices/movieSlice';

interface IProps {
    movie: IMovieInterface;
}

const MovieInfoComponent: FC<IProps> = ({ movie }) => {
    const navigate = useNavigate();
    const [query, setQuery] = useSearchParams();
    const { searchName, searchPage } = useAppSelector(state => state.movies);
    const dispatch = useAppDispatch();

    let { id, original_title, release_date, overview, original_language, poster_path, vote_average, genres } = movie;

    // Функція для зберігання параметрів пошуку перед виходом на попередню сторінку
    const saveSearchParams = () => {
        if (searchName && searchPage) {
            // setQuery({ searchName, page: searchPage });
            dispatch(movieActions.searchNameSaver({ searchName, searchPage }));
        }
    };

    return (
        <div>
            <button className={css.MovieInfoComponentButton} onClick={() => {
                saveSearchParams();
                navigate(-1);
            }}>
                <img width="50" height="50"
                     src="https://img.icons8.com/ios/50/circled-left--v1.png"
                     alt="circled-left--v1"/>
            </button>
            <div className={css.MovieInfoComponentDiv}>
                <div className={css.MovieInfoComponentDivTitleDiv}>{original_title}</div>
                <div className={css.MovieInfoComponentDivDiv}>
                    <img className={css.MovieInfoComponentDivDivImage}
                         src={imageURL + urls.movies.getImage(poster_path)} alt={`${id}`}/>
                    <div className={css.MovieInfoComponentDivDivGeneralDiv}>
                        <div>
                            <span>Rating:</span>
                            <RatingStar numberOfStars={10} averageRating={vote_average}/>
                        </div>
                        <div><span>id:</span> <b>{id}</b></div>
                        <div><span className={css.genresSpan}>Genres:</span>
                            <div
                                className={css.MovieInfoComponentDivDivGeneralDivDIv}>{genres && genres.map((genre, index) =>
                                <div onClick={() => navigate(`/genres/${genre.id}`)} className={css.genreElem} key={index}><b>{genre.name}</b></div>)}</div>
                        </div>
                        <div><span>Release date:</span> <b>{release_date}</b></div>
                        <div><span>Original language:</span> <b>{original_language}</b></div>
                    </div>
                </div>
                <div className={css.MovieInfoComponentDivOverviewDiv}><b>Overview:</b> {overview}</div>
            </div>
        </div>
    );
};

export { MovieInfoComponent };
