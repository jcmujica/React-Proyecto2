import React from "react";
import Image from "../../assets/img/rick-morty.jpg";

const HomePage = props => {
  return (
    <div>
      <h1>React & Morty</h1>
      <img src={Image} alt="Rick-and-morty" />
    </div>
  );
};

export default HomePage;
