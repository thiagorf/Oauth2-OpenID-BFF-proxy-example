import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

interface CookieResponse {
    email: string;
    provider: "github" | "google";
}

export const Me = () => {
    const [userInfo, setUserInfo] = useState<CookieResponse>();
    const navigate = useNavigate();
    const data = localStorage.getItem("token");

    useEffect(() => {
        (async () => {
            const result = await handleCookieRequest();

            if (Object.entries(result).length == 0) {
                navigate("/");
                return;
            }

            setUserInfo(result);
        })();
    }, []);

    const handleLogout = async () => {
        const result = await fetch(
            `${import.meta.env.VITE_BFF_PROXY_BASE_URL}/logout`,
            {
                method: "GET",
            }
        ).then((res) => res.json());

        localStorage.removeItem("token");
        navigate("/");
    };

    const handleCookieRequest = async () => {
        const result = (await fetch(
            `${import.meta.env.VITE_BFF_PROXY_BASE_URL}/me`,
            {
                method: "GET",
                credentials: "include",
            }
        ).then((res) => res.json())) as CookieResponse;

        return result;
    };

    if (userInfo == undefined) {
        return null;
    }

    return (
        <div>
            <h1 className="text-4xl text-center">Me Page</h1>
            <p>
                Logged email:{" "}
                <span className="font-bold">{userInfo.email}</span>
            </p>
            <p>
                Selected provider:{" "}
                <span className="font-bold">{userInfo.provider}</span>
            </p>
            <button
                className="border rounded border-gray-400 w-20"
                onClick={handleLogout}
            >
                Logout
            </button>
            <button onClick={handleCookieRequest}>Get Cookie</button>
        </div>
    );
};
