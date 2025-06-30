import { createBrowserRouter } from "react-router";
import RootLayout from "../layouts/RootLayout";
import Home from "../pages/Home/Home/Home";
import AuthLayout from "../layouts/AuthLayout";
import Login from "../pages/Authentication/Login/Login";
import Register from "../pages/Authentication/Register/Register";
import Coverage from "../pages/Coverage/Coverage";
import SendParcel from "../pages/SendParcel/SendParcel";
import PrivateRoute from "../Routes/PrivateRoute";
import DashboardLayout from "../layouts/DashboardLayout";
import MyParcels from "../pages/Dashboard/MyParcels/MyParcels";
import About from "../pages/About/About";
import Payment from "../pages/Dashboard/Payment/Payment";
import PaymentHistory from "../pages/Dashboard/Payment/PaymentHistory/PaymentHistory";
import TrackParcel from "../pages/Dashboard/TrackParcel/TrackParcel";
import BeARider from "../pages/Dashboard/BeARider/BeARider";
import PendingRiders from "../pages/Dashboard/PendingRiders/PendingRiders";
import ActiveRiders from "../pages/Dashboard/ActiveRiders/ActiveRiders";
import MakeAdmin from "../pages/Dashboard/MakeAdmin/MakeAdmin";
import Forbidden from "../pages/Forbidden/Forbidden";
import AdminRoute from "../Routes/AdminRoute";
import AssignRider from "../pages/Dashboard/AssignRider/AssignRider";

export const router = createBrowserRouter([
  {
    path: "/",
    // Component: RootLayout,
    element: <RootLayout />,
    children: [
      {
        index: true,
        // Component: Home,
        element: <Home />,
      },
      {
        path: "/coverage",
        // Component: Coverage,
        element: <Coverage />,
      },
      {
        path: "/forbidden",
        element: <Forbidden />,
      },
      {
        path: "/sendParcel",
        element: (
          <PrivateRoute>
            <SendParcel />
          </PrivateRoute>
        ),
      },
      {
        path: "/beARider",
        element: (
          <PrivateRoute>
            <BeARider />
          </PrivateRoute>
        ),
      },
      {
        path: "/about",
        element: (
          <PrivateRoute>
            <About />
          </PrivateRoute>
        ),
      },
    ],
  },
  {
    path: "/",
    // Component: AuthLayout,
    element: <AuthLayout />,
    children: [
      {
        path: "/login",
        // Component: Login,
        element: <Login />,
      },
      {
        path: "/register",
        // Component: Register,
        element: <Register />,
      },
    ],
  },
  {
    path: "/dashboard",
    element: (
      <PrivateRoute>
        <DashboardLayout />
      </PrivateRoute>
    ),
    children: [
      {
        path: "myParcels",
        // Component: MyParcels,
        element: <MyParcels />,
      },
      {
        path: "payment/:parcelId",
        element: <Payment />,
      },
      {
        path: "paymentHistory",
        element: <PaymentHistory />,
      },
      {
        path: "track",
        element: <TrackParcel />,
      },
      {
        path: "assignRider",
        element: (
          <AdminRoute>
            <AssignRider />
          </AdminRoute>
        ),
      },
      {
        path: "pendingRider",
        element: (
          <AdminRoute>
            <PendingRiders />
          </AdminRoute>
        ),
      },
      {
        path: "activeRider",
        element: (
          <AdminRoute>
            <ActiveRiders />
          </AdminRoute>
        ),
      },
      {
        path: "makeAdmin",
        element: (
          <AdminRoute>
            {" "}
            <MakeAdmin />
          </AdminRoute>
        ),
      },
    ],
  },
]);
