import dotenv from "dotenv"; // see https://github.com/motdotla/dotenv#how-do-i-use-dotenv-with-import
dotenv.config();
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

// check connection
const RedisStore = connectRedis(session);

app.use(cors());
app.use(json());
app.use(
    session({
        store: new RedisStore({
            client: redis,
        }),
        name: "sid",
        secret: "asdasd",
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
    return res.json("BFF proxy is up and running!");
});

app.post("/token", async (req: Request, res: Response) => {
    const { code } = req.body;

    const state = req.query.state as AvailableProviders;

    console.log(state);

    if (!state) {
        throw new Error("State param is required!");
    }

    const provider = findProviderFactory(state, code);

    //TODO add session id cookie
    return res.json(await provider.fetchAccessToken());
});

export default app;
