import { createBrowserRouter } from "react-router-dom";
import Auth from "../Layout/Auth/Auth";
import Main from "../Layout/Main/Main";
import Home from "../Pages/Dashboard/Home/Home";
import PrivacyPolicy from "../Pages/Dashboard/PrivacyPolicy/PrivacyPolicy.jsx";
import Login from "../Pages/Auth/Login";
import ForgotPassword from "../Pages/Auth/ForgotPassword";
import VerifyOtp from "../Pages/Auth/VerifyOtp";
import ResetPassword from "../Pages/Auth/ResetPassword";
import NotFound from "../NotFound";

import AdminProfile from "../Pages/Dashboard/AdminProfile/AdminProfile";

import TermsAndCondition from "../Pages/Dashboard/TermsAndCondition/TermsAndCondition";
import UsersList from "../Pages/Dashboard/UsersList/UsersList.jsx";
import Transaction from "../Pages/Dashboard/Transaction/Transaction.jsx";
import Setting from "../Pages/Dashboard/Setting/Setting.jsx";
import FaqCollapse from "../Pages/Dashboard/FAQ/FaqCollapse.jsx";
import Contact from "../Pages/Dashboard/Contact/Contact.jsx";
import Category from "../Pages/Dashboard/Category/Category.jsx";
import PrivateRoute from "./ProtectedRoute.jsx";
import AboutPage from "../Pages/Dashboard/About/page.jsx";

const router = createBrowserRouter([
  {
    path: "/",

    element: (
      <PrivateRoute>
        <Main />
      </PrivateRoute>
    ),
    children: [
      {
        path: "/",
        element: <Home />,
      },

      {
        path: "/userlist",
        element: <UsersList />,
      },

      {
        path: "/transaction",
        element: <Transaction />,
      },

      {
        path: "/category",
        element: <Category />,
      },
      {
        path: "/about",
        element: <AboutPage />,
      },
      {
        path: "/faq",
        element: <FaqCollapse />,
      },
      {
        path: "/contact",
        element: <Contact />,
      },

      {
        path: "/privacy-policy",
        element: <PrivacyPolicy />,
      },
      {
        path: "/terms-and-conditions",
        element: <TermsAndCondition />,
      },

      {
        path: "/profile",
        element: <AdminProfile />,
      },
      {
        path: "/setting",
        element: <Setting />,
      },
    ],
  },
  {
    path: "/auth",
    element: <Auth />,
    children: [
      {
        path: "/auth",
        element: <Login />,
      },
      {
        path: "login",
        element: <Login />,
      },
      {
        path: "forgot-password",
        element: <ForgotPassword />,
      },
      {
        path: "verify-otp",
        element: <VerifyOtp />,
      },
      {
        path: "reset-password",
        element: <ResetPassword />,
      },
    ],
  },
  {
    path: "*",
    element: <NotFound />,
  },
]);

export default router;
