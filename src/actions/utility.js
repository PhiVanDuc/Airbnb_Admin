"use server"

import { revalidateTag } from "next/cache";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import refresh_access_token from "./ReuseTasks/token/refresh_access_token";

export const get_utilities = async (page, limit, utility_type = null, all = false) => {
    try {
        const refresh = await refresh_access_token();
        const { exp, decode: { decode }, accessToken } = refresh;
        
        if (!page || isNaN(+page) || +page < 0) page = 1;
        if (!limit || isNaN(+limit) || limit < 0) limit = 10;

        const arrType = ["favorite", "standout", "safety"];

        const response = await fetch(`${ process.env.API_SERVER }/utilities?page=${page}&limit=${limit}&type=${utility_type ? arrType.includes(utility_type) ? utility_type : "favorite" : "favorite"}`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${ accessToken }`
            },
            body: JSON.stringify({ all }),
            next: {
                tags: ["get_utilities"]
            },
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
            message:"Error from get utilities front end!",
            client: true
        }
    }
}

export const detail_utility = async (utility_id, token) => {
    try {
        const refresh = await refresh_access_token();
        const { exp, decode: { decode }, accessToken } = refresh;

        const response = await fetch(`${process.env.API_SERVER}/utilities/detail_utility?utility_id=${utility_id}`, {
            headers: {
                "Authorization": `Bearer ${token}`
            },
            next: {
                tags: ["detail_utility"]
            }
        });

        if (response?.status === 401) return 401;
        revalidateTag("detail_utility");
        
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
            message:"Error from detail utility front end!",
            client: true
        }
    }
}

export const add_utility = async (values, token) => {
    try {
        const response = await fetch(`${process.env.API_SERVER}/utilities/add`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
            },
            body: JSON.stringify(values),
            next: {
                tags: ["add_utility"]
            }
        });
    
        if (response?.status === 401) return 401;

        revalidateTag("get_utilities");
        
        return await response.json();
    }
    catch(error) {
        console.log(error);
        return {
            success: false,
            message:"Error from add utility front end!",
            client: true
        }
    }
}

export const edit_utility = async (utility_id, values, token = null) => {
    try {
        const access_token = cookies().get("access-admin")?.value;

        const response = await fetch(`${process.env.API_SERVER}/utilities/edit?utility_id=${utility_id}`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token || access_token}`
            },
            body: JSON.stringify(values),
            next: {
                tags: ["edit_utility"]
            }
        });
    
        if (response?.status === 401) redirect("/sign-out");
        revalidateTag("edit_utility");
        revalidateTag("get_utilities");

        return await response.json();
    }
    catch(error) {
        console.log(error);
        return {
            success: false,
            message:"Error from edit utility front end!",
            client: true
        }
    }
}

export const delete_utility = async (id, token) => {
    try {
        const response = await fetch(`${process.env.API_SERVER}/utilities/delete`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
            },
            body: JSON.stringify({ utility_id: id }),
            next: {
                tags: ["delete_utility"]
            }
        });
    
        if (response?.status === 401) redirect("/sign-out");
        revalidateTag("get_utilities");
        revalidateTag("delete_utility");

        return await response.json();
    }
    catch(error) {
        console.log(error);
        return {
            success: false,
            message:"Error from delete utility front end!",
            client: true
        }
    }
}