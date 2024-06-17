import React from 'react';
import {Link} from "react-router-dom";

import css from './HeaderComponent.module.css';

const HeaderComponent = () => {
    return (
        <div className={css.Header}>
            <div><Link to={'/movies'}>Movies</Link></div>
            <div><Link to={'/genres'}>Genres</Link></div>
            <div><Link to={'/search'}>Search</Link></div>
            <button>Account details</button>
        </div>
    );
};

export {HeaderComponent};