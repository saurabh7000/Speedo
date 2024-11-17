import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import TripDetails from "./pages/TripDetails";
import Register from "./pages/Register";
import ProtectRoute from "./components/ProtectRoute";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route
          path="/"
          element={
            <ProtectRoute>
              <Home />
            </ProtectRoute>
          }
        />
        <Route
          path="/trip/details"
          element={
            <ProtectRoute>
              <TripDetails />
            </ProtectRoute>
          }
        />
      </Routes>
    </Router>
  );
};

export default App;
