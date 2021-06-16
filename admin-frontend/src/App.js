import React from 'react';
import { Switch, Route } from 'react-router-dom';

import LoginPage from './components/LoginPage';
import NavDrawer from './components/NavDrawer';

const App = () => {
  const handleLogin = (values) => {
    console.log(values);
  };

  return (
    <>
      <NavDrawer />
      <LoginPage handleLogin={handleLogin} />
    </>
  );
};

export default App;
