import React, { useState, useEffect } from 'react';
import { Switch, Route } from 'react-router-dom';

import LoginPage from './components/LoginPage';
import NavDrawer from './components/NavDrawer';

const baseUrl = 'http://localhost:5000';

const App = () => {
  const [blogs, setBlogs] = useState([]);
  const [token, setToken] = useState('');
  const [user, setUser] = useState();

  // Effect hook for fetching current user object from stored token
  useEffect(() => {
    const storedToken = localStorage.getItem('odinBlogPublicToken');
    const storedUserId = localStorage.getItem('odinBlogPublicUserId');

    if (storedToken && storedUserId && !token && !user) {
      fetch(`${baseUrl}/api/users/${storedUserId}`, {
        headers: {
          Authorization: `Bearer ${storedToken}`,
        },
      })
        .then((response) => response.json())
        .then((fetchedUser) => {
          setToken(storedToken);
          setUser(fetchedUser);
        })
        .catch((error) => {
          console.error(error);
          if (error.message === 'Failed to fetch') {
            // TODO ('Failed to load data from server');
          } else {
            // TODO (error.message);
          }
        });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // function is async so that formik will automatically setSubmitting to false on completion
  const handleLogin = async (values) => {
    fetch(`${baseUrl}/api/users/login`, {
      method: 'POST',
      body: JSON.stringify(values),
      headers: {
        'Content-type': 'application/json',
      },
    })
      .then((response) => response.json())
      .then((loginInfo) => {
        if (loginInfo.token) {
          const { _id, username, email, admin } = loginInfo;

          setToken(loginInfo.token);

          localStorage.setItem('odinBlogPublicToken', loginInfo.token);
          localStorage.setItem('odinBlogPublicUserId', _id);

          setUser({ _id, username, email, admin });

          // TODO (`Successfully logged in as ${username}!`);
        } else {
          // TODO ('Invalid username or password');
        }
      })
      .catch((error) => {
        console.error(error);
        if (error.message === 'Failed to fetch') {
          // TODO ('Failed to load data from server');
        } else {
          // TODO (error.message);
        }
      });
  };

  const handleLogout = () => {
    localStorage.removeItem('odinBlogPublicToken');
    localStorage.removeItem('odinBlogPublicUserId');
    setToken('');
    setUser();
  };

  return user ? (
    <>
      <NavDrawer handleLogout={handleLogout} />
    </>
  ) : (
    <LoginPage handleLogin={handleLogin} />
  );
};

export default App;
