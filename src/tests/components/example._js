import React from 'react';
import { screen, render } from '@testing-library/react';
import '@testing-library/jest-dom';
import { Recipe } from './Recipe';

describe('RecipeForm', () => {
  it('should render the basic fields', () => {
    render(<Recipe />);
    expect(
      screen.getByRole('heading', { name: 'New recipe' })
    ).toBeInTheDocument();
    expect(screen.getByRole('textbox', { name: /name/i })).toBeInTheDocument();
    expect(
      screen.getByRole('textbox', { name: /description/i })
    ).toBeInTheDocument();
    expect(
      screen.getByRole('spinbutton', { name: /servings/i })
    ).toBeInTheDocument();
    expect(
      screen.getByRole('button', { name: /add ingredient/i })
    ).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /save/i })).toBeInTheDocument();
  });
});

it('should validate form fields', async () => {
  const mockSave = jest.fn();
  render(<Recipe saveData={mockSave} />);
  fireEvent.input(screen.getByRole('textbox', { name: /description/i }), {
    target: {
      value:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.'
    }
  });

  fireEvent.input(screen.getByRole('spinbutton', { name: /servings/i }), {
    target: { value: 110 }
  });

  fireEvent.submit(screen.getByRole('button', { name: /save/i }));
  expect(await screen.findAllByRole('alert')).toHaveLength(3);
  expect(mockSave).not.toBeCalled();
});
