import { NextRequest } from "next/server";
import jwt from "jsonwebtoken";

interface JwtPayload {
    id: string;
    username: string;
    email: string;
}

export const getDataFromToken = async (request: NextRequest): Promise<string> => {
    try{
        const token = request.cookies.get("token")?.value;
        const decoded = jwt.verify(token!, process.env.JWT_SECRET_KEY!) as JwtPayload;
        return decoded.id ;
    } catch (error: unknown) {
        const errorMessage = error instanceof Error ? error.message : 'Token verification failed';
        throw new Error(errorMessage); 
    }
}