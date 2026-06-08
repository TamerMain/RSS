import { render, screen, fireEvent } from '@testing-library/react';
import { userEvent } from '@testing-library/user-event';
import App from '@/App';
import { Provider } from 'react-redux';
import { store } from '@/store/store.ts';
import { mockUserFormFill } from './test-utils/MockUserFormFill';
import {
  TEST_VALID_INPUT
} from './test-utils/constants';

describe('App -- when modal', () => {
  test('should render not inside app', async () => {
    const user = userEvent.setup();
    render(
      <Provider store={store}>
        <App />
      </Provider>
    );

    const openForm = screen.getByRole('button', { name: 'Controlled Form' });
    await user.click(openForm);
    const modal = screen.getByTestId('backdrop');
    const app = screen.getByTestId('app');
    expect(app).not.toContainElement(modal);
  });
  test('should render when open', async () => {
    const user = userEvent.setup();
    render(
      <Provider store={store}>
        <App />
      </Provider>
    );
    const openForm = screen.getByRole('button', { name: 'Controlled Form' });
    await user.click(openForm);
    const modalFormButton = screen.getByRole('button', { name: 'Send' });
    expect(modalFormButton).toBeInTheDocument();
  });
  test('should close on ESC', async () => {
    const user = userEvent.setup();
    render(
      <Provider store={store}>
        <App />
      </Provider>
    );
    const openForm = screen.getByRole('button', { name: 'Controlled Form' });
    await user.click(openForm);
    await user.keyboard('{Escape}');
    const modalFormButton = screen.queryByRole('button', { name: 'Send' });
    expect(modalFormButton).toBe(null);
  });
  test('should close on outside click', async () => {
    const user = userEvent.setup();
    render(
      <Provider store={store}>
        <App />
      </Provider>
    );
    screen.debug();
    const openForm = screen.getByRole('button', { name: 'Controlled Form' });
    await user.click(openForm);

    screen.debug();
    const modalBackDrop = screen.getByTestId('backdrop');
    fireEvent.click(modalBackDrop);
    const modalFormButton = screen.queryByRole('button', { name: 'Send' });
    expect(modalFormButton).toBe(null);
  });
  test('should close on form submission', async () => {
    const user = userEvent.setup();
    render(
      <Provider store={store}>
        <App />
      </Provider>
    );
    const openForm = screen.getByRole('button', { name: 'Controlled Form' });
    await user.click(openForm);
    const modalFormButton = screen.queryByRole('button', { name: 'Send' });
    await mockUserFormFill(user, TEST_VALID_INPUT);
    await user.click(modalFormButton!);
    const modalFormButtonNext = screen.queryByRole('button', { name: 'Send' });
    expect(modalFormButtonNext).toBe(null);
  });
});

describe('App -- when tab navigation', () => {
  test('should tab navigate main page on repeat', async () => {
    const user = userEvent.setup();
    const navigationScenario = [
      'Uncontrolled Form',
      'Controlled Form',
      'body',
      'Uncontrolled Form',
      'Controlled Form',
    ];
    render(
      <Provider store={store}>
        <App />
      </Provider>
    );
    const openForm = screen.getByRole('button', { name: 'Controlled Form' });
    await user.click(openForm);
    const modalFormButton = screen.queryByRole('button', { name: 'Send' });
    await mockUserFormFill(user, TEST_VALID_INPUT);
    await user.click(modalFormButton!);
    await user.tab();
    for (const id of navigationScenario) {
      if (id === 'body') {
        await user.tab();
        continue;
      }
      const element = screen.getByRole('button', { name: id });
      expect(element).toHaveFocus();
      await user.tab();
    }
  });
  test('should only tab navigate within form modal on repeat', async () => {
    const user = userEvent.setup();
    const navigationScenario = [
      'name',
      'email',
      'age',
      'password',
      'passwordConfirm',
      'gender',
      'country',
      'imageUpload',
      'termsAccepted',
      'SEND',
      'body',
      'name',
    ];
    render(
      <Provider store={store}>
        <App />
      </Provider>
    );
    const openForm = screen.getByRole('button', { name: 'Controlled Form' });
    await user.click(openForm);
    const modalFormButton = screen.queryByRole('button', { name: 'Send' });
    await mockUserFormFill(user, TEST_VALID_INPUT);
    await user.click(modalFormButton!);
    const openFormNext = screen.getByRole('button', {
      name: 'Controlled Form',
    });
    await user.click(openFormNext);
    await user.tab();

    for (const id of navigationScenario) {
      if (id === 'SEND') {
        const button = screen.getByRole('button', { name: 'Send' });
        expect(button).toHaveFocus();
        console.log(id);
        await user.tab();
        continue;
      }
      if (id === 'body') {
        await user.tab();
        continue;
      }
      if (id === 'imageUpload') {
        const upload = screen.getByText(/Upload Image/i);
        expect(upload).toHaveFocus();
        await user.tab();
        continue;
      }
      const element = document.getElementById(id);
      expect(element).toHaveFocus();
      await user.tab();
    }
  });
});
