import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';

import LoginPage from './components/LoginPage';
import NavDrawer from './components/NavDrawer';
import Toast from './components/Toast';
import MainSwitch from './components/MainSwitch';

import { baseUrl } from './variables';

const App = () => {
  const history = useHistory();

  const [blogs, setBlogs] = useState([]);
  const [token, setToken] = useState('');
  const [user, setUser] = useState();
  const [message, setMessage] = useState('');

  // Effect hook for fetching current user object from stored token
  useEffect(() => {
    const storedToken = localStorage.getItem('odinBlogAdminToken');
    const storedUserId = localStorage.getItem('odinBlogAdminUserId');

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
            setMessage('Failed to load data from server');
          } else {
            setMessage(error.message);
          }
        });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Effect hook for fetching blog posts
  useEffect(() => {
    if (user) {
      fetch(`${baseUrl}/api/users/${user._id}/posts`, {
        mode: 'cors',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
        .then((response) => response.json())
        .then((fetchedBlogs) => setBlogs(fetchedBlogs))
        .catch((error) => {
          console.log({ error });
          if (error.message === 'Failed to fetch') {
            setMessage('Failed to load data from server');
          } else {
            setMessage(error.message);
          }
        });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user]);

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

          localStorage.setItem('odinBlogAdminToken', loginInfo.token);
          localStorage.setItem('odinBlogAdminUserId', _id);

          setUser({ _id, username, email, admin });

          setMessage(`Successfully logged in as ${username}!`);
        } else {
          setMessage('Invalid username or password');
        }
      })
      .catch((error) => {
        console.error(error);
        if (error.message === 'Failed to fetch') {
          setMessage('Failed to load data from server');
        } else {
          setMessage(error.message);
        }
      });
  };

  const handleLogout = () => {
    localStorage.removeItem('odinBlogAdminToken');
    localStorage.removeItem('odinBlogAdminUserId');
    setToken('');
    setMessage(`Logged out ${user.username}!`);
    setUser();
  };

  const handleEditPost = (values, id) => {
    fetch(`${baseUrl}/api/posts/${id}`, {
      method: 'PUT',
      body: JSON.stringify(values),
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-type': 'application/json',
      },
    })
      .then((response) => response.json())
      .then((editedPost) => {
        setBlogs(
          blogs.map((blog) => {
            if (blog._id === id) {
              console.log('editedpost');
              return editedPost;
            } else {
              console.log('blog');
              return blog;
            }
          }),
        );

        history.push('/posts');
        setMessage(`Successfully updated post ${editedPost.title}`);
      })
      .catch((error) => {
        console.error(error);
        if (error.message === 'Failed to fetch') {
          setMessage('Failed to edit post');
        } else {
          setMessage(error.message);
        }
      });
  };

  return user ? (
    <>
      <NavDrawer handleLogout={handleLogout} />
      <Toast message={message} />
      <MainSwitch blogs={blogs} handleEditPost={handleEditPost} />
    </>
  ) : (
    <>
      <LoginPage handleLogin={handleLogin} />
      <Toast message={message} />
    </>
  );
};

export default App;
