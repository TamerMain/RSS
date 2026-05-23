import { useSelector, useDispatch } from 'react-redux';
import { type RootState } from '@/store/store';
import { clearCart } from '@/store/store.ts';

function Cart() {
  const dispatch = useDispatch();
  const cart = useSelector((state: RootState) => state.cart);

  return (
    <>
      {cart.length !== 0 && (
        <div className="flex flex-col gap-1 sticky text-gray-400 fade-in">
          <div className="flex flex-col gap-1 bg-mist-800">
            {cart.map((item) => (
              <div className="fade-in pl-4 text-xs text-left">{item}</div>
            ))}
          </div>
          <div className="p-2 text-gray-50 bg-mist-800 ">Selected {cart.length}</div>
          <button
            onClick={() => dispatch(clearCart())}
            className="p-2 bg-mist-800 hover:text-gray-50 cursor-pointer transition-colors duration-400"
          >
            Deselect All
          </button>
          <button className="p-2  bg-mist-800 hover:text-gray-50 cursor-pointer transition-colors duration-400">
            Download
          </button>
        </div>
      )}
    </>
  );
}

export default Cart;
