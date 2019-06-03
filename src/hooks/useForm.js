import React, { useState } from "react";
import useGlobal from "../hooks/useGlobal";

const useForm = (users, userList) => {
  const [values, setValues] = useState({
    email: "",
    password: ""
  });
  const [globalState, setGlobalState] = useGlobal();

  const handleChange = event => {
    const name = event.target.name;
    const value = event.target.value;

    setValues({
      ...values,
      [name]: value
    });
  };
  console.log(values);

  const handleSubmit = event => {
    event.preventDefault();

    logIn(values.email, values.password);
  };

  const logIn = (email, password) => {
    const userId = fakeLogin(email, password, users, userList);
    const errorMessage = "Email o password incorrecto";
    console.log(userId);
    if (userId) {
      setGlobalState({
        ...globalState,
        loggedIn: userId,
        error: null
      });
    } else {
      setGlobalState({
        ...globalState,
        loggedIn: null,
        error: errorMessage
      });
    }
  };

  const fakeLogin = (email, password, users, userList) => {
    return userList.find(userId => {
      return (
        users[userId].email === email && users[userId].password === password
      );
    });
  };

  return {
    values,
    handleChange,
    handleSubmit
  };
};

export default useForm;
