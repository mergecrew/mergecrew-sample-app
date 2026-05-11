import { afterEach, describe, it, expect } from 'vitest';
import { cleanup, render, screen } from '@testing-library/react';
import Counter from './Counter';

afterEach(cleanup);

describe('Counter', () => {
  it('renders the initial count of 0', () => {
    render(<Counter />);
    expect(screen.getByText('0')).toBeTruthy();
  });

  it('renders a labelled increment and decrement button', () => {
    render(<Counter />);
    expect(screen.getByLabelText('increment')).toBeTruthy();
    expect(screen.getByLabelText('decrement')).toBeTruthy();
  });
});
