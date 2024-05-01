import React, { useReducer,useContext, useEffect, useCallback } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./Components/Home";
import Counter from "./Components/Counter";
import MyCounter from "./Components/MyCounter";
import { CounterContext } from "./Components/CounterContext";
import { counterReducer } from "./Components/counterReducer";
import axios from "axios";

const App = () => {
  const [state, dispatch] = useReducer(counterReducer, {
    count: 0,
    myCount: 0,
  });
  const fetchCounter = useCallback(async () => {
    try {
      const response = await axios.get("http://localhost:5000/api/counters");
      console.log("Server response:", response.data); // Add this line
      dispatch({ type: "SET", count: response.data.counter });
      dispatch({ type: "MYSET", myCount: response.data.myCounter });
    } catch (err) {
      console.error(err);
    }
  }, [dispatch]);

 useEffect(() => {
   fetchCounter();
 }, [fetchCounter]);


  return (
    <CounterContext.Provider value={{ state, dispatch }}>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/counter" element={<Counter />} />
          <Route path="/mycounter" element={<MyCounter />} />
        </Routes>
      </Router>
    </CounterContext.Provider>
  );
};

export default App;