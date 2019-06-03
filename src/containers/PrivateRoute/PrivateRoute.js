import React, { useEffect } from "react";
import { Redirect, Route } from "react-router-dom";
import useGlobal from "../../hooks/useGlobal";

const PrivateRoute = props => {
  const [globalState, setGlobalState] = useGlobal();
  const {
    component: Component,
    // setUserId,
    ...rest
  } = props;

  const { loggedIn } = globalState;

  const userId = localStorage.getItem("userId");

  // useEffect(() => {
  //   if (userId) {
  //     setUserId(userId)
  //   }
  // }, [])

  return (
    <Route
      {...rest}
      render={props => {
        if (loggedIn || userId) {
          return <Component {...props} />;
        } else {
          return <Redirect to="/login" />;
        }
      }}
    />
  );
};

export default PrivateRoute;