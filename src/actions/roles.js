"use server";

import { revalidateTag } from "next/cache";
import refresh_access_token from "./ReuseTasks/token/refresh_access_token";

export const get_roles = async (page, limit, all = false) => {
    try {
        const refresh = await refresh_access_token();
        const { exp, decode: { decode }, accessToken } = refresh;

        if (!page || isNaN(+page) || +page < 0) page = 1;
        if (!limit || isNaN(+limit) || limit < 0) limit = 10;

        const response = await fetch(`${ process.env.API_SERVER }/roles?page=${page}&limit=${limit}`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${ accessToken }`
            },
            body: JSON.stringify({ all }),
            next: {
                tags: ["get_roles"]
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
            message: "Error from get roles front end!",
            client: true
        }
    }
}

export const get_role = async (id) => {
    try {
        const refresh = await refresh_access_token();
        const { exp, decode: { decode }, accessToken } = refresh;

        const response = await fetch(`${ process.env.API_SERVER }/roles/${id}`, {
            headers: {
                "Authorization": `Bearer ${accessToken}`
            },
            next: {
                tags: ["get_role"]
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
            message: "Error from get role front end!",
        }
    }
}

export const add_role = async (values, access_token) => {
    try {
        const response = await fetch(`${ process.env.API_SERVER }/roles/add`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${access_token}`
            },
            body: JSON.stringify(values),
            cache: 'no-cache'
        });
        const result = await response.json();
        if (response.status === 401) return 401;
    
        if (result.success) revalidateTag("get_roles");
        
        return result;
    }
    catch(error) {
        console.log(error);
        return {
            success: false,
            message: "Error from add role front end!",
            client: true
        }
    }
}

export const edit_role = async (values, access_token) => {
    try {
        const response = await fetch(`${ process.env.API_SERVER }/roles/edit/${ values.id }`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${access_token}`
            },
            body: JSON.stringify(values),
            next: {
                tags: ["edit_role"]
            }
        });
        const result = await response.json();
        if (response.status === 401) return 401;
    
        if (result.success) {
            revalidateTag("get_roles");
            revalidateTag("edit_role");
            revalidateTag("get_role");
        }
    
        return result;
    }
    catch(error) {
        console.log(error);
        return {
            success: false,
            message: "Error from edit role front end!",
            client: true
        }
    }
}

export const delete_role = async (id, access_token) => {
    try {
        const response = await fetch(`${ process.env.API_SERVER }/roles/delete/${id}`, {
            method: "DELETE",
            headers: {
                "Authorization": `Bearer ${access_token}`
            },
            next: {
                tags: ["delete_role"]
            }
        });
        const result = await response.json();
        if (response.status === 401) return 401;
    
        if (result.success) revalidateTag("get_roles");
    
        return result;
    }
    catch(error) {
        console.log(error);
        return {
            success: false,
            message: "Error from delete role front end!",
            client: true
        }
    }
}