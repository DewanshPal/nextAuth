"use client";

import axios from "axios";
import Link from "next/link";
import React, {useEffect, useState, useCallback} from "react";


export default function VerifyEmailPage() {

    const [token, setToken] = useState("");
    const [verified, setVerified] = useState(false);
    const [error, setError] = useState(false);

    const verifyUserEmail = useCallback(async () => {
        try {
            await axios.post('/api/users/verifyemail', {token})
            setVerified(true);
            setError(false);
        } catch (error: unknown) {
            setError(true);
            console.log(error);
            
        }

    }, [token]);

    useEffect(() => {
        setError(false);
        const urlToken = window.location.search.split("=")[1];
        setToken(urlToken || "");
    }, []);


    useEffect(() => {
        setError(false);
        if(token.length > 0) {
            verifyUserEmail();
        }
    }, [token, verifyUserEmail]);

    return(
 <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100 px-4">
      <div className="bg-white shadow-xl rounded-2xl w-full max-w-md p-8 text-center">
        {/* Header */}
        <h1 className="text-3xl font-bold text-gray-800 mb-4">
          Verify Your Email
        </h1>

        {/* Token Display */}
        <div className="p-3 mb-6 rounded-lg bg-orange-100 text-orange-800 font-mono text-sm break-all">
          {token ? token : "No token provided"}
        </div>

        {/* Verification Result */}
        {verified && (
          <div className="space-y-4">
            <h2 className="text-xl font-semibold text-green-600">
              ✅ Email Verified Successfully
            </h2>
            <Link
              href="/login"
              className="inline-block px-6 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition"
            >
              Go to Login
            </Link>
          </div>
        )}

        {error && (
          <div className="p-4 rounded-lg bg-red-100 text-red-700 mt-4">
            <h2 className="text-lg font-semibold">❌ Verification Failed</h2>
            <p className="text-sm">Your token may be invalid or expired.</p>
          </div>
        )}
      </div>
    </div>
    )

}