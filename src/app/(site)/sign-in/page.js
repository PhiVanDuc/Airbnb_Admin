import { login } from "@/actions/login";
import ClientComponent from "./ClientComponent";
import { redirect } from "next/navigation";

export default async function SignInPage({ searchParams }) {
    const { url_token } = searchParams;

    const result = await login(url_token);

    if (result === 401 || !result?.success) {
        console.log(result);
        redirect(process.env.AIRBNB_USER_PAGE_URL);
    }

    return <ClientComponent status={result?.success} access_token={result?.info?.access_token} refresh_token={result?.info?.refresh_token} />
}