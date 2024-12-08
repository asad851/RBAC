import React, { useState, useEffect } from "react";
import { Button, CssBaseline, IconButton, ThemeProvider } from "@mui/material";
import { lightTheme } from "./MuiTheme";
import "@fontsource/roboto";
import { Route, Routes, useNavigate } from "react-router-dom";
import {
  publicRoutes,
  AuthProtectedAdminRoutes,
  AuthProtectedUserRoutes,
} from "./routes/index.jsx";
import NonAuthLayout from "./components/Layout/NonAuthLayout.jsx";
import {
  Authmiddleware,
  AuthUserMiddleWare,
} from "./components/Layout/RoleBasedAuthentication.jsx";
import Layout from "./components/Layout/Layout.jsx";
import { useSelector } from "react-redux";
import { LOGIN_PATH } from "./routes/route_names.js";
import { ErrorProvider } from "./utils/ErrorHandler.jsx";
function App() {
  return (
    <ErrorProvider>
      <ThemeProvider theme={lightTheme}>
        <CssBaseline />
        <div className="w-full h-dvh bg-[#f9fafc]">
          <Routes>
            {publicRoutes.map((route, idx) => (
              <Route
                path={route.path}
                element={<NonAuthLayout>{<route.element />}</NonAuthLayout>}
                key={idx}
              />
            ))}

            {AuthProtectedAdminRoutes.map((route, idx) => (
              <Route
                path={route.path}
                element={
                  <Authmiddleware>
                    <Layout>{<route.element />}</Layout>
                  </Authmiddleware>
                }
                key={idx}
              />
            ))}

            {AuthProtectedUserRoutes.map((route, idx) => (
              <Route
                path={route.path}
                element={
                  <AuthUserMiddleWare>
                    <Layout>{<route.element />}</Layout>
                  </AuthUserMiddleWare>
                }
                key={idx}
              />
            ))}
          </Routes>
        </div>
      </ThemeProvider>
    </ErrorProvider>
  );
}

export default App;
