import { getTranslations } from 'next-intl/server';
import Image from 'next/image';

type CardItemProps = {
  cardName: string | undefined;
  cardImageSrc: string | undefined;
};

async function CardItem(props: CardItemProps) {
  const t = await getTranslations('CardItem');
  if (!props.cardImageSrc) {
    return (
      <>
        <div className="w-full rounded-2xl border-2 border-transparent hover:border-mist-400 transition-colors duration-400">
          <div className="w-full h-full min-h-[240px] p-4 text-center rounded-2xl bg-gray-900 light:bg-gray-300">
            {t('imgError')}
          </div>
        </div>
        <p className="text-center">{props.cardName}</p>
      </>
    );
  }

  return (
    <>
      <div className="w-full rounded-[6%] border-2 border-transparent hover:border-mist-400 light:hover:border-mist-800 transition-colors duration-400">
        <Image
          alt={`${t('imgAlt')} ${props.cardName}`}
          className="rounded-[5%] text-center"
          src={props.cardImageSrc}
          width={480}
          height={680}
          loading="eager"
          decoding="async"
        />
      </div>
      <p className="text-center">{props.cardName}</p>
    </>
  );
}

export default CardItem;
