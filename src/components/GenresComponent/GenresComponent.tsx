import React, { FC, useEffect } from 'react';
import {useNavigate, useParams, useSearchParams} from "react-router-dom";
import { Genre } from "../../interfaces/genres.interface";
import { useAppDispatch } from "../../hooks/reduxHooks";
import { movieActions } from "../../redux/slices/movieSlice";

interface IProps {
    genre: Genre;
}

const GenresComponent: FC<IProps> = ({ genre }) => {
    let [query, setQuery] = useSearchParams();
    // const dispatch = useAppDispatch();

    let navigate = useNavigate();

    let {id} = useParams();

    const handleClick = () => {
        // setQuery({ id: genre.id.toString() });
        navigate(`/genres/${genre.id}`)
        // navigate(`/genres/${genre.id}?page=${query.get('page')}`)
    };

    //     const genreId = query.get('id');
    // useEffect(() => {
    //     if (genreId && genreId !== 'null') {
    //         const numericGenreId = +genreId;
    //         dispatch(movieActions.getMoviesByGenre(numericGenreId));
    //     }
    //     console.log('GenresComponent useEffect triggered for Genre ID:', genreId);
    // }, [genreId, dispatch]);


    return (
        <div onClick={() => handleClick()}>
            {genre.name}
        </div>
    );
};

export { GenresComponent };
