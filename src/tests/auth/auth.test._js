// import React from 'react';
// import { render } from '@testing-library/react';
// import Login from '../pages/auth/login/login';

// describe('<Login />', () => {
//   it('Renders <Login /> component correctly', () => {
//     const { getByText } = render(<Login />);
//     expect(getByText(/sign in/i)).toBeInTheDocument();
//   });
// });

// import React from 'react';
// import { render, fireEvent } from 'react-testing-library';
// import App from './App';

// it('show the sended message', () => {
//   const onSubmit = jest.fn();
//   const { getByLabelText, getByText } = render(<App onSubmit={onSubmit} />);
//   const inputValue = '12';

//   fireEvent.change(getByLabelText(/message/i), { target: { value: inputValue } });
//   fireEvent.click(getByText(/ok/i));

//   expect(onSubmit).toBeCalled();
// });
