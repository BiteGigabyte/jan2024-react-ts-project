import React, { FC, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Switch } from "@mui/material";

import { useAppDispatch, useAppSelector } from '../../hooks/reduxHooks';
import { accountActions } from '../../redux/slices/accountSlice';
import css from './HeaderComponent.module.css';
import './HeaderComponent.styles.css';

interface IProps {
    switchTheme: () => void;
}

const HeaderComponent: FC<IProps> = ({ switchTheme }) => {
    const { account } = useAppSelector((state) => state.account);
    const dispatch = useAppDispatch();
    const [accountTrigger, setAccountTrigger] = useState(false);
    const [activeLink, setActiveLink] = useState<string>(''); // Стан для активного посилання

    const toggleAccountInfo = () => {
        setAccountTrigger((prevState) => !prevState);
    };

    useEffect(() => {
        dispatch(accountActions.getAccountDetails());
    }, [dispatch]);

    // Функція для обробки кліку на посилання
    const handleLinkClick = (linkId: string) => {
        setActiveLink(linkId); // Встановлюємо активне посилання при кліку
    };

    return (
        <div className={css.Header}>
            <div>My Movies Site</div>
            <div>
                <Link
                    to="/movies"
                    className={activeLink === 'movies' ? 'active' : ''}
                    onClick={() => handleLinkClick('movies')}
                >
                    Movies
                </Link>
            </div>
            <div>
                <Link
                    to="/genres"
                    className={activeLink === 'genres' ? 'active' : ''}
                    onClick={() => handleLinkClick('genres')}
                >
                    Genres
                </Link>
            </div>
            <div>
                <Link
                    to="/search"
                    className={activeLink === 'search' ? 'active' : ''}
                    onClick={() => handleLinkClick('search')}
                >
                    Search
                </Link>
            </div>
            <div className={css.SwitcherDiv} id={'SwitcherDiv'}>
                <Switch
                    onChange={switchTheme}
                    inputProps={{ 'aria-label': 'controlled' }}
                />
                <button onClick={toggleAccountInfo}>
                    <img
                        width="50"
                        height="50"
                        src="https://img.icons8.com/ios-filled/50/guest-male--v1.png"
                        alt="guest-male--v1"
                    />
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

export { HeaderComponent };
