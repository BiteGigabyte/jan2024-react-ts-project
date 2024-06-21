import React from 'react';
import {Outlet} from "react-router-dom";

import {HeaderComponent} from "../components/Header/HeaderComponent";
import css from './MainLayout.styles.module.css';


const MainLayout = () => {
    return (
        <div className={css.josefinSansFont1}>
            <HeaderComponent/>
            <Outlet/>
        </div>
    );
};

export {MainLayout};