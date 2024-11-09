import { Route, Routes } from "react-router-dom";
import Cookies from 'js-cookie'

import { ACCESS_KEY, REFRESH_KEY } from "./constants";

import Login from "./pages/Login";
import Register from "./pages/Register";
import Today from "./pages/Today";
import ProtectedRoute from "./components/ProtectedRoute";
import NotFound from "./pages/NotFound";

// function Logout() {
//   Cookies.remove(ACCESS_KEY)
//   Cookies.remove(REFRESH_KEY)
//   return <Navigate to="/login" />
// }

function RegisterAndLogout() {
  Cookies.remove(ACCESS_KEY);
  Cookies.remove(REFRESH_KEY);
  return <Register />
}

function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element={
          <ProtectedRoute>
            <Today />
          </ProtectedRoute>
        } />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<RegisterAndLogout />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </div>
  );
}

export default App;
