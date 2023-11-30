import { Navigate, Route, Routes, useNavigate } from "react-router-dom";
import Login from "./pages/login";
import Register from "./pages/Register";
import { useEffect } from "react";
import Dashboard from "./pages/Dashboard";
import Categories from "./pages/Categories";
import Home from "./pages/Home";

function App() {
  function IsLogin() {
    if (!localStorage.token) {
      return <Navigate to={"/login"} />;
    }
    return null;
  }

  function IsNotLogin() {
    if (localStorage.token) {
      return <Navigate to={"/"} />;
    }
    return null;
  }

  useEffect(() => {
    IsLogin();
  }, []);

  return (
    <Routes>
      <Route element={IsLogin()}>
        <Route path="/" element={<Dashboard />} />
        <Route path="/categories" element={<Categories />} />
        <Route path="/home" element={<Home />} />
      </Route>
      <Route element={IsNotLogin()}>
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
      </Route>
    </Routes>
  );
}

export default App;
