import getPagination from '../../../utils/getPagination.ts';
import { type FetchSearchParams } from '@/types/types.ts';
import { type SearchResponse } from '@/types/types.ts';

type CardPaginationPRops = {
  cardList: SearchResponse;
  setSearchParams: (newParams: FetchSearchParams) => void;
};

function CardPagination(props: CardPaginationPRops) {
  const pageList = getPagination({
    total: props.cardList.total_pages,
    current: props.cardList.current_page,
  });

  function handlePageClick(e: React.MouseEvent<HTMLButtonElement>) {
    const nextPage = Number(+e.currentTarget.textContent.trim());
    props.setSearchParams({ q: props.cardList.search_term, page: nextPage });
  }

  return (
    <div className="flex justify-center gap-2 p-2 align-middle h-9">
      {pageList &&
        pageList.map((page, index) =>
          page === '...' ? (
            <div key={`...+${index}`} className="p-1">
              ...
            </div>
          ) : (
            <button
              key={page}
              className={`h-full p-2 cursor-pointer ${props.cardList.current_page === page ? 'text-gray-50 light:text-black light:font-semibold' : 'text-gray-400 light:text-gray-600'}  hover:text-gray-50 light:hover:text-black light:hover:font-semibold disabled:cursor-not-allowed disabled:text-gray-400 transition-colors duration-200`}
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
