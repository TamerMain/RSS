import paginationArray from '../services/paginationArray.tsx';
import useStorage from '../hooks/useStorage.tsx';
import { useState, useEffect } from 'react';
import type { SearchResponse } from '../services/searchRequestApi.tsx';

function CardNavigation(props: {
  updateResultList: (currentInput: string, currentPage: number) => void;
  resultList: SearchResponse;
  isLoading: boolean;
}) {
  const [pageList, setPageList] = useState({
    current: 1,
    array: paginationArray(props.resultList.total_pages, 1),
  });
  const { getItem: getRecentSearch } = useStorage('RecentSearch');

  useEffect(() => {
    setPageList((prev) => ({
      ...prev,
      array: paginationArray(props.resultList.total_pages, 1),
    }));
  }, [props.resultList.total_pages]);

  function handleToPage(e: React.MouseEvent<HTMLButtonElement>) {
    const nextPage = +e.currentTarget.innerText;
    if (nextPage === pageList.current) {
      return;
    }
    const nextArray = paginationArray(props.resultList.total_pages, nextPage);
    setPageList({
      current: nextPage,
      array: nextArray,
    });
    props.updateResultList(getRecentSearch(), nextPage);
  }

  return (
    <div className="flex justify-center gap-2 align-middle min-h-9">
      {pageList.array &&
        pageList.array.map((page, index) =>
          page === '...' ? (
            <div key={`...+${index}`} className="p-1">
              ...
            </div>
          ) : (
            <button
              key={page}
              className={`min-h-9 p-2 cursor-pointer ${pageList.current === page ? 'text-gray-50' : 'text-gray-400'}  hover:text-gray-50 disabled:cursor-not-allowed disabled:text-gray-400`}
              onClick={handleToPage}
              disabled={pageList.current === page ? false : props.isLoading}
            >
              {page}
            </button>
          )
        )}
    </div>
  );
}

export default CardNavigation;
