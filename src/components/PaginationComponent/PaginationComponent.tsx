import React, { FC, useState } from 'react';
import { useSearchParams } from 'react-router-dom';

import css from './PaginationComponent.module.css';
import { useAppDispatch, useAppSelector } from '../../hooks/reduxHooks';
import { movieActions } from '../../redux/slices/movieSlice';

interface IProps {
    page: string;
    total_pages: number;
}

const PaginationComponent: FC<IProps> = ({ page, total_pages }) => {
    const [, setQuery] = useSearchParams();
    const currentPage = parseInt(page);
    const dispatch = useAppDispatch();
    const { searchName } = useAppSelector((state) => state.movies);
    const [selectedPage, setSelectedPage] = useState(currentPage.toString());

    const goToPage = (newPage: number) => {
        setQuery({ page: newPage.toString() });
        setSelectedPage(newPage.toString());
        dispatch(movieActions.searchNameSaver({ searchPage: newPage.toString(), searchName }));
    };

    const handlePageChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        const newPage = parseInt(event.target.value);
        setQuery({ page: newPage.toString() });
        setSelectedPage(event.target.value);
        dispatch(movieActions.searchNameSaver({ searchPage: event.target.value, searchName }));
    };

    // Генеруємо список сторінок від 1 до total_pages
    const pages = Array.from({ length: total_pages }, (_, index) => index + 1);

    return (
        <div className={css.PaginationComponentDiv}>
            <button
                className={currentPage <= 1 ? css.disabledButton : css.paginationButton}
                onClick={() => goToPage(Math.max(1, currentPage - 1))}
                disabled={currentPage <= 1}
                type="button"
            >
                <img
                    width="50"
                    height="50"
                    src="https://img.icons8.com/ios/50/circled-chevron-left--v1.png"
                    alt="circled-chevron-left"
                />
            </button>
            <select
                className={css.pageSelect}
                value={selectedPage}
                onChange={handlePageChange}
            >
                {pages.map((pageNumber) => (
                    <option key={pageNumber} value={pageNumber}>
                        Page {pageNumber}
                    </option>
                ))}
            </select>
            <button
                className={currentPage >= total_pages ? css.disabledButton : css.paginationButton}
                onClick={() => goToPage(Math.min(total_pages, currentPage + 1))}
                disabled={currentPage >= total_pages}
                type="button"
            >
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
