import React, { lazy, Suspense } from "react"
import {
  BrowserRouter as Router,
  Route,
  NavLink,
  Switch
} from "react-router-dom"
import ListContainer from './containers/ListContainer/ListContainer'
import EpisodeContainer from './containers/EpisodeContainer/EpisodeContainer'
// const HouseTableContainer = lazy(() =>
//   import("./containers/HouseTableContainer/index")
//)


function Routes() {
  return (
    <Router>
      <div>
        <Header />
        <Switch>
          <Suspense fallback={<h1>Loading...</h1>}>
            <Route exact path="/" component={Home} />
            <Route exact path="/list" component={EpisodeContainer} />
            <Route exact path="/characters" component={ListContainer} />
            <Route exact path="/similar" component={Similar} />
            <Route exact path="/login" component={Login} />
            {/* <Route path="*" component={notFound404} /> */}
          </Suspense>
        </Switch>
      </div>
    </Router>
  )
}

function Home() {
  return <h2>Home</h2>
}

// function List () {
//     return <h2>List</h2>
// }

// function notFound404() {
//   return <h2>404 Page not found</h2>
// }

function Characters() {
  return <h2>Characters</h2>
}

function Similar() {
  return <h1>Similar</h1>
}

function Login () {
    return <h1>Login</h1>
}

function Header() {
  return (
    <nav className="NavBar">
      <ul>
        <li>
          <NavLink to="/">Home</NavLink>
        </li>
        <li>
          <NavLink to="/list">List</NavLink>
        </li>
        <li>
          <NavLink to="/characters">Characters</NavLink>
        </li>
        <li>
          <NavLink to="/similar">Similar</NavLink>
        </li>
        <li>
            <NavLink to="/login">Log In</NavLink>
        </li>
      </ul>
    </nav>
  )
}

export default Routes
