import React from "react";
import Dashboard from "../components/Admin/Dashboard.jsx";
import AdminRoute from "../components/Routes/AdminRoutes.jsx";

const Admin = () => {
  return (
    <AdminRoute>
      <Dashboard />
    </AdminRoute>
  );
};

export default Admin;
