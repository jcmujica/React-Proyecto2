import React, { useState, useEffect } from "react";
import useGlobal from "../../hooks/useGlobal";

const RegisterUser = () => {
  const [values, setValues] = useState({
    email: "",
    password: "",
    confirm: ""
  });
  const [globalState, setGlobalState] = useGlobal();
  const { error, users, userList } = globalState;
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
              email: values.email,
              password: values.password,
              favoriteEpisodes: [],
              episodesWatched: [],
              favoriteCharacters: []
            }
          },
          userList: [...userList, (userList.length + 1).toString()],
          error: null
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

  return (
    <div>
      <h1>Register</h1>
      <form onSubmit={handleSubmit}>
        <label for="email">Email</label>
        <input
          type="email"
          name="email"
          id="email"
          onChange={handleChange}
          value={values.email}
          required
        />
        <label for="password">Password</label>
        <input
          type="password"
          name="password"
          id="password"
          onChange={handleChange}
          value={values.password}
          required
        />
        <label for="confirm">Confirm Password</label>
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
  );
};

export default RegisterUser;
