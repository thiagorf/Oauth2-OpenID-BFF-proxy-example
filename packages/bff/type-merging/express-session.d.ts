import "express-session";
declare module "express-session" {
    interface SessionData {
        email: string;
        provider: "github" | "google";
    }
}
