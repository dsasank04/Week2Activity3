import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { CounterContext } from "./CounterContext";

const Home = () => {
  const { state } = useContext(CounterContext);

  return (
    <div>
      <h1>Counter Value: {state.count}</h1>
      <Link to="/counter">Counter</Link>
      <h1>MyCounter Value: {state.myCount}</h1>
      <Link to="/mycounter">MyCounter</Link>
    </div>
  );
};

export default Home;
