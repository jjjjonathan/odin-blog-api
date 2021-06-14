import React, { useState, useEffect } from 'react';
import { Switch, Route, useHistory } from 'react-router-dom';
import { Container } from 'react-bootstrap';

import Header from './components/Header';
import Home from './components/Home';
import PostPage from './components/PostPage';
import SignUpPage from './components/SignUpPage';
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
          if (error.message === 'Failed to fetch') {
            setErrorMessage('Failed to load data from server');
          } else {
            setErrorMessage(error.message);
          }
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
        console.log({ error });
        if (error.message === 'Failed to fetch') {
          setErrorMessage('Failed to load data from server');
        } else {
          setErrorMessage(error.message);
        }
      });
  }, []);

  const handleSignUp = (values) => {
    console.log(values);
  };

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

          history.push('/');
          setSuccessMessage(`Successfully logged in as ${username}!`);
        } else {
          setErrorMessage('Invalid username or password');
        }
      })
      .catch((error) => {
        console.error(error);
        if (error.message === 'Failed to fetch') {
          setErrorMessage('Failed to load data from server');
        } else {
          setErrorMessage(error.message);
        }
      });
  };

  const handleLogout = () => {
    localStorage.removeItem('odinBlogPublicToken');
    localStorage.removeItem('odinBlogPublicUserId');
    setToken('');
    setUser();
  };

  const handleAddComment = ({ comment, postId }, formikBag) => {
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
        setBlogs(
          blogs.map((blog) => {
            if (blog._id === post) {
              return {
                ...blog,
                comments: [
                  ...blog.comments,
                  {
                    body,
                    timestamp,
                    user,
                    _id,
                  },
                ],
              };
            } else {
              return blog;
            }
          }),
        );

        formikBag.resetForm();
      })
      .catch((error) => {
        console.error(error);
        if (error.message === 'Failed to fetch') {
          setErrorMessage('Failed to add comment; error connecting to server');
        } else {
          setErrorMessage(error.message);
        }
      });
  };

  const handleDeleteComment = (event) => {
    const commentId = event.target.dataset.commentid;
    const postId = event.target.dataset.postid;

    fetch(`${baseUrl}/api/comments/${commentId}`, {
      method: 'DELETE',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then(() => {
        setBlogs(
          blogs.map((blog) => {
            if (blog._id === postId) {
              return {
                ...blog,
                comments: blog.comments.filter((comment) => {
                  if (comment._id === commentId) {
                    return false;
                  } else {
                    return true;
                  }
                }),
              };
            } else {
              return blog;
            }
          }),
        );
      })
      .catch((error) => {
        console.error(error);
        setErrorMessage(error);
      });
  };

  return (
    <>
      <Header user={user} handleLogout={handleLogout} />
      <Container className="mt-4" style={{ maxWidth: 600 }}>
        <Messages
          errorMessage={errorMessage}
          setErrorMessage={setErrorMessage}
          successMessage={successMessage}
          setSuccessMessage={setSuccessMessage}
        />
        <Switch>
          <Route path="/signup">
            <SignUpPage handleSignUp={handleSignUp} />
          </Route>
          <Route path="/login">
            <SignInPage handleLogin={handleLogin} />
          </Route>
          <Route path="/posts/:id">
            <PostPage
              blogs={blogs}
              user={user}
              handleAddComment={handleAddComment}
              handleDeleteComment={handleDeleteComment}
            />
          </Route>
          <Route exact path="/">
            <Home blogs={blogs} />
          </Route>
        </Switch>
      </Container>
    </>
  );
};

export default App;
