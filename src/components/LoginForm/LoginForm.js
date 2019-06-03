import React from "react";
import useForm from "../../hooks/useForm";
import { Redirect } from "react-router-dom";
import useGlobal from "../../hooks/useGlobal";

const LoginForm = () => {
  const [globalState, setGlobalState] = useGlobal();
  const {users, userList, loggedIn, error} = globalState
  const { values, handleChange, handleSubmit } = useForm(users, userList);
  
  if (loggedIn) {
    return <Redirect to="/" />;
  }

  return (
    <div>
      <h2>Log  In</h2>
    <form onSubmit={handleSubmit}>
      <label for='email'>Email</label>
      <input
        type="email"
        name="email"
        id='email'
        onChange={handleChange}
        value={values.email}
      />
      <label for='email'>Password</label>
      <input
        type="password"
        name="password"
        id='password'
        onChange={handleChange}
        value={values.password}
      />
      <button action="submit">Log in</button>
      <div>{error}</div>
    </form>
    </div>
  );
};

export default LoginForm;
