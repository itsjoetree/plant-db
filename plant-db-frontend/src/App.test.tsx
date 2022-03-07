import { BrowserRouter } from 'react-router-dom';
import { render, screen } from '@testing-library/react';
import App from './App';

test('home page renders', () => {
  render(<BrowserRouter><App /></BrowserRouter>);

  const heading = screen.queryByText('Plant DB');
  expect(heading).toBeInTheDocument();
});
