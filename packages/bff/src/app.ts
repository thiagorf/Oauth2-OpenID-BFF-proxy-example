import axios from "axios";
import express, { json, Request, Response } from "express";
import { findProviderCredentials } from "./providers";
import cors from "cors";

const app = express();

app.use(cors());
app.use(json());

app.get("/health", (_, res: Response) => {
    return res.json("BFF proxy is up and running");
});

app.post("/token", async (req: Request, res: Response) => {
    const { code } = req.body;

    const state = req.query.state as string;

    const { url, ...provider } = findProviderCredentials(state);

    console.log(url);

    console.log(provider.redirect_uri);

    const result = await axios.post(
        url,
        {},
        {
            params: {
                code,
                ...provider,
            },
        }
    );

    res.cookie("token", JSON.stringify(result.data), {
        maxAge: 15000 * 60,
    });

    return res.json(result.data);
});

export default app;
