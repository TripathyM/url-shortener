import {render, screen} from '@testing-library/react';
import '@testing-library/jest-dom'
import App from './App';

describe('Tests', () => {
  it('should pass', () => {
    expect(true).toBe(true);
  });

  it('should render', () => {
    render(<App />);
    const linkElement = screen.getByText(/Vite \+ React/i);
    expect(linkElement).toBeInTheDocument();
  })
  
});