import getPagination from '../../../utils/getPagination.ts';
import useStorage from '../../../hooks/useStorage.tsx';
import { useState } from 'react';
import { type SearchResponse } from '@/types/types.ts';
import { type FetchSearchParams } from '@/types/types.ts';

type CardPaginationProps = {
  updateCardList: ({ q, page }: FetchSearchParams) => void;
  cardList: SearchResponse;
};

function CardPagination(props: CardPaginationProps) {
  const [pageList, setPageList] = useState({
    list: getPagination({
      total: props.cardList.total_pages,
      current: props.cardList.current_page,
    }),
  });
  const { getItem: getRecentSearch } = useStorage('RecentSearch');

  function handlePageClick(e: React.MouseEvent<HTMLButtonElement>) {
    const newPage = +e.currentTarget.textContent.trim();
    if (newPage === props.cardList.current_page) {
      return;
    }

    const newPageList = getPagination({
      total: props.cardList.total_pages,
      current: newPage,
    });
    setPageList({
      list: newPageList,
    });

    const newTerm = getRecentSearch();
    props.updateCardList({ q: newTerm, page: newPage });
  }

  return (
    <div className="flex justify-center gap-2 p-2 align-middle h-9">
      {pageList.list &&
        pageList.list.map((page, index) =>
          page === '...' ? (
            <div key={`...+${index}`} className="p-1">
              ...
            </div>
          ) : (
            <button
              key={page}
              className={`h-full p-2 cursor-pointer ${props.cardList.current_page === page ? 'text-gray-50' : 'text-gray-400'}  hover:text-gray-50 disabled:cursor-not-allowed disabled:text-gray-400 transition-colors duration-200`}
              onClick={handlePageClick}
            >
              {page}
            </button>
          )
        )}
    </div>
  );
}

export default CardPagination;
