"use client";
import axios from "axios";
import Link from "next/link";
import React, {useState} from "react";

interface UserData {
  _id: string;
  username: string;
  email: string;
  isVerfied?: boolean;
  isAdmin?: boolean;
}
import {toast} from "react-hot-toast";
import {useRouter} from "next/navigation";


export default function ProfilePage() {
  const router = useRouter()
  const [data, setData] = useState<UserData | null>(null)
    const logout = async () => {
        try {
            await axios.get('/api/users/logout')
            toast.success('Logout successful')
            router.push('/login')
        } catch (error:any) {
            console.log(error.message);
            toast.error(error.message)
        }
    }

    const getUserDetails = async () => {
        const res = await axios.get('/api/users/me')
        console.log(res.data);
  setData(res.data.data)
    }

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 py-8 px-4">
      <div className="w-full max-w-md bg-white shadow-lg rounded-xl p-6">
        {/* Header */}
        <h1 className="text-3xl font-bold text-center text-gray-800">Profile</h1>
        <p className="text-center text-gray-600 mt-2">Welcome to your profile page</p>
        <hr className="my-4 border-gray-300" />

        {/* User Details */}
        {data ? (
          <div className="space-y-3 text-gray-600 ">
            <p><span className="font-semibold">ID:</span> {data._id}</p>
            <p><span className="font-semibold">Username:</span> {data.username}</p>
            <p><span className="font-semibold">Email:</span> {data.email}</p>
            <p>
              <span className="font-semibold">Verified:</span>{" "}
              {data.isVerfied ? (
                <span className="text-green-600 font-medium">Yes</span>
              ) : (
                <span className="text-red-600 font-medium">No</span>
              )}
            </p>
            <p>
              <span className="font-semibold">Admin:</span>{" "}
              {data.isAdmin ? (
                <span className="text-blue-600 font-medium">Yes</span>
              ) : (
                <span className="text-gray-600 font-medium">No</span>
              )}
            </p>
          </div>
        ) : (
          <p className="text-red-600 font-medium text-center">No Profile Data Found</p>
        )}

        {/* Buttons */}
        <div className="flex flex-col mt-6 gap-3">
          <button
            onClick={logout}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-lg transition duration-200"
          >
            Logout
          </button>
          <button
            onClick={getUserDetails}
            className="w-full bg-green-600 hover:bg-green-700 text-white font-semibold py-2 px-4 rounded-lg transition duration-200"
          >
            Get User Details
          </button>
        </div>

        {/* Link */}
        <div className="mt-4 text-center">
          <Link
            href={`/profile/${data?.username || ""}`}
            className="text-blue-600 hover:underline"
          >
            View Public Profile
          </Link>
        </div>
      </div>
    </div>
    )
}