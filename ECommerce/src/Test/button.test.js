import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import Button from './Button';

// Test
// BTN.test.js ---------------------------------------------------------------------------------//

test('renders a button with text "Click me"', () => {
  render(<Button />);
  const buttonElement = screen.getByText(/click me/i);
  expect(buttonElement).toBeInTheDocument();
});

test('calls the onClick prop when clicked', () => {
  const handleClick = jest.fn();
  render(<Button onClick={handleClick} />);
  const buttonElement = screen.getByText(/click me/i);
  fireEvent.click(buttonElement);
  expect(handleClick).toHaveBeenCalledTimes(1);
});
