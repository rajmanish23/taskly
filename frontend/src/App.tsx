import { Navigate, Route, Routes } from "react-router-dom";
import Cookies from "js-cookie";
import { BarLoader } from "react-spinners";

import {
  ACCESS_KEY,
  BAR_LOADER_HEIGHT,
  BAR_LOADER_WIDTH,
  LOGIN_PAGE_URL,
  PREVIOUS_PAGE_URL,
  REFRESH_KEY,
  REGISTER_PAGE_URL,
  STYLE_TEXT_COLOR,
  TAG_PAGE_URL,
  TODAY_PAGE_URL,
  UPCOMING_PAGE_URL,
} from "./constants";

import Login from "./pages/Login";
import Register from "./pages/Register";
import Today from "./pages/Today";
import ProtectedRoute from "./components/ProtectedRoute";
import NotFound from "./pages/NotFound";
import pingAPI from "./API/pingAPI";
import { useCallback, useEffect, useState } from "react";
import Upcoming from "./pages/Upcoming";
import Previous from "./pages/Previous";
import TagListTask from "./pages/TagListTask";

function Logout() {
  Cookies.remove(ACCESS_KEY);
  Cookies.remove(REFRESH_KEY);
  return <Navigate to="/login" />;
}

function App() {
  const [isAPIAlive, setIsAPIAlive] = useState<null | boolean>(null);

  const checkAPIStatus = useCallback(async () => {
    const res = await pingAPI();
    setIsAPIAlive(res);
  }, [setIsAPIAlive]);

  useEffect(() => {
    checkAPIStatus().catch((e) => {
      console.error(e);
      setIsAPIAlive(false);
    });
  }, [checkAPIStatus]);

  if (isAPIAlive === null) {
    return (
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100%"
        }}
      >
        <BarLoader
          color={STYLE_TEXT_COLOR}
          width={BAR_LOADER_WIDTH}
          height={BAR_LOADER_HEIGHT}
        />
      </div>
    );
  }

  if (!isAPIAlive) {
    // TODO: Replace this with a nicer looking page
    return <div>Backend is dead!!!</div>;
  }

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
      <Route
        path={UPCOMING_PAGE_URL}
        element={
          <ProtectedRoute>
            <Upcoming />
          </ProtectedRoute>
        }
      />
      <Route
        path={PREVIOUS_PAGE_URL}
        element={
          <ProtectedRoute>
            <Previous />
          </ProtectedRoute>
        }
      />
      <Route
        path={TAG_PAGE_URL}
        element={
          <ProtectedRoute>
            <TagListTask />
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
