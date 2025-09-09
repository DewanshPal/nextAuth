import {connect} from "@/dbConfig/dbConfig";
import User from "@/models/userModel";
import { NextRequest, NextResponse } from "next/server";

connect()

export async function POST(request: NextRequest){
    try {
        const reqBody = await request.json() // sends the promise
        const {token} = reqBody;
        console.log(token);

        //find the user with the token
        const user = await User.findOne({verifyToken: token, verifyTokenExpiry: {$gt: Date.now()}}) // greater than current time
        console.log(user);

        if(!user){
            return NextResponse.json({error: "Invalid or expired token"}, {status: 400})
        }

        user.isVerfied = true;
        user.verifyToken = undefined;
        user.verifyTokenExpiry = undefined;
        await user.save();
        
        return NextResponse.json({
            message: "Email verified successfully",
            success: true
        })
    }
    catch (error: unknown) {
        const errorMessage = error instanceof Error ? error.message : 'Email verification failed';
        return NextResponse.json({error: errorMessage}, {status: 500})

    }
}

