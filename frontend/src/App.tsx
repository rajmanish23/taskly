import { Navigate, Route, Routes } from "react-router-dom";
import Cookies from "js-cookie";

import {
  ACCESS_KEY,
  LOGIN_PAGE_URL,
  REFRESH_KEY,
  REGISTER_PAGE_URL,
  TODAY_PAGE_URL,
} from "./constants";

import Login from "./pages/Login";
import Register from "./pages/Register";
import Today from "./pages/Today";
import ProtectedRoute from "./components/ProtectedRoute";
import NotFound from "./pages/NotFound";

function Logout() {
  Cookies.remove(ACCESS_KEY);
  Cookies.remove(REFRESH_KEY);
  return <Navigate to="/login" />;
}

function App() {
  return (
    <Routes>
      <Route
        path={TODAY_PAGE_URL}
        element={
          <ProtectedRoute>
            <Today />
          </ProtectedRoute>
        }
      />
      <Route path={LOGIN_PAGE_URL} element={<Login />} />
      <Route path="/logout" element={<Logout />} />
      <Route path={REGISTER_PAGE_URL} element={<Register />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

export default App;
