"use client"

import { encrypt } from "@/lib/jwt";

const set_info_user = async (obj) => {
    const jwt = await encrypt({
        id: obj?.user?.id,
        image: obj?.user?.image,
        fullname: obj?.user?.fullname,
        email: obj?.user?.email,
        roles: obj?.user?.roles
    });

    localStorage.setItem("info_admin", jwt);
}

export default set_info_user;