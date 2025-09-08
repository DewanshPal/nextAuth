import {connect} from "@/dbConfig/dbConfig";
import User from "@/models/userModel";
import { NextRequest, NextResponse } from "next/server";
import { getDataFromToken } from "@/helper/getDataFromToken";

connect()

export async function GET(request: NextRequest){

    try {
         const userId = await getDataFromToken(request);
        const user = await User.findOne({_id: userId}).select("-password");
        //check if user exists
        if(!user){
            return NextResponse.json({error: "User not found"}, {status: 404})
        }

        console.log("User Exists")
        return NextResponse.json({
            message: "User found",
            data: user
        })

    } catch (error: any) {
        return NextResponse.json({error: error.message}, {status: 500})

    }
}