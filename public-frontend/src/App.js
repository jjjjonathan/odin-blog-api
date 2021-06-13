import React, { useState, useEffect } from 'react';
import { Switch, Route, useHistory } from 'react-router-dom';
import { Container } from 'react-bootstrap';

import Header from './components/Header';
import Home from './components/Home';
import PostPage from './components/PostPage';
import SignInPage from './components/SignInPage';
import Messages from './components/Messages';

const App = () => {
  const history = useHistory();

  const [blogs, setBlogs] = useState([]);
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [token, setToken] = useState('');

  useEffect(() => {
    fetch('http://localhost:5000/api/posts', { mode: 'cors' })
      .then((response) => response.json())
      .then((fetchedBlogs) => setBlogs(fetchedBlogs))
      .catch((error) => {
        console.error(error);
        setErrorMessage(error);
      });
  }, []);

  const handleLogin = (values) => {
    fetch('http://localhost:5000/api/users/login', {
      method: 'POST',
      body: JSON.stringify(values),
      headers: {
        'Content-type': 'application/json',
      },
    })
      .then((response) => response.json())
      .then((loginInfo) => {
        if (loginInfo.token) {
          setToken(loginInfo.token);
          history.push('/');
          setSuccessMessage('Successfully logged in as ___!');
        } else {
          setErrorMessage('Invalid username or password');
        }
      })
      .catch((error) => {
        console.error(error);
        setErrorMessage(error);
      });
  };

  return (
    <div>
      <Header />
      <Container className="mt-4" style={{ maxWidth: 600 }}>
        <Messages
          errorMessage={errorMessage}
          setErrorMessage={setErrorMessage}
          successMessage={successMessage}
          setSuccessMessage={setSuccessMessage}
        />
        <Switch>
          <Route path="/login">
            <SignInPage handleLogin={handleLogin} />
          </Route>
          <Route path="/posts/:id">
            <PostPage blogs={blogs} />
          </Route>
          <Route exact path="/">
            <Home blogs={blogs} />
          </Route>
        </Switch>
      </Container>
    </div>
  );
};

export default App;
