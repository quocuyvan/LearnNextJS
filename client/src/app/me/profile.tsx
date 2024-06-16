"use client";

import accountApiRequest from "@/apiRequests/account";
import { handleErrorApi } from "@/lib/utils";
import { useEffect } from "react";

export default function Profile() {
    useEffect(() => {
        const fetchRequest = async () => {
            try {
                const result = await accountApiRequest.meClient();
                console.log("result client", result); //log trên client port 3000
            } catch (error) {
                handleErrorApi(error as any);
            }
        };
        fetchRequest();
    }, []);

    return <div>profile-client</div>;
}
