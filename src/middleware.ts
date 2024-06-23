import { NextResponse } from "next/server";
import { NextRequest } from "next/server";


export function middleware(req: NextRequest) {
    const url = new URL(req.url);
    const path = url.pathname;
    const token = req.cookies.get('token');

    if (!path.startsWith('/administrator/login') && path.startsWith('/administrator') && !token) {
        return NextResponse.redirect(new URL('/administrator/login', req.url));
    }


    return NextResponse.next();
}

export const config = {
    matcher: ["/administrator/:path*"],
};