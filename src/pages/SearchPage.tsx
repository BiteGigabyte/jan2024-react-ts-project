import React, {useEffect, useState} from 'react';
import {useAppDispatch} from "../hooks/reduxHooks";
import {movieActions} from "../redux/slices/movieSlice";
import MoviesBySearchComponent from "../components/MoviesBySearch/MoviesBySearchComponent";

const SearchPage = () => {

    return (
        <div>
            <MoviesBySearchComponent/>
        </div>
    );
};

export {SearchPage};