import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { Container } from 'react-bootstrap';

import Header from './components/Header';
import Home from './components/Home';
import PostPage from './components/PostPage';

const App = () => {
  const [blogs, setBlogs] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    fetch('http://localhost:5000/api/posts', { mode: 'cors' })
      .then((response) => {
        response
          .json()
          .then((fetchedBlogs) => {
            console.log(fetchedBlogs);
            setBlogs(fetchedBlogs);
          })
          .catch((e) => setError(e));
      })
      .catch((error) => setError(error));
  }, []);

  return (
    <Router>
      <Header />
      <Container className="mt-4" style={{ maxWidth: 600 }}>
        <Switch>
          <Route path="/posts/:id">
            <PostPage blogs={blogs} />
          </Route>
          <Route path="/">
            <Home blogs={blogs} error={error} />
          </Route>
        </Switch>
      </Container>
    </Router>
  );
};

export default App;
