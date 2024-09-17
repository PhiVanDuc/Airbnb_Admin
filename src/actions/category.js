"use server"

import { revalidateTag } from "next/cache";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

import refresh_access_token from "./ReuseTasks/token/refresh_access_token";

export const get_categories = async (page, limit, all = false) => {
    try {
        const refresh = await refresh_access_token();
        const { exp, decode: { decode }, accessToken } = refresh;

        if (!page || isNaN(+page) || +page < 0) page = 1;
        if (!limit || isNaN(+limit) || limit < 0) limit = 10;

        const response = await fetch(`${ process.env.API_SERVER }/categories?page=${page}&limit=${limit}`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${ accessToken }`
            },
            body: JSON.stringify({ all }),
            next: {
                tags: ["get_categories"]
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
            message:"Failed fetch get categories!",
            client: true
        }
    }
}

export const detail_category = async (category_id) => {
    try {
        const refresh = await refresh_access_token();
        const { exp, decode: { decode }, accessToken } = refresh;

        const response = await fetch(`${process.env.API_SERVER}/categories/detail_category?category_id=${category_id}`, {
            headers: {
                "Authorization": `Bearer ${accessToken}`
            },
            cache: 'no-cache'
        });

        if (response?.status === 401) return 401;
        
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
            message:"Failed fetch detail category!",
            client: true
        }
    }
}

export const edit_category = async (category_id, values, token) => {
    try {
        const response = await fetch(`${process.env.API_SERVER}/categories/edit?category_id=${category_id}`, {
            method: "POST",
            headers: {
                "Authorization": `Bearer ${token}`,
                "Content-Type": "application/json",
            },
            body: JSON.stringify(values),
            next: {
                tags: ["edit_category"]
            }
        });
    
        if (response?.status === 401) return 401;
        revalidateTag("edit_category");
        revalidateTag("get_categories");

        return await response.json();
    }
    catch(error) {
        console.log(error);
        return {
            success: false,
            message:"Failed fetch edit category!",
            client: true
        }
    }
}

export const add_category = async (values, token) => {
    try {
        const response = await fetch(`${process.env.API_SERVER}/categories/add`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
            },
            body: JSON.stringify(values),
            next: {
                tags: ["add_category"]
            }
        });
    
        if (response?.status === 401) redirect("/sign-out");

        revalidateTag("get_categories");
        return await response.json();
    }
    catch(error) {
        console.log(error);
        return {
            success: false,
            message:"Failed fetch add category!",
            client: true
        }
    }
}

export const delete_category = async (id, token = null) => {
    try {
        const access_token = cookies().get("access-admin")?.value;

        const response = await fetch(`${process.env.API_SERVER}/categories/delete`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token || access_token}`
            },
            body: JSON.stringify({ category_id: id }),
            next: {
                tags: ["delete_category"]
            }
        });
    
        if (response?.status === 401) redirect("/sign-out");

        revalidateTag("get_categories");
        revalidateTag("delete_category");
        return await response.json();
    }
    catch(error) {
        console.log(error);
        return {
            success: false,
            message:"Failed fetch delete category!",
            client: true
        }
    }
}