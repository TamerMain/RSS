'use client';
import { ReactNode } from 'react';
import useClientSearchParams from '@/hooks/useClientSearchParams.tsx';
import { SEARCH_PARAMS } from '@/constants/routes.ts';

type CardItemContainerProps = {
  id: string;
  children: ReactNode;
};

function CardItemContainer(props: CardItemContainerProps) {
  const { setDetailsParams } = useClientSearchParams();
  return (
    <div
      onClick={() => {
        setDetailsParams({ [SEARCH_PARAMS.DETAILS]: props.id });
      }}
      className="flex flex-col items-center w-full text-gray-400 hover:text-gray-50 hover:font-bold light:text-gray-800 light:hover:text-black transition-colors transition-font-weight duration-400"
    >
      {props.children}
    </div>
  );
}

export default CardItemContainer;
