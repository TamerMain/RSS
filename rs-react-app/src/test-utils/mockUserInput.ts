import { screen, waitFor } from '@testing-library/react';
import { type UserEvent } from '@testing-library/user-event';

export const mockUserInput = async (user: UserEvent, userInput: string) => {
  const searchBar: HTMLInputElement = await screen.findByRole('searchbox');
  const searchButton = await screen.findByRole('button', {
    name: 'Find Cards',
  });
  await waitFor(() => {
    expect(searchBar).toBeEnabled();
    expect(searchButton).toBeEnabled();
  });

  await user.click(searchBar);
  await user.keyboard('{Control>}a{/Control}');
  await user.keyboard('{Delete}');
  if (userInput) {
    await user.type(searchBar, userInput);
  }
  await user.click(searchButton);
};
