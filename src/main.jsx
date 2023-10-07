import { BrowserRouter } from "react-router-dom";
import CssBaseline from '@mui/material/CssBaseline';
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { AuthContextProvider } from "./contexts/AuthContext.jsx";
import { StrictMode } from "react";

ReactDOM.createRoot(document.getElementById("root")).render(
  <StrictMode>
    <CssBaseline />
  <AuthContextProvider>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </AuthContextProvider>
  </StrictMode>
);
