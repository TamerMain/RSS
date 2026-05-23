import paginationArray from '../../../services/paginationArray.tsx';
import useStorage from '../../../hooks/useStorage.tsx';
import { useState } from 'react';
import type { SearchResponse } from '../../../services/fetchCardList.tsx';

function CardNavigation(props: {
  updateResultList: (currentInput: string, currentPage: number) => void;
  resultList: SearchResponse;
}) {
  const [pageList, setPageList] = useState({
    array: paginationArray(
      props.resultList.total_pages,
      props.resultList.current_page
    ),
  });
  const { getItem: getRecentSearch } = useStorage('RecentSearch');

  function handleToPage(e: React.MouseEvent<HTMLButtonElement>) {
    const nextPage = +e.currentTarget.textContent.trim();
    if (nextPage === props.resultList.current_page) {
      return;
    }
    const nextArray = paginationArray(props.resultList.total_pages, nextPage);
    setPageList({
      array: nextArray,
    });
    const recentSearch = getRecentSearch();
    props.updateResultList(recentSearch, nextPage);
  }

  return (
    <div className="flex justify-center gap-2 p-2 align-middle h-9">
      {pageList.array &&
        pageList.array.map((page, index) =>
          page === '...' ? (
            <div key={`...+${index}`} className="p-1 light:text-black">
              ...
            </div>
          ) : (
            <button
              key={page}
              className={`h-full p-2 cursor-pointer ${props.resultList.current_page === page ? 'text-gray-50 light:text-black light:font-bold' : 'text-gray-400 light:text-gray-600'}   hover:text-gray-50 light:hover:text-black light:hover:font-bold disabled:cursor-not-allowed disabled:text-gray-400 transition-colors duration-200`}
              onClick={handleToPage}
            >
              {page}
            </button>
          )
        )}
    </div>
  );
}

export default CardNavigation;
