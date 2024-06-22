import { useSearchParams } from "react-router-dom";
import React, { FC } from 'react';

import css from './PaginationComponent.module.css';
import {useAppDispatch, useAppSelector} from "../../hooks/reduxHooks";
import {movieActions} from "../../redux/slices/movieSlice";

interface IProps {
    page: string;
    total_pages: number;
}

const PaginationComponent: FC<IProps> = ({ page, total_pages }) => {
    let [query, setQuery] = useSearchParams();
    const currentPage = parseInt(page);

    let dispatch = useAppDispatch();
    let {searchName} = useAppSelector(state => state.movies);

    const goToPage = (newPage: number) => {
        setQuery({ page: newPage.toString() });
        dispatch(movieActions.searchNameSaver({searchPage: newPage.toString(), searchName: `${searchName}`}))
    };

    return (
        <div className={css.PaginationComponentDiv}>
            <button
                className={currentPage <= 1 ? css.disabledButton : css.paginationButton}
                onClick={() => goToPage(Math.max(1, currentPage - 1))}
                disabled={currentPage <= 1}
                type='button'>
                <img
                    width="50"
                    height="50"
                    src="https://img.icons8.com/ios/50/circled-chevron-left--v1.png"
                    alt="circled-chevron-left"
                />
            </button>
            <h2>{query.get('page') ? query.get('page') : '1'}</h2>
            <button
                className={currentPage >= total_pages ? css.disabledButton : css.paginationButton}
                onClick={() => goToPage(Math.min(total_pages, currentPage + 1))}
                disabled={currentPage >= total_pages}
                type='button'>
                <img
                    width="50"
                    height="50"
                    src="https://img.icons8.com/ios/50/circled-chevron-right--v1.png"
                    alt="circled-chevron-right--v1"
                />
            </button>
        </div>
    );
};

export { PaginationComponent };
