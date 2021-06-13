import React, { useState, useEffect } from 'react';
import { Switch, Route, useHistory } from 'react-router-dom';
import { Container } from 'react-bootstrap';

import Header from './components/Header';
import Home from './components/Home';
import PostPage from './components/PostPage';
import SignInPage from './components/SignInPage';
import Messages from './components/Messages';

const baseUrl = 'http://localhost:5000';

const App = () => {
  const history = useHistory();

  const [blogs, setBlogs] = useState([]);
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
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
          setErrorMessage(error);
        });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Effect hook for fetching blog posts
  useEffect(() => {
    fetch(`${baseUrl}/api/posts`, { mode: 'cors' })
      .then((response) => response.json())
      .then((fetchedBlogs) => setBlogs(fetchedBlogs))
      .catch((error) => {
        console.error(error);
        setErrorMessage(error);
      });
  }, []);

  const handleLogin = (values) => {
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

          history.push('/');
          setSuccessMessage(`Successfully logged in as ${username}!`);
        } else {
          setErrorMessage('Invalid username or password');
        }
      })
      .catch((error) => {
        console.error(error);
        setErrorMessage(error);
      });
  };

  const handleLogout = () => {
    localStorage.removeItem('odinBlogPublicToken');
    localStorage.removeItem('odinBlogPublicUserId');
    setToken('');
    setUser();
  };

  const handleAddComment = ({ comment, postId }) => {
    fetch(`${baseUrl}/api/posts/${postId}/comments`, {
      method: 'POST',
      body: JSON.stringify({ body: comment }),
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-type': 'application/json',
      },
    })
      .then((response) => response.json())
      .then(({ body, timestamp, user, _id, post }) => {
        console.log(blogs);
        console.log({ body, timestamp, user, _id });

        // setBlogs(
        //   blogs.map((blog) => {
        //     if (blog._id === post) {
        //       return {
        //         comments: [
        //           ...blog.comments,
        //           {
        //             body,
        //             timestamp,
        //             user,
        //             _id,
        //           },
        //         ],
        //         ...blog,
        //       };
        //     } else {
        //       return blog;
        //     }
        //   }),
        // );
      })
      .catch((error) => {
        console.error(error);
        setErrorMessage(error);
      });
  };

  return (
    <div>
      <Header user={user} handleLogout={handleLogout} />
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
            <PostPage
              blogs={blogs}
              user={user}
              handleAddComment={handleAddComment}
            />
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
