import React from "react";
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";

import Layout from "./components/Layout";
import Home from "./pages/Home";
import NotFound from "./pages/NotFound";
import LandingPage from "./pages/Landing";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Settings from "./pages/Settings";

const App = () => {
  const [token, setToken] = React.useState(localStorage.getItem("token"));

  React.useEffect(() => {
    const handleAuthChange = () => {
      setToken(localStorage.getItem("token"));
    };

    window.addEventListener("storage", handleAuthChange);
    window.addEventListener("auth:changed", handleAuthChange);
    return () => {
      window.removeEventListener("storage", handleAuthChange);
      window.removeEventListener("auth:changed", handleAuthChange);
    };
  }, []);

  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={token ? <Navigate to="/home" /> : <Navigate to="/welcome" />}
        ></Route>

        <Route path="/welcome" element={<LandingPage></LandingPage>}></Route>

        <Route path="/login" element={<Login></Login>}></Route>

        <Route path="/register" element={<Register></Register>}></Route>

        <Route
          element={token ? <Layout></Layout> : <Navigate to="/login" replace />}
        >
          <Route path="/home" element={<Home></Home>}></Route>
          <Route path="/settings" element={<Settings />} />

          <Route path="*" element={<NotFound></NotFound>}></Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default App;
