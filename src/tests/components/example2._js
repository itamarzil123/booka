it('should submit correct form data', async () => {
  const mockSave = jest.fn();
  render(<Recipe saveData={mockSave} />);

  fireEvent.input(screen.getByRole('textbox', { name: /name/i }), {
    target: { value: 'Test recipe' }
  });
  fireEvent.input(screen.getByRole('textbox', { name: /description/i }), {
    target: { value: 'Delicious recipe' }
  });
  fireEvent.input(screen.getByRole('spinbutton', { name: /servings/i }), {
    target: { value: 4 }
  });

  fireEvent.click(screen.getByRole('button', { name: /add ingredient/i }));

  fireEvent.input(screen.getAllByRole('textbox', { name: /name/i })[1], {
    target: { value: 'Flour' }
  });
  fireEvent.input(screen.getByRole('textbox', { name: /amount/i }), {
    target: { value: '100 gr' }
  });

  fireEvent.submit(screen.getByRole('button', { name: /save/i }));

  await waitFor(() =>
    expect(mockSave).toHaveBeenCalledWith({
      name: 'Test recipe',
      description: 'Delicious recipe',
      amount: 4,
      ingredients: [{ name: 'Flour', amount: '100 gr' }]
    })
  );
});
