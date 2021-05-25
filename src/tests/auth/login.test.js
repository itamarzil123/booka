import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Login from '../../pages/auth/login/login';
// import Router from './components/router/main-router';
import StoreProvider from '../../store/store';
import '@testing-library/jest-dom';

describe('<Login />', () => {
  test('render username input', () => {
    render(
      <StoreProvider>
        <Login />
      </StoreProvider>
    );

    const inputEl = screen.getByTestId('username-input');
    expect(inputEl).toBeInTheDocument();
    expect(inputEl).toHaveAttribute('type', 'text');
  });

  test('render password input', () => {
    render(
      <StoreProvider>
        <Login />
      </StoreProvider>
    );

    const inputEl = screen.getByTestId('password-input');
    expect(inputEl).toBeInTheDocument();
    expect(inputEl).toHaveAttribute('type', 'password');
  });

  //   test('pass valid username to test username input field', () => {
  //     render(<App />);

  //     const inputEl = screen.getByTestId('username-input');
  //     userEvent.type(inputEl, 'test@mail.com');

  //     expect(screen.getByTestId('username-input')).toHaveValue('test@mail.com');
  //     expect(screen.queryByTestId('error-msg')).not.toBeInTheDocument();
  //   });

  //   test('pass invalid username to test input value', () => {
  //     render(<App />);

  //     const inputEl = screen.getByTestId('username-input');
  //     userEvent.type(inputEl, 'test');

  //     expect(screen.getByTestId('username-input')).toHaveValue('test');
  //     expect(screen.queryByTestId('error-msg')).toBeInTheDocument();
  //     expect(screen.queryByTestId('error-msg').textContent).toEqual(
  //       'Please enter a valid username.'
  //     );
  //   });
});
