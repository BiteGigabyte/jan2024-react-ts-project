import React, {FC} from 'react';
import {useNavigate} from "react-router-dom";
import {RatingStar} from "react-ts-rating-star";


import {imageURL, urls} from "../../constants/urls";
import {IMovieInterface} from "../../interfaces/movie.interface";

interface IProps {
    movie: IMovieInterface;
}

const MovieInfoComponent: FC<IProps> = ({movie}) => {
    let {id, original_title, release_date, overview, original_language, poster_path, vote_average, genres} = movie;

    let navigate = useNavigate();

    return (
        <div>
            <button onClick={() => navigate(-1)}>back</button>
            <div>id: {id}</div>
            <div>genres: {genres.map(genre => <div>{genre.name};</div>)}</div>
            <div>original_title: {original_title}</div>
            <div>release_date: {release_date}</div>
            <div>overview: {overview}</div>
            <div>original_language: {original_language}</div>
            <RatingStar numberOfStars={10} averageRating={vote_average}/>
            <img src={imageURL + urls.movies.getImage(poster_path)} alt={`${id}`}/>
        </div>
    );
};

export {MovieInfoComponent};