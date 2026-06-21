import { getTranslations } from 'next-intl/server';
import fetchCardList from '@/services/fetchCardList.tsx';
import CardPagination from './CardPagination.tsx';
import CardList from './CardList.tsx';
import CardMasterDetail from './CardMasterDetail.tsx';
import CardNotFound from './CardNotFound.tsx';
import { SEARCH_PARAMS } from '@/constants/routes.ts';
import type { SearchParams } from '@/types/types.ts';

type SearchResultsProps = { searchParams: SearchParams };

async function SearchResults(props: SearchResultsProps) {
  const t = await getTranslations('SearchResults');
  const validSearchParams = {
    [SEARCH_PARAMS.QUERY]: props.searchParams[SEARCH_PARAMS.QUERY] || '',
    [SEARCH_PARAMS.PAGE]: Number(props.searchParams[SEARCH_PARAMS.PAGE]) || 1,
  };

  const { cardList, errorCode } = await fetchCardList(validSearchParams);
  console.log(props.searchParams[SEARCH_PARAMS.DETAILS]);

  if (errorCode) return <CardNotFound errorCode={errorCode} />;

  if (cardList) {
    return (
      <div className="flex flex-col fade-in">
        <h1 className="flex justify-center p-2 text-5xl light:text-black">
          {t('title')}
        </h1>
        <CardPagination cardList={cardList} />
        <div className="flex pt-2">
          <div
            className={`flex-1 grid grid-cols-6 justify-items-center gap-4 p-2`}
          >
            <CardList cardList={cardList} key={Math.random()} />
          </div>
          <CardMasterDetail searchParams={props.searchParams} />
        </div>
      </div>
    );
  }
}

export default SearchResults;
