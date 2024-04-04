import React from "react";
import ReactDOM from "react-dom/client";
import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Home from "./pages/Home.tsx";
import { CssBaseline, ThemeProvider, alpha, createTheme } from "@mui/material";
import NewHome from "./pages/NewHome.tsx";
import { colors } from "./config/color.ts";

const theme = createTheme({
  palette: {
    mode: "light",
    primary: {
      main: colors.primary.main,
    },
  },
  typography: {
    fontFamily: "sans-serif",
  },
  components: {
    MuiCssBaseline: {
      styleOverrides: {
        body: {
          backgroundColor: alpha(colors.primary.main, 0.2)
        },
      },
    },
  },
});

const router = createBrowserRouter([
  {
    path: "/",
    element: <NewHome />,
  },
  {
    path: "/old",
    element: <Home />,
  },
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <RouterProvider router={router} />
    </ThemeProvider>
  </React.StrictMode>
);
