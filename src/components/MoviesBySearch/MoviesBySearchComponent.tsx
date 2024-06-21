import React, {FC, useEffect, useState} from 'react';
import {useForm} from "react-hook-form";
import {useAppDispatch, useAppSelector} from "../../hooks/reduxHooks";
import {movieActions} from "../../redux/slices/movieSlice";
import {Movie} from "../MovieComponent/Movie";

interface IFormProps {
    searchName: string,
}

const FormComponent: FC = () => {


    let {moviesBySearch} = useAppSelector(state => state.movies);

    let dispatch = useAppDispatch();

    let formObj = useForm<IFormProps>();
    let {register, handleSubmit} = formObj;


    const save = (formValues: IFormProps) => {
        console.log(formValues);
            dispatch(movieActions.searchMovies(formValues.searchName));
    };

    return (
        <div>
            <form onSubmit={handleSubmit(save)}>
                <input type="text"  {...register('searchName')}/>
                <button>search</button>
            </form>
                {moviesBySearch && moviesBySearch.results.map(movie => (
                    <Movie key={movie.id} movie={movie}/>
                    )
                )}
        </div>
    );
};

export default FormComponent;