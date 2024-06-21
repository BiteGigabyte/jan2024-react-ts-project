import React, {FC, useEffect, useState} from 'react';
import {Link} from 'react-router-dom';
import {Switch} from "@mui/material";

import {useAppDispatch, useAppSelector} from '../../hooks/reduxHooks';
import css from './HeaderComponent.module.css';
import {accountActions} from '../../redux/slices/accountSlice';
import './HeaderComponent.styles.css';

interface IProps {
    switchTheme: () => void;
}

const HeaderComponent:FC<IProps> = ({switchTheme}) => {
    const {account} = useAppSelector((state) => state.account);
    const dispatch = useAppDispatch();
    const [accountTrigger, setAccountTrigger] = useState(false);

    const toggleAccountInfo = () => {
        setAccountTrigger((prevState) => !prevState);
    };

    useEffect(() => {
        dispatch(accountActions.getAccountDetails());
    }, [dispatch]);

    return (
        <div className={css.Header}>
            <div>My Movies Site</div>
            <div><Link to="/movies">Movies</Link></div>
            <div><Link to="/genres">Genres</Link></div>
            <div><Link to="/search">Search</Link></div>
            <div className={css.SwithcerDiv}>
                <Switch
                // checked={checked}
                    onChange={switchTheme}
                    inputProps={{ 'aria-label': 'controlled' }}
                />
            <button onClick={toggleAccountInfo}>
                <img width="50" height="50"
                     src="https://img.icons8.com/ios-filled/50/guest-male--v1.png"
                     alt="guest-male--v1"/>
            </button>
            </div>

            {accountTrigger && account && (
                <div className={css.AccountInfoModal}>
                    <div className={css.ModalContent}>
                        <span className={css.CloseButton} onClick={toggleAccountInfo}>&times;</span>
                        <p>ID: {account.id}</p>
                        <p>Username: {account.username}</p>
                    </div>
                </div>
            )}

        </div>
    );
};

export {HeaderComponent};
