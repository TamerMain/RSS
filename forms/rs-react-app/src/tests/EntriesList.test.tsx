import { render, screen } from '@testing-library/react';
import EntriesList from '@/components/EntriesList';
import { Provider } from 'react-redux';
import { store } from '@/store/store.ts';
import { addEntry } from '@/store/formEntriesSlice';
import { TEST_STORE_INPUT } from './test-utils/constants';

describe('EntriesList -- when render', () => {
  test('should highlight latest added entry', () => {
    const firstInput = TEST_STORE_INPUT('mock1');
    const secondInput = TEST_STORE_INPUT('mock2');
    store.dispatch(addEntry(firstInput));
    store.dispatch(addEntry(secondInput));
    render(
      <Provider store={store}>
        <EntriesList />
      </Provider>
    );
    const newMarker = screen.getByText('● New');
    const firstEntryName = screen.getByText(`"${firstInput.name}"`);
    const secondEntryName = screen.getByText(`"${secondInput.name}"`);
    const firstEntry = firstEntryName.closest('.flex');
    const secondEntry = secondEntryName.closest('.flex');
    expect(firstEntry).not.toContainElement(newMarker);
    expect(secondEntry).toContainElement(newMarker);
  });
});
