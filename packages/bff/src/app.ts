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

    const state = req.params.state;
    const provider_name = state.split("|")[1];

    const { url, ...provider } = findProviderCredentials(provider_name);

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

    return res.json(result.data);
});

export default app;
