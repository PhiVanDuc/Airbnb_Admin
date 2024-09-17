"use server"

import { cookies } from "next/headers";

import { decode_token, refresh_token } from "@/actions/token";

const refresh_access_token = async (client = false) => {
    const accessToken = cookies().get("access-admin")?.value;
    const refreshToken = cookies().get("refresh-admin")?.value;

    if (accessToken) {
        const decode = await decode_token(accessToken);

        // Token không hết hạn
        if (decode?.success) {
            // console.log("Token không hết hạn");

            return {
                exp: false,
                decode,
                accessToken
            }
        }

        // Token sai định dạng
        else if (!decode?.success && decode?.error && !decode?.error?.expiredAt) return 401;

        // Token hết hạn
        else if (!decode?.success && decode?.error && decode?.error?.expiredAt) {
            // console.log("Token hết hạn - chưa vào client");

            const refresh = await refresh_token(refreshToken);
            if (!refresh?.success) return 401;

            if (refresh.success && client) {
                console.log("Token hết hạn - đã vào client");

                const oneYearFromNow = new Date();
                oneYearFromNow.setFullYear(oneYearFromNow.getFullYear() + 1);

                cookies().set({
                    name: "access-admin",
                    value: refresh?.access_token,
                    path: "/",
                    httpOnly: true,
                    expires: oneYearFromNow
                });
            }

            const decode = await decode_token(refresh?.access_token);
            return {
                exp: true,
                decode,
                accessToken: refresh?.access_token
            };
        }
    }

    return null;
}

export default refresh_access_token;