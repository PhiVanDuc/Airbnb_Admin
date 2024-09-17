"use server"

import { cookies } from "next/headers";

const modify_cookies_action = async (data, action) => {
    try {
        if (action === "set") {
            cookies().set(data);
        }
        else if (action === "set_multi") {
            cookies().set(data.access);
            cookies().set(data.refresh);
        }
    }
    catch(error) {
        console.log("Set cookies error: ", error);
    }
}

export default modify_cookies_action;