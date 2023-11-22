import { Navigate, Route, Routes, useNavigate } from "react-router-dom";
import Login from "./pages/login";
import Register from "./pages/Register";
import Home from "./pages/Home";

function IsLogin() {
  if (!localStorage.token) {
    return <Navigate to={"/login"} replace />;
  }
  return null;
}

function IsNotLogin() {
  const navigate = useNavigate();
  if (localStorage.token) {
    // setTimeout(() => {
    //   window.location.reload();
    // }, 5000);
    return navigate("/home");
  }
  return null;
}

function App() {
  return (
    <Routes>
      <Route element={IsLogin()}>
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
