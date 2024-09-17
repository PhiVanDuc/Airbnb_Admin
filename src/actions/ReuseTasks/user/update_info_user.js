"use client"

import { profile } from "@/actions/user";
import { encrypt } from "@/lib/jwt";
import filterInfo from "@/util/filterInfo";

import { toast } from "sonner";

const update_info_user = async (user_id, accessToken, router) => {
    const profile_user = await profile(user_id, accessToken);
    
    if (!profile_user?.success) {
        toast.error(profile_user?.message);
        return;
    }
    if (profile_user === 401) router.replace("/sign-out");

    const permissions = filterInfo(profile_user);
    // if (permissions?.length === 0) router.replace("/sign-out");

    const jwt = await encrypt({
        id: profile_user?.user?.id,
        image: profile_user?.user?.image,
        fullname: profile_user?.user?.fullname,
        email: profile_user?.user?.email,
        permissions
    });
    localStorage.setItem("info_admin", jwt);
}

export default update_info_user;