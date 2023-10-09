import "./App.css";
import io from "socket.io-client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import NotFound from "./pages/NotFound";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import LogIn from "./pages/LogIn";
import UserDashboard from "./pages/user/UserDashboard";
import UserRoute from "./component/UserRoute";
import AdminRoute from "./component/AdminRoute";
import Layout from "./pages/global/Layout";
import UserJobsHistory from "./pages/user/UserJobsHistory";
import UserInfoDashboard from "./pages/user/UserInfoDashboard";
import AdminDashboard from "./pages/admin/AdminDashboard";
import SingleJob from "./pages/SingleJob";
import DashUsers from "./pages/admin/DashUsers";
import DashJobs from "./pages/admin/DashJobs";
import Register from "./pages/Register";
import DashCategory from "./pages/admin/DashCategory";
import DashCreateJob from "./pages/admin/DashCreateJob";
import DashCreateCategory from "./pages/admin/DashCreateCategory";
import DashCreateUser from "./pages/admin/DashCreateUser";

import { useSelector } from "react-redux";
import { useMemo } from "react";
import ChatApp from "./component/ChatApp";
import ChatList from "./pages/admin/ChatList";

//HOC
const UserDashboardHOC = Layout(UserDashboard);
const UserJobsHistoryHOC = Layout(UserJobsHistory);
const UserInfoDashboardHOC = Layout(UserInfoDashboard);
const UserChatAppHOC = Layout(ChatApp);
const AdminDashboardHOC = Layout(AdminDashboard);
const DashUsersHOC = Layout(DashUsers);
const DashJobsHOC = Layout(DashJobs);
const DashCategoryHOC = Layout(DashCategory);
const DashCreateJobHOC = Layout(DashCreateJob);
const DashCreateUserHOC = Layout(DashCreateUser);
const DashCreateCategoryHOC = Layout(DashCreateCategory);
const AdminChatListHOC = Layout(ChatList);
const socket = io("http://localhost:9000");

const App = () => {
  return (
    <>
      <ToastContainer />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/search/location/:location" element={<Home />} />
          <Route path="/search/:keyword" element={<Home />} />
          <Route path="/login" element={<LogIn />} />
          <Route path="/register" element={<Register />} />
          <Route path="/job/:id" element={<SingleJob />} />
          <Route
            path="/admin/dashboard"
            element={
              <AdminRoute>
                <AdminDashboardHOC />
              </AdminRoute>
            }
          />
          <Route
            path="/admin/users"
            element={
              <AdminRoute>
                <DashUsersHOC />
              </AdminRoute>
            }
          />
          <Route
            path="/admin/create/user"
            element={
              <AdminRoute>
                <DashCreateUserHOC />
              </AdminRoute>
            }
          />
          <Route
            path="/admin/jobs"
            element={
              <AdminRoute>
                <DashJobsHOC />
              </AdminRoute>
            }
          />
          <Route
            path="/admin/category"
            element={
              <AdminRoute>
                <DashCategoryHOC />
              </AdminRoute>
            }
          />
          <Route
            path="/admin/job/create"
            element={
              <AdminRoute>
                <DashCreateJobHOC />
              </AdminRoute>
            }
          />
          <Route
            path="/admin/category/create"
            element={
              <AdminRoute>
                <DashCreateCategoryHOC />
              </AdminRoute>
            }
          />
          <Route
            path="/admin/chats"
            element={
              <AdminRoute>
                <AdminChatListHOC />
              </AdminRoute>
            }
          />
          <Route
            path="/admin/user/chats"
            element={
              <AdminRoute>
                <UserChatAppHOC />
              </AdminRoute>
            }
          />
          <Route
            path="/user/chats"
            element={
              <UserRoute>
                <UserChatAppHOC />
              </UserRoute>
            }
          />
          <Route
            path="/user/dashboard"
            element={
              <UserRoute>
                <UserDashboardHOC />
              </UserRoute>
            }
          />
          <Route
            path="/user/jobs"
            element={
              <UserRoute>
                <UserJobsHistoryHOC />
              </UserRoute>
            }
          />
          <Route
            path="/user/info"
            element={
              <UserRoute>
                <UserInfoDashboardHOC />
              </UserRoute>
            }
          />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </>
  );
};

export default App;
