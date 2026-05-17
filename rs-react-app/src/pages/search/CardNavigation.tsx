import paginationArray from '../../services/paginationArray.tsx';
import useStorage from '../../hooks/useStorage.tsx';
import { useState } from 'react';
import type { SearchResponse } from '../../services/fetchCardList.tsx';

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
    const nextPage = +e.currentTarget.innerText;
    if (nextPage === props.resultList.current_page) {
      return;
    }
    const nextArray = paginationArray(props.resultList.total_pages, nextPage);
    console.log(nextArray);
    console.log(nextPage);
    setPageList({
      array: nextArray,
    });
    props.updateResultList(getRecentSearch(), nextPage);
  }

  return (
    <div className="flex justify-center gap-2 p-2 align-middle h-9">
      {pageList.array &&
        pageList.array.map((page, index) =>
          page === '...' ? (
            <div key={`...+${index}`} className="p-1">
              ...
            </div>
          ) : (
            <button
              key={page}
              className={`h-full p-2 cursor-pointer ${props.resultList.current_page === page ? 'text-gray-50' : 'text-gray-400'}  hover:text-gray-50 disabled:cursor-not-allowed disabled:text-gray-400`}
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
