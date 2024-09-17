"use client"

import { useEffect, useContext } from "react";
import { TokenContext } from "@/contexts/TokenProvider";
import { useRouter } from "next/navigation";

import modify_cookies_action from "@/actions/ReuseTasks/cookies/modify_cookies";
import update_info_user from "@/actions/ReuseTasks/user/update_info_user";

export default function WrapperModifyStuff({ children, exp, decode, token }) {
    const router = useRouter();
    const { setTokens } = useContext(TokenContext);

    useEffect(() => {
        (async () => {
            if (exp) {
                const oneYearFromNow = new Date();
                oneYearFromNow.setFullYear(oneYearFromNow.getFullYear() + 1);
        
                await modify_cookies_action(
                    {
                        name: "access-admin",
                        value: token,
                        path: "/",
                        httpOnly: true,
                        expires: oneYearFromNow
                    },
                    "set"
                );
                
                setTokens((old) => ({...old, access_token: token}));
                await update_info_user(decode?.user_id, token, router);
            }
        })();
    }, []);

    return (
        <>
            { children }
        </>
    )
}