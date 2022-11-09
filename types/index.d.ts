export {}

declare global {
    namespace Express {
        interface Request {
            payload?: {
                userId: number;
                iat: number;
                exp: number;
            }
        }
    }
}