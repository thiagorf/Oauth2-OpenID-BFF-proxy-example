import dotenv from "dotenv";
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

app.use(
    cors({
        origin: "http://localhost:3000",
        credentials: true,
    })
);
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
            maxAge: 1000 * 60 * 2,
            sameSite: "lax",
        },
    })
);

app.use(function (req, res, next) {
    if (!req.session) {
        return next(new Error("oh no"));
    }
    next();
});

app.get("/health", (_, res: Response) => {
    return res.json("BFF proxy is up and running!");
});

app.post("/token", async (req: Request, res: Response) => {
    const { code } = req.body;

    const state = req.query.state as AvailableProviders;

    if (!state) {
        throw new Error("State param is required!");
    }

    try {
        const provider = findProviderFactory(state, code);

        const email = await provider.fetchAccessToken();

        req.session.email = email;
        req.session.provider = state;

        req.session.save((err) => console.log(err));

        return res.json(`Successfully created session id: ${req.sessionID}`);
    } catch (e) {
        console.log(`Error on ${state} provider`);

        res.end();
    }
});

app.get("/me", async (req: Request, res: Response) => {
    return res.json({
        email: req.session.email,
        provider: req.session.provider,
    });
});

app.get("/logout", async (req: Request, res: Response) => {
    req.session.destroy(() => console.log("Destroyed"));

    res.clearCookie("sid", {
        httpOnly: true,
    });

    return res.json("Session destroyed");
});

export default app;
