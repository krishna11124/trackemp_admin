import React, { useEffect } from "react";
import AdminLayout from "./layout/adminLayout";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from "./page/Authorization/Authorization";
import AuthLayout from "./layout/authLayout";
import useMessageStore from "./zustand/messageStore";
import toast, { Toaster } from "react-hot-toast";
import ProtectedRoute from "./page/Authorization/protectedRoute";
import MyLoader from "./components/appLoader";
import useLoadingStore from "./zustand/globalLoadingState";
import { LinkItems } from "./layout/data";



function App() {
  const { message, error, clearMessageAndError } = useMessageStore();
  useEffect(() => {
    if (message) {
      toast.success(message);
    }
    if (error) {
      toast.error(error);
    }
    if (message || error) {
      clearMessageAndError();
    }
  }, [error, message, clearMessageAndError]);

  const token = localStorage.getItem("token");

  const { loading } = useLoadingStore();
  return (
    <BrowserRouter>
      {loading && <MyLoader />}
      <Routes>
        <Route
          path="/"
          element={
            <ProtectedRoute isAuthenticated={!token} redirect="/dashboard">
              <AuthLayout image="/assets/images/login-xl.png">
                <Login />
              </AuthLayout>
            </ProtectedRoute>
          }
        />
        
        {LinkItems.map((item) => (
          <Route
            path={item.href}
            element={
              <ProtectedRoute isAuthenticated={!!token} redirect="/">
                <AdminLayout>
                  <item.Component />
                </AdminLayout>
              </ProtectedRoute>
            }
          />
        ))}
      </Routes>
      <Toaster />
    </BrowserRouter>
  );
}

export default App;
