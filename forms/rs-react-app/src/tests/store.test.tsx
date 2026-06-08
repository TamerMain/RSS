import { store } from '@/store/store.ts';
import { addEntry } from '@/store/formEntriesSlice';
import { TEST_STORE_INPUT } from './test-utils/constants';

describe('store', () => {
  test('should correctly add and extract store entries', () => {
    const firstInput = TEST_STORE_INPUT('mock1');
    const secondInput = TEST_STORE_INPUT('mock2');

    store.dispatch(addEntry(firstInput));
    store.dispatch(addEntry(secondInput));
    const entries = store.getState().entries;
    expect(entries).toHaveLength(2);
    expect(entries[0]).toEqual(firstInput);
    expect(entries[1]).toEqual(secondInput);
  });
});
