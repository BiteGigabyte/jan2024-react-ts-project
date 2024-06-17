import React, {FC, PropsWithChildren} from 'react';
import {IMovie} from "../../interfaces/movie.interface";

interface IProps extends PropsWithChildren {
    movie: IMovie
}

const Movie:FC<IProps> = ({movie}) => {
    
    let {id, original_title, release_date, overview, original_language} = movie;
    
    return (
        <div>
            <div>id: {id}</div>
            <div>original_title: {original_title}</div>
            <div>release_date: {release_date}</div>
            <div>overview: {overview}</div>
            <div>original_language: {original_language}</div>
        </div>
    );
}

export {Movie}