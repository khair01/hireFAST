// import React from "react";
// import { Navigate } from "react-router-dom";
// import { useAuthorized } from "../hooks/useAuthorized";

// type Props = {
//     children: React.ReactNode;
// };

// export const ProtectedRoute = ({ children }: Props) => {
//     const { authState, loading } = useAuthorized();

//     if (loading) {
//         return <div>Loading...</div>; // Display a loading indicator while checking auth status
//     }

//     if (!authState.isAuthorized) {
//         return <Navigate to="/signin" replace />;
//     }

//     return <>{children}</>;
// };
