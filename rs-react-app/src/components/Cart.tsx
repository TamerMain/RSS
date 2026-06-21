import { useSelector, useDispatch } from 'react-redux';
import { useTranslations } from 'next-intl';
import { type RootState } from '@/store/store';
import { clearCart } from '@/store/cartSlice';
import DownloadButton from './DownloadButton';

function Cart() {
  const t = useTranslations('Cart');
  const dispatch = useDispatch();
  const cart = useSelector((state: RootState) => state.cart);

  return (
    <>
      {cart.length !== 0 && (
        <div className="flex flex-col gap-1 sticky text-gray-400 fade-in">
          <div className="p-2 text-gray-50 bg-mist-800 ">
            {t('select')} {cart.length}
          </div>
          <button
            onClick={() => dispatch(clearCart())}
            className="p-2 bg-mist-800 hover:text-gray-50 cursor-pointer transition-colors duration-400"
          >
            {t('deselect')}
          </button>
          <DownloadButton cart={cart} />
        </div>
      )}
    </>
  );
}

export default Cart;
