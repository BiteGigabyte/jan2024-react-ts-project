import React, {FC} from 'react';

import {imageURL, urls} from "../../constants/urls";
import {IMovieInterface} from "../../interfaces/movie.interface";

interface IProps {
    movie: IMovieInterface;
}

const MovieInfoComponent: FC<IProps> = ({movie}) => {
    let {id, original_title, release_date, overview, original_language, poster_path} = movie;

    return (
        <div>
            <div>id: {id}</div>
            <div>original_title: {original_title}</div>
            <div>release_date: {release_date}</div>
            <div>overview: {overview}</div>
            <div>original_language: {original_language}</div>
            <img src={imageURL + urls.movies.getImage(poster_path)} alt={`${id}`}/>
        </div>
    );
};

export {MovieInfoComponent};