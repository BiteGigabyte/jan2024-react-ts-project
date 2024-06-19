import React, {FC, PropsWithChildren} from 'react';

import {IMovie} from "../../interfaces/movies.interface";
import {imageURL, urls} from "../../constants/urls";
import {useNavigate} from "react-router-dom";

interface IProps extends PropsWithChildren {
    movie: IMovie
}

const Movie:FC<IProps> = ({movie}) => {
    
    let {id, original_title, release_date, overview, original_language, poster_path} = movie;

    let navigate = useNavigate();

    return (
        <div onClick={() => navigate(`/info/${id}`)}>
            <div>original_title: {original_title}</div>
            <img src={imageURL + urls.movies.getImage(poster_path)} alt={`${id}`}/>
        </div>
    );
}

export {Movie}