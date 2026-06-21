import { getTranslations } from 'next-intl/server';
import Image from 'next/image';
import CardMasterDetailsCloseButton from '@/app/[locale]/search/cards/CardMasterDetailsCloseButton';
import fetchDetails from '@/services/fetchDetails';
import { type SearchParams } from '@/types/types';
import { SEARCH_PARAMS } from '@/constants/routes.ts';

type CardMasterDetailProps = { searchParams: SearchParams };

async function CardMasterDetail(props: CardMasterDetailProps) {
  const t = await getTranslations('CardMasterDetail');
  const validDetailsParams = {
    [SEARCH_PARAMS.DETAILS]: props.searchParams[SEARCH_PARAMS.DETAILS] || null,
  };
  const { detailsCard, errorCode } = await fetchDetails(validDetailsParams);

  if (!props.searchParams[SEARCH_PARAMS.DETAILS]) {
    return null;
  }

  if (errorCode || !detailsCard) {
    return (
      <div className="w-2/5 flex justify-center">
        <div className="fixed flex flex-col items-center w-1/4 p-2 bg-mist-800 text-center fade-in">
          <h2 className="text-2xl">Details not found for that card.</h2>
          <CardMasterDetailsCloseButton />
        </div>
      </div>
    );
  }

  const imageSrc =
    detailsCard.image_uris?.normal ||
    detailsCard.card_faces?.[0]?.image_uris?.normal;

  return (
    <div className="w-2/5 flex justify-center">
      <div className="fixed flex flex-col items-center w-1/4 max-w-[440px] p-2 bg-mist-800 text-center fade-in">
        <div className="pr-2">
          {detailsCard.set_name
            ? detailsCard.set_name + ' ' + t('set')
            : t('setError')}
        </div>
        <h2 className="text-2xl">
          {detailsCard.name ? detailsCard.name : 'Name Not Found'}
        </h2>
        {imageSrc ? (
          <Image
            alt={`${t('imgAlt')} ${detailsCard?.name}`}
            className="w-full max-w-95 rounded-3xl"
            src={imageSrc}
            width={480}
            height={680}
          />
        ) : (
          <div className="w-full max-w-95 h-[680px] flex items-center justify-center bg-gray-700 rounded-3xl">
            {t('imgError')}
          </div>
        )}
        <CardMasterDetailsCloseButton />
      </div>
    </div>
  );
}

export default CardMasterDetail;
