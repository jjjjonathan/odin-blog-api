import React, { useState, useEffect } from 'react';
import { Container } from 'react-bootstrap';

import Header from './components/Header';
import BlogList from './components/BlogList';

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
    <div>
      <Header />
      <Container className="mt-4" style={{ maxWidth: 600 }}>
        <BlogList blogs={blogs} />
        <p style={{ color: 'red' }}>{error}</p>
      </Container>
    </div>
  );
};

export default App;
