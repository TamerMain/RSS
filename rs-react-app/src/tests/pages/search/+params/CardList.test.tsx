import { render, screen, waitFor } from '@testing-library/react';
import { userEvent } from '@testing-library/user-event';
import { MemoryRouter } from 'react-router';
import CardList from '@/pages/search/+params/CardList';
import MockListResponse from '@/tests/test-utils/mockListResponse.json';

describe('when click on card', () => {
  test('should show master detail and list should remain', async () => {
    const user = userEvent.setup();
    render(
      <MemoryRouter initialEntries={['/search?q=Black%20Lotus&page=1']}>
        <CardList resultList={MockListResponse} />
      </MemoryRouter>
    );
    const card = screen.getByAltText(/Black Lotus/i);
    await user.click(card);
    await waitFor(() => {
      const details = screen.getByAltText(/Full Art of Black Lotus/i);
      expect(details).toBeInTheDocument();
      expect(card).toBeInTheDocument();
    });
  });
});
