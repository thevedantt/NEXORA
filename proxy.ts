import { clerkMiddleware, createRouteMatcher, clerkClient } from '@clerk/nextjs/server';
import { NextResponse } from 'next/server';

const isPublicRoute = createRouteMatcher(['/login', '/register', '/sign-in(.*)', '/sign-up(.*)', '/']);
const isLandingPage = createRouteMatcher(['/']);

export default clerkMiddleware(async (auth, req) => {
    const { userId } = await auth();
    const url = new URL(req.url);

    // 1. Handle Unauthenticated Users
    if (!userId && !isPublicRoute(req)) {
        return (await auth()).redirectToSignIn();
    }

    // 2. Handle Authenticated Users
    if (userId) {
        try {
            const client = await clerkClient();
            const user = await client.users.getUser(userId);
            const role = (user.publicMetadata.role as string)?.toUpperCase() || "VENDOR";
            const pathname = url.pathname;

            // SPECIAL CASE: If explicitly going to /admin, /vendor, or their API routes, LET THEM.
            // This allows Admins to test the Vendor dashboard without being redirected.
            if (pathname.startsWith('/admin') || pathname.startsWith('/vendor') || pathname.startsWith('/api/admin') || pathname.startsWith('/api/vendor')) {
                // Only block non-admins from /admin and /api/admin
                if ((pathname.startsWith('/admin') || pathname.startsWith('/api/admin')) && role !== "ADMIN") {
                    // Start absolute path check
                    if (pathname.startsWith('/api')) {
                        return NextResponse.json({ error: "Unauthorized" }, { status: 403 });
                    }
                    return NextResponse.redirect(new URL('/vendor', req.url));
                }
                return NextResponse.next();
            }

            // Handle legacy /dashboard path
            if (pathname === "/dashboard") {
                return NextResponse.redirect(
                    new URL(role === "ADMIN" ? "/admin" : "/vendor", req.url)
                );
            }

            // If logged in and hitting an AUTH page (sign-in/up), redirect to their primary dashboard
            if (isPublicRoute(req) && !isLandingPage(req)) {
                return NextResponse.redirect(
                    new URL(role === "ADMIN" ? "/admin" : "/vendor", req.url)
                );
            }

        } catch (error) {
            console.error("Middleware Error:", error);
        }
    }
});

export const config = {
    matcher: [
        '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
        '/(api|trpc)(.*)',
    ],
};
