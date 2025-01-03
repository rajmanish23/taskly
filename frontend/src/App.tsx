import { useCallback, useEffect, useState } from "react";
import { Route, Routes } from "react-router-dom";
import { BarLoader } from "react-spinners";

import {
  BAR_LOADER_HEIGHT,
  BAR_LOADER_WIDTH,
  COMPLETED_PAGE_URL,
  LOGIN_PAGE_URL,
  PREVIOUS_PAGE_URL,
  REGISTER_PAGE_URL,
  SETTING_CHANGE_PASSWORD_URL,
  SETTING_DELETE_ACCOUNT_URL,
  SETTING_EDIT_EMAIL_URL,
  SETTING_EDIT_NAME_URL,
  SETTING_LOGOUT_URL,
  SETTING_PROFILE_URL,
  SETTING_RESTORE_URL,
  STYLE_TEXT_COLOR,
  TAG_PAGE_URL_WITH_PARAM,
  TASK_PAGE_URL_WITH_PARAM,
  TODAY_PAGE_URL,
  UPCOMING_PAGE_URL,
} from "./constants";

import Login from "./pages/Login";
import Register from "./pages/Register";
import Today from "./pages/Today";
import ProtectedRoute from "./components/ProtectedRoute";
import ErrorPage from "./pages/ErrorPage";
import pingAPI from "./API/pingAPI";
import Upcoming from "./pages/Upcoming";
import Previous from "./pages/Previous";
import TagListTask from "./pages/TagListTask";
import ChangePassword from "./pages/settings/ChangePassword";
import DeleteAccount from "./pages/settings/DeleteAccount";
import EditEmail from "./pages/settings/EditEmail";
import EditName from "./pages/settings/EditName";
import Profile from "./pages/settings/Profile";
import Logout from "./pages/settings/Logout";
import { PageContextProvider } from "./context/PageContext";
import RestoreDeleted from "./pages/settings/RestoreDeleted";
import { UpdateContextProvider } from "./context/UpdateContext";
import TaskDetails from "./pages/TaskDetails";
import Completed from "./pages/Completed";

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
          height: "100%",
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
    return <ErrorPage />;
  }

  return (
    <PageContextProvider>
      <UpdateContextProvider>
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
            path={COMPLETED_PAGE_URL}
            element={
              <ProtectedRoute>
                <Completed />
              </ProtectedRoute>
            }
          />
          <Route
            path={TAG_PAGE_URL_WITH_PARAM}
            element={
              <ProtectedRoute>
                <TagListTask />
              </ProtectedRoute>
            }
          />
          <Route
            path={TASK_PAGE_URL_WITH_PARAM}
            element={
              <ProtectedRoute>
                <TaskDetails />
              </ProtectedRoute>
            }
          />
          <Route
            path={SETTING_CHANGE_PASSWORD_URL}
            element={
              <ProtectedRoute>
                <ChangePassword />
              </ProtectedRoute>
            }
          />
          <Route
            path={SETTING_DELETE_ACCOUNT_URL}
            element={
              <ProtectedRoute>
                <DeleteAccount />
              </ProtectedRoute>
            }
          />
          <Route
            path={SETTING_EDIT_EMAIL_URL}
            element={
              <ProtectedRoute>
                <EditEmail />
              </ProtectedRoute>
            }
          />
          <Route
            path={SETTING_EDIT_NAME_URL}
            element={
              <ProtectedRoute>
                <EditName />
              </ProtectedRoute>
            }
          />
          <Route
            path={SETTING_LOGOUT_URL}
            element={
              <ProtectedRoute>
                <Logout />
              </ProtectedRoute>
            }
          />
          <Route
            path={SETTING_PROFILE_URL}
            element={
              <ProtectedRoute>
                <Profile />
              </ProtectedRoute>
            }
          />
          <Route
            path={SETTING_RESTORE_URL}
            element={
              <ProtectedRoute>
                <RestoreDeleted />
              </ProtectedRoute>
            }
          />
          <Route path={LOGIN_PAGE_URL} element={<Login />} />
          <Route path={REGISTER_PAGE_URL} element={<Register />} />
          <Route path="*" element={<ErrorPage />} />
        </Routes>
      </UpdateContextProvider>
    </PageContextProvider>
  );
}

export default App;
