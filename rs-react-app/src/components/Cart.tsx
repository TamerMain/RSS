import { useSelector, useDispatch } from 'react-redux';
import { type RootState } from '@/store/store';
import { clearCart } from '@/store/store.ts';

function Cart() {
  const dispatch = useDispatch();
  const cart = useSelector((state: RootState) => state.cart);

  return (
    <div className="sticky">
      {cart.map((item) => (
        <div>{item}</div>
      ))}
      <button onClick={() => dispatch(clearCart())}>Unselect All</button>
      <button>Download</button>
    </div>
  );
}

export default Cart;
