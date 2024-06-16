import accountApiRequest from "@/apiRequests/account";
import Profile from "@/app/me/profile";
import { cookies } from "next/headers";
import React from "react";

// Test gọi API ở Next-server
export default async function MeProfile() {
    const cookieStore = cookies();
    const sessionToken = cookieStore.get("sessionToken");
    const result = await accountApiRequest.me(sessionToken?.value ?? "");
    console.log("result server", result); //log trên server port 3000

    return (
        <div>
            <h1>Profile-server</h1>
            <div>Xin chào {result.payload.data.name}</div>
            <Profile />
        </div>
    );
}
