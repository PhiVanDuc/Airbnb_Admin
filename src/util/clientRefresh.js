"use client"

import refresh_access_token from "@/actions/ReuseTasks/token/refresh_access_token";
import update_info_user from "@/actions/ReuseTasks/user/update_info_user";

const clientRefresh = async (obj) => {
    const { router, setTokens } = obj;

    const refresh = await refresh_access_token(true);
    if (refresh === 401) {
        router.replace("/sign-out");
        return;
    }

    if (refresh.exp) await update_info_user(refresh?.decode?.decode?.user_id, refresh?.accessToken, router);
    setTokens(old => ({...old, access_token: refresh?.accessToken}));

    return refresh;
}

export default clientRefresh;