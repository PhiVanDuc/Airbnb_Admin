"use server"

import { redirect } from "next/navigation";
import { revalidateTag } from "next/cache";
import refresh_access_token from "./ReuseTasks/token/refresh_access_token";

export const get_users = async (page, limit) => {
    try {
        const refresh = await refresh_access_token();
        const { exp, decode: { decode }, accessToken } = refresh;

        if (!page || isNaN(+page) || +page < 0) page = 1;
        if (!limit || isNaN(+limit) || limit < 0) limit = 10;
    
        const response = await fetch(`${ process.env.API_SERVER }/users?page=${page}&limit=${limit}`, {
            headers: {
                "Authorization": `Bearer ${accessToken}`
            },
            next: {
                tags: ["get_users"],
            }
        });
        if (response.status === 401) return 401;
    
        const result = await response.json();
        return {
            result,
            exp,
            decode,
            accessToken
        }
    }
    catch(error) {
        console.log(error);

        return {
            success: false,
            message: "Error from get users front end!",
            client: true
        }
    }
}

export const profile = async (user_id, access_token) => {
    try {
        const response = await fetch(`${process.env.API_SERVER}/users/profile`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${access_token}`
            },
            body: JSON.stringify({ user_id }),
            cache: "no-cache"
        });
        
        if (response.status === 401) {
            console.log(await response.json());
            return 401;
        } 
        
        return await response.json();
    }
    catch (error) {
        console.log(error);
        return {
            success: false,
            message: "Call api failed in client component!",
            user: null
        }
    }
}

export const assign_roles = async (values, access_token) => {
    try {
        const response = await fetch(`${process.env.API_SERVER}/users/assign_roles`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${access_token}`
            },
            body: JSON.stringify(values),
            next: {
                tags: ["assign_roles"]
            }
        });

        if (response.status === 401) return 401;

        revalidateTag("assign_roles");
        revalidateTag("get_users");
        return await response.json();
    }
    catch (error) {
        console.log(error);
        return {
            success: false,
            message: "Error from assign roles front end!",
            client: true
        }
    }
}
