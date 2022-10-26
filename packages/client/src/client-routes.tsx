import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Layout } from "./components/layout";
import Login from "./pages/Login";
import { Me } from "./pages/Me";

export const ClientRoutes = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route element={<Layout />}>
                    <Route path="/" element={<Login />} />
                    <Route path="/me" element={<Me />} />
                </Route>
            </Routes>
        </BrowserRouter>
    );
};
