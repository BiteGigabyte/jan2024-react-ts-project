import React, {useEffect, useState} from 'react';
import { Link } from "react-router-dom";
import {useAppDispatch, useAppSelector} from "../../hooks/reduxHooks";

import css from './HeaderComponent.module.css';
import {accountActions} from "../../redux/slices/accountSlice";

const HeaderComponent = () => {
    const { account } = useAppSelector(state => state.account);
    let dispatch = useAppDispatch();
    const [accountTrigger, setAccountTrigger] = useState(false);

    const toggleAccountInfo = () => {
        setAccountTrigger(prevState => !prevState);
    }

    useEffect(() => {
        dispatch(accountActions.getAccountDetails());
    }, []);

    console.log('start account');
    if (account) {
    console.log(account.username);
    } else console.log('null');
    console.log('accouut');

    return (
        <div className={css.Header}>
            <div><Link to={'/movies'}>Movies</Link></div>
            <div><Link to={'/genres'}>Genres</Link></div>
            <div><Link to={'/search'}>Search</Link></div>
            <button onClick={toggleAccountInfo}>Account details</button>
            {accountTrigger && account && (
                <div className={css.AccountInfo}>
                    <p>ID: {account.id}</p>
                    <p>Username: {account.username}</p>
                    {/* Додайте інші дані облікового запису, які вам потрібні */}
                </div>
            )}
        </div>
    );
};

export { HeaderComponent };
