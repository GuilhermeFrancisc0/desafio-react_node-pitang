/* eslint-disable no-undef */
import React from 'react';
import { render } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import NavBar from '../../../components/Navbar';
import AppContextProvider from '../../../AppContextProvider';

const NavBarWrapper = () => (
  <AppContextProvider>
    <BrowserRouter>
      <NavBar />
    </BrowserRouter>
  </AppContextProvider>
);

test('NavBar renders', () => {
  const { asFragment } = render(<NavBarWrapper />);

  expect(asFragment()).toMatchSnapshot();
});
