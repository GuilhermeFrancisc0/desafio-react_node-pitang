import React from 'react';
import Routes from './routes';
import AppContextProvider from './AppContextProvider';

const App = () => (
  <AppContextProvider>
    <Routes />
  </AppContextProvider>
);

export default App;
