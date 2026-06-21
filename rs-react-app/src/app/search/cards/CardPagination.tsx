'use client';

import useClientSearchParams from '@/hooks/useClientSearchParams.tsx';
import getPagination from '../../../utils/getPagination.ts';
import { type SearchResponse } from '@/types/types.ts';
import { SEARCH_PARAMS } from '@/constants/routes.ts';

type CardPaginationPRops = {
  cardList: SearchResponse;
};

function CardPagination(props: CardPaginationPRops) {
  const { setSearchParams } = useClientSearchParams();
  const pageList = getPagination({
    total: props.cardList.total_pages,
    current: props.cardList.current_page,
  });

  function handlePageClick(e: React.MouseEvent<HTMLButtonElement>) {
    const nextPage = Number(+e.currentTarget.textContent.trim());
    setSearchParams({
      [SEARCH_PARAMS.QUERY]: props.cardList.search_term,
      [SEARCH_PARAMS.PAGE]: nextPage,
    });
  }

  return (
    <div className="flex justify-center gap-2 p-2 align-middle h-9">
      {pageList &&
        pageList.map((page, index) =>
          page === '...' ? (
            <div key={`ellipsis+${index}`} className="p-1">
              ...
            </div>
          ) : (
            <button
              key={page}
              className={`h-full p-2 cursor-pointer ${props.cardList.current_page === page ? 'text-gray-50 light:text-black light:font-semibold pointer-events-none' : 'text-gray-400 light:text-gray-600'}  hover:text-gray-50 light:hover:text-black light:hover:font-semibold disabled:cursor-not-allowed disabled:text-gray-400 transition-colors duration-200`}
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
