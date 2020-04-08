import React, { useState, useEffect } from "react";
import useGlobal from "../../hooks/useGlobal";
import { Redirect } from "react-router-dom";

const RegisterUser = () => {
  const [values, setValues] = useState({
    name: "",
    email: "",
    password: "",
    confirm: ""
  });
  const [globalState, setGlobalState] = useGlobal();
  const { error, users, userList, loggedIn } = globalState;
  var controller = new AbortController();

  useEffect(() => {
    return () => controller.abort();
  });

  const handleChange = event => {
    const name = event.target.name;
    const value = event.target.value;
    setValues({
      ...values,
      [name]: value
    });
  };

  const handleSubmit = e => {
    e.preventDefault();
    if (values.password === values.confirm) {
      const emailUsed = userList
        .map(el => users[el].email === values.email)
        .includes(true);

      if (!emailUsed) {
        setGlobalState({
          ...globalState,
          users: {
            ...users,
            [userList.length + 1]: {
              name: values.name,
              email: values.email,
              password: values.password,
              favoriteEpisodes: [],
              episodesWatched: [],
              favoriteCharacters: []
            }
          },
          userList: [...userList, (userList.length + 1).toString()],
          error: null,
          loggedIn: userList.length + 1
        });
        setValues({
          name: "",
          email: "",
          password: "",
          confirm: ""
        });
      } else {
        const errorMessage = "This email is being used by another user";
        setGlobalState({
          ...globalState,
          loggedIn: null,
          error: errorMessage
        });
      }
    } else {
      const errorMessage = "Please check the entered information.";
      setGlobalState({
        ...globalState,
        loggedIn: null,
        error: errorMessage
      });
    }
  };
  if (loggedIn) { return <Redirect to="/" /> } else {
    return (

      <div>

        <h1>Register</h1>
        <form onSubmit={handleSubmit}>
          <label htmlFor="name">Name</label>
          <input
            type="name"
            name="name"
            id="name"
            onChange={handleChange}
            value={values.name}
            required
          />
          <label htmlFor="email">Email</label>
          <input
            type="email"
            name="email"
            id="email"
            onChange={handleChange}
            value={values.email}
            required
          />
          <label htmlFor="password">Password</label>
          <input
            type="password"
            name="password"
            id="password"
            onChange={handleChange}
            value={values.password}
            required
          />
          <label htmlFor="confirm">Confirm Password</label>
          <input
            type="password"
            name="confirm"
            id="confirm"
            onChange={handleChange}
            value={values.confirm}
            required
          />
          <button action="submit">Register</button>
          <div>{error}</div>
        </form>
      </div>
    )
  };
};

export default RegisterUser;
