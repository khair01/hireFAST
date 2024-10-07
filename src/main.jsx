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
import Dashboard from "./pages/Dashboard.jsx";
const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },

  {
    path: "/dashboard",
    element:
      <Dashboard />,
    children: [
      {
        path: "admin",
        element:
          <ProtectedRoute role="admin">
            <AdminDashboard />
          </ProtectedRoute>
      },
      {
        path: "student",
        element:
          <ProtectedRoute role={["student", "admin"]}>
            <StudentDashboard />
          </ProtectedRoute>
      },
      {
        path: "recruiter",
        element:
          <ProtectedRoute role={["recruiter", "admin"]}>
            <RecruiterDashboard />
          </ProtectedRoute>
      },
    ]
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

]);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <AuthProvider >
      <RouterProvider router={router} />
    </AuthProvider>
  </StrictMode>
);
