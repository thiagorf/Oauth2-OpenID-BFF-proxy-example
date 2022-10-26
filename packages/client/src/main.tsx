import React from "react";
import ReactDOM from "react-dom/client";
import { ClientRoutes } from "./client-routes";
import "./index.css";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
    <React.StrictMode>
        <ClientRoutes />
    </React.StrictMode>
);
