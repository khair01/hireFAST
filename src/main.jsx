import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import SignIn from "./pages/SignIn";
import Home from "./pages/Home.jsx";
import Signup from "./pages/Signup.tsx";
import ApplyJobs from "./pages/ApplyJobs.jsx";
import { BrowserRouter } from "react-router-dom";
import "./index.css";
import AdminDashboard from "./pages/AdminDashboard.tsx";
import { AuthProvider } from "./context/AuthContext.jsx";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { ProtectedRoute } from "./Routes/ProtectedRoutes.tsx";
import StudentDashboard from "./pages/StudentDashboard.tsx";
import RecruiterDashboard from "./pages/RecruiterDashboard.jsx";
const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },
  {
    path: "/signin",
    element: <SignIn />,
  },
  {
    path: "/signup",
    element: <Signup />,
  },
  {
    path: "/applynow",
    element: <ApplyJobs />
  },
  {
    path: "/dashboard/admin",

    element:
      (
        <ProtectedRoute role="admin">
          <AdminDashboard />
        </ProtectedRoute>

      )
  },
  {
    path: "/dashboard/student",

    element:
      (
        <ProtectedRoute role="student">
          <StudentDashboard />
        </ProtectedRoute>

      )
  },
  {
    path: "/dashboard/recruiter",

    element:
      (
        <ProtectedRoute role="admin">
          <RecruiterDashboard />
        </ProtectedRoute>

      )
  }
]);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <AuthProvider >
      <RouterProvider router={router} />
    </AuthProvider>
  </StrictMode>
);
