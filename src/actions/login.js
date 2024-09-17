"use server"

import { cookies } from "next/headers";
import { decode_token, create_token, get_refresh_token, verify_blocked_token } from "./token";

export const login = async (url_token) => {
    try {
        const decode = await decode_token(url_token);
        if (!decode?.success && decode?.error) return 401;

        const verify = await verify_blocked_token(url_token);
        if (verify?.token_blocked || !verify?.success) return 401;

        // Đưa url_token vào black list
        await fetch(`${ process.env.API_SERVER }/token/block_token`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ token: url_token }),
            cache: "no-cache"
        })

        const payload = { ...decode?.decode }
        delete payload["exp"];
        delete payload["iat"];
        
        const access_token = await create_token({ user_id: payload?.user_id }, "10s");
        const refresh_token = await get_refresh_token(payload?.user_id);

        if (!refresh_token?.success || !access_token?.success) return 401;
    
        return {
            success: true,
            info: {
                access_token: access_token.token,
                refresh_token: refresh_token?.result?.refresh_token,
                payload
            },
            message: "Signed in successfully!"
        }
    }
    catch(error) {
        console.log(error);

        return {
            success: false,
            message: "Wrong in server action login!",
            info_admin: null
        }
    }
}

export const logout = async () => {
    try {
        const refresh_token = cookies().get("access-admin")?.value;

        const response = await fetch(`${ process.env.API_SERVER }/auth/logout`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(refresh_token ? { refresh_token, } : {}),
            cache: "no-cache"
        });
        const logoutStatus = await response.json();

        if (logoutStatus?.success) {
            cookies().delete("access-admin");
            cookies().delete("refresh-admin");
        }
        else console.log(logoutStatus);

        return logoutStatus;
    }
    catch(error) {
        console.log(error);
        return {
            success: false,
            message: "Sign out failed!",
        }
    }
}