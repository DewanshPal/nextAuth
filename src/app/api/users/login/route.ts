import {connect} from "@/dbConfig/dbConfig";
import User from "@/models/userModel";
import { NextRequest, NextResponse } from "next/server";
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";

connect()

export async function POST(request: NextRequest){
    try{
        const reqBody = await request.json() // sends the promise
        const {email, password} = reqBody;

        //check if user exists
        const user = await User.findOne({email})
        
        //these message should be in another file for production level
        if(!user){
            return NextResponse.json({error: "Invalid email"}, {status: 400})
        }

        console.log("User Exists")

        const validPassword = await bcryptjs.compare(password, user.password)
       if(!validPassword){
        return NextResponse.json({error: "Invalid password"}, {status: 400})
       }

       //create token data
        const tokenData = {
            id: user._id,
            username: user.username,
            email: user.email
        }
        // process.env.JWT_SECRET_KEY! the exclamation mark is used to tell typescript that this variable will never be null or undefined

        const token = jwt.sign(tokenData, process.env.JWT_SECRET_KEY!, {expiresIn: "1d"})

         const response = NextResponse.json({
            message: "Login successful",
            success: true,
        })
        response.cookies.set("token", token, {
            httpOnly: true, 
            
        })
        return response;

       
    }
    catch (error: any) {
        return NextResponse.json({error: error.message}, {status: 500})

    }
}