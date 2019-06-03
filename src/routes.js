import React, { Suspense } from "react";
import {
  BrowserRouter as Router,
  Route,
  NavLink,
  Switch,
  Redirect
} from "react-router-dom";
import ListContainer from "./containers/ListContainer/ListContainer";
import EpisodeContainer from "./containers/EpisodeContainer/EpisodeContainer";
import LoginPage from "./pages/LoginPage/LoginPage";
import RegisterPage from "./pages/RegisterPage/RegisterPage";
import PrivateRoute from "./containers/PrivateRoute/PrivateRoute";
import useGlobal from "./hooks/useGlobal";
import HomePage from "./pages/HomePage/HomePage";
import SimilarPage from "./pages/SimilarPage/SimilarPage";

function Routes() {
  return (
    <Router>
      <div>
        <Header />
        <Suspense fallback={<h1>Loading...</h1>}>
          <Switch>
            <Route exact path="/" component={HomePage} />
            <PrivateRoute exact path="/list" component={EpisodeContainer} />
            <PrivateRoute exact path="/characters" component={ListContainer} />
            <PrivateRoute exact path="/similar" component={SimilarPage} />
            <Route exact path="/login" component={LoginPage} />
            <Route exact path="/register" component={RegisterPage} />
            <Route exact path="/logout" component={LogOut} />
            <Route path="*" component={notFound404} />
          </Switch>
        </Suspense>
      </div>
    </Router>
  );
}

function notFound404() {
  return <h2>404 Page not found</h2>;
}

const LogOut = () => {
  const [globalState, setGlobalState] = useGlobal();
  setGlobalState({ ...globalState, loggedIn: null });
  return <Redirect to="/" />;
};

const Header = () => {
  const [globalState, setGlobalState] = useGlobal();
  const { loggedIn } = globalState;
  return (
    <nav className="NavBar">
      <ul>
        <li>
          <NavLink to="/">Home</NavLink>
        </li>
        <li>
          <NavLink to="/list">Episodes</NavLink>
        </li>
        <li>
          <NavLink to="/characters">Characters</NavLink>
        </li>
        <li>
          <NavLink to="/similar">Similar</NavLink>
        </li>
        {!loggedIn && (
          <li>
            <NavLink to="/register">Register</NavLink>
          </li>
        )}
        {!loggedIn && (
          <li>
            <NavLink to="/login">Log In</NavLink>
          </li>
        )}
        {loggedIn && (
          <li>
            <NavLink to="/logout">Log Out</NavLink>
          </li>
        )}
        <li>User: {loggedIn ? globalState.users[loggedIn].name : ""}</li>
      </ul>
    </nav>
  );
};

export default Routes;
