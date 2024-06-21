import React, {useEffect, useState} from 'react';
import {Outlet} from "react-router-dom";

import {HeaderComponent} from "../components/Header/HeaderComponent";
import css from './MainLayout.styles.module.css';
import './MainLayout.styles.css';




const MainLayout = () => {

    const [theme, setTheme] = useState<'light' | 'dark'>('light');
    const switchTheme = () => {
        setTheme((cur) => (cur === 'light' ? 'dark' : 'light'));
    }

    return (
        <div className={css.josefinSansFont1} id={theme}>
            <HeaderComponent switchTheme={switchTheme}/>
            <Outlet/>
        </div>
    );
};

export {MainLayout};