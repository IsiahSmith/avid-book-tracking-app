import React, { useEffect } from 'react';
import {
  HashRouter as Router,
  Redirect,
  Route,
  Switch,
} from 'react-router-dom';

import { useDispatch, useSelector } from 'react-redux';

import Nav from '../Nav/Nav';
import Footer from '../Footer/Footer';

import ProtectedRoute from '../ProtectedRoute/ProtectedRoute';

import AboutPage from '../AboutPage/AboutPage';
import HomePage from '../HomePage/HomePage';
import Collection from '../Collection/Collection';
import LandingPage from '../LandingPage/LandingPage';
import LoginPage from '../LoginPage/LoginPage';
import RegisterPage from '../RegisterPage/RegisterPage';
import EditBook from '../EditBook/EditBook';
import UpdateProgress from '../UpdateProgress/UpdateProgress';
import CompleteForm from '../CompleteForm/CompleteForm';
import AddBook from '../AddBook/AddBook';
import ReadingData from '../ReadingData/ReadingData';

import './App.css';

//theme
import { createTheme, ThemeProvider } from '@mui/material/styles';

let theme = createTheme({
  palette: {
    primary: {
      main: '#e552a6'
    },
    secondary: {
      main: '#ce93d8'
    }
  }
});

function App() {
  const dispatch = useDispatch();

  const user = useSelector(store => store.user);

  useEffect(() => {
    dispatch({ type: 'FETCH_USER' });
  }, [dispatch]);

  return (
    <ThemeProvider theme={theme}>
      <Router>
        <div>
          <Nav />
          <Switch>
            {/* Visiting localhost:3000 will redirect to localhost:3000/home */}
            <Redirect exact from="/" to="/home" />

            {/* Visiting localhost:3000/about will show the about page. */}
            <Route
              // shows AboutPage at all times (logged in or not)
              exact
              path="/about"
            >
              <AboutPage />
            </Route>

            {/* For protected routes, the view could show one of several things on the same route.
            Visiting localhost:3000/homepage will show the homepage if the user is logged in.
            If the user is not logged in, the ProtectedRoute will show the LoginPage (component).
            Even though it seems like they are different pages, the user is always on localhost:3000/homepage */}
            <ProtectedRoute
              // logged in shows homepage else shows LoginPage
              exact
              path="/homepage"
            >
              <HomePage />
            </ProtectedRoute>

            <ProtectedRoute
              // logged in shows EditBook else shows LoginPage
              exact
              path="/edit/:book_id"
            >
              <EditBook />
            </ProtectedRoute>

            <ProtectedRoute
              // logged in shows UpdateProgress else shows LoginPage
              exact
              path="/update/:book_id"
            >
              <UpdateProgress />
            </ProtectedRoute>

            <ProtectedRoute
              // logged in shows CompleteForm else shows LoginPage
              exact
              path="/complete/:book_id"
            >
              <CompleteForm />
            </ProtectedRoute>

            <ProtectedRoute
              // logged in shows AddBook else shows LoginPage
              exact
              path="/addbook"
            >
              <AddBook />
            </ProtectedRoute>

            <ProtectedRoute
              // logged in shows Collection else shows LoginPage
              exact
              path="/collection"
            >
              <Collection />
            </ProtectedRoute>

            <ProtectedRoute
              // logged in shows ReadingData else shows LoginPage
              exact
              path="/data"
            >
              <ReadingData />
            </ProtectedRoute>

            <Route
              exact
              path="/login"
            >
              {user.id ?
                // If the user is already logged in, 
                // redirect to the /homepage
                <Redirect to="/homepage" />
                :
                // Otherwise, show the login page
                <LoginPage />
              }
            </Route>

            <Route
              exact
              path="/registration"
            >
              {user.id ?
                // If the user is already logged in, 
                // redirect them to the /homepage
                <Redirect to="/homepage" />
                :
                // Otherwise, show the registration page
                <RegisterPage />
              }
            </Route>

            <Route
              exact
              path="/home"
            >
              {user.id ?
                // If the user is already logged in, 
                // redirect them to the /homepage
                <Redirect to="/homepage" />
                :
                // Otherwise, show the Landing page
                <LandingPage />
              }
            </Route>

            {/* If none of the other routes matched, we will show a 404. */}
            <Route>
              <h1>404</h1>
            </Route>
          </Switch>
          <Footer />
        </div>
      </Router>
    </ThemeProvider>
  );
}

export default App;
