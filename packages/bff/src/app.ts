import express, { json, Request, Response } from "express";
import session from "express-session";
import cors from "cors";
import connectRedis from "connect-redis";
import { redis } from "./redis";
import {
    AvailableProviders,
    findProviderFactory,
} from "./providers/find-provider-factory";

const app = express();

const RedisStore = connectRedis(session);

app.use(
    cors({
        origin: process.env.CLIENT_ORIGIN,
    })
);
app.use(json());
app.use(
    session({
        store: new RedisStore({
            client: redis,
        }),
        name: "sid",
        secret: "secret",
        resave: false,
        saveUninitialized: false,
        cookie: {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            maxAge: 1000 * 60 * 60 * 2,
        },
    })
);

app.get("/health", (_, res: Response) => {
    return res.json("BFF proxy is up and running");
});

app.post("/token", async (req: Request, res: Response) => {
    const { code } = req.body;

    const state = req.query.state as AvailableProviders;

    const provider = findProviderFactory(state, code);

    //TODO add session id cookie
    return res.json(await provider.fetchAccessToken());

    /*
    const { url, ...provider } = findProviderCredentials(state);

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
	*/
});

export default app;
