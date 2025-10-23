import React from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App";
import "./index.css";
import { CuaHangBaiViet } from "./stores/cuaHangBaiViet";

createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <BrowserRouter>
      <CuaHangBaiViet>
        <App />
      </CuaHangBaiViet>
    </BrowserRouter>
  </React.StrictMode>
);
