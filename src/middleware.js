import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { decode_token } from './actions/token';

export async function middleware(req) {
    const pathname = req.nextUrl.pathname;
    const access_token = cookies().get("access-admin")?.value;
    const refresh_token = cookies().get("refresh-admin")?.value;

    if (pathname.startsWith("/sign-in")) {
        if (access_token) return NextResponse.redirect(new URL("/", req.url));

        const url_token = req.nextUrl.searchParams.get("url_token");
        if (!url_token) {
            console.log("/sign-in --- !url_token");
            
            const response = NextResponse.redirect(new URL("/", process.env.AIRBNB_USER_PAGE_URL));
            return response;
        }
    }
    else if (!pathname.startsWith("/sign-out") && !pathname.startsWith("/sign-in")) {
        if (!access_token || !refresh_token) {
            console.log("access_token: ", access_token);
            console.log("refresh_token: ", refresh_token);
            console.log("!access_token || !refresh_token");

            return NextResponse.redirect(new URL("/sign-out", req.url));
        }
        else {
            const decode = await decode_token(access_token);

            if (!decode?.success && decode?.error && !decode?.error?.expiredAt) {
                console.log("!decode?.success && decode?.error && !decode?.error?.expiredAt");
                return NextResponse.redirect(new URL("/sign-out", req.url));
            }
        }
    }

    return NextResponse.next();
}

export const config = {
    matcher: ['/((?!api|_next/static|_next/image|logo.png|favicon.ico).*)',],
}