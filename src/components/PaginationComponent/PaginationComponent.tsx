import {useSearchParams} from "react-router-dom";
import React, {FC} from 'react';

interface IProps {
    page: string;
    total_pages: number;
}

const PaginationComponent: FC<IProps> = ({page, total_pages}) => {
    let [, setQuery] = useSearchParams();
    const currentPage = parseInt(page);


    const goToPage = (newPage: number) => {
        setQuery({page: newPage.toString()});
    };

    return (
        <div>
            <button onClick={() => goToPage(Math.max(1, currentPage - 1))} disabled={currentPage <= 1}>
                prev
            </button>
            <button
                onClick={() => goToPage(Math.min(total_pages, currentPage + 1))}
                disabled={currentPage >= total_pages}>
                next
            </button>
        </div>
    );
};

export {PaginationComponent};
