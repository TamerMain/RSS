'use client';
import { useSelector, useDispatch } from 'react-redux';
import { type ReactNode } from 'react';
import useClientSearchParams from '@/hooks/useClientSearchParams.tsx';
import { SEARCH_PARAMS } from '@/constants/routes.ts';
import { toggleItem, type CardInfo } from '@/store/cartSlice.ts';
import { type RootState } from '@/store/store.ts';

type CardItemContainerProps = {
  id: string;
  children: ReactNode;
  card: CardInfo;
};

function CardItemContainer(props: CardItemContainerProps) {
  const dispatch = useDispatch();
  const cart = useSelector((state: RootState) => state.cart);

  function onToCartClick(e: React.MouseEvent<HTMLButtonElement>) {
    e.stopPropagation();
    dispatch(toggleItem(props.card));
  }

  const { setDetailsParams } = useClientSearchParams();
  return (
    <div
      onClick={() => {
        setDetailsParams({ [SEARCH_PARAMS.DETAILS]: props.id });
      }}
      className="relative flex flex-col items-center w-full text-gray-400 hover:text-gray-50 hover:font-bold light:text-gray-800 light:hover:text-black transition-colors transition-font-weight duration-400"
    >
      {props.children}
      <button
        onClick={onToCartClick}
        className={`absolute left-[3%] top-[2%] w-5 h-5 rounded-full border-2 border-mist-400 light:border-mist-800 ${
          cart.some((cartItem) => cartItem.name === props.card.name)
            ? 'bg-mist-400 light:bg-mist-800 shadow-[inset_0_0_0_2px] shadow-black light:shadow-mist-200'
            : 'bg-black light:bg-mist-200'
        }`}
      />
    </div>
  );
}

export default CardItemContainer;
