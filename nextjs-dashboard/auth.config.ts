import type {DefaultSession, NextAuthConfig} from 'next-auth';

declare module 'next-auth' {
    interface Session {
        user: {
            provider?: string | any; // Add the provider to the user object
            // ... other user properties
        } & DefaultSession['user'];
    }
}

export const authConfig = {
    pages: {
        signIn: '/auth/login',
    },
    callbacks: {
        authorized({auth, request: {nextUrl}}) {
            console.log('Authorized callback', auth, nextUrl);
            const isLoggedIn = !!auth?.user;

            const isOnDashboard = nextUrl.pathname.startsWith('/dashboard');
            if (isOnDashboard) {
                if (isLoggedIn) return true;
                return false; // Redirect unauthenticated users to login page
            } else if (isLoggedIn) {
                return Response.redirect(new URL('/dashboard', nextUrl));
            }
            return true;
        },
        async session({session, token}) {
            console.log('Session callback', session, token);
            if (session.user && token.provider) {
                session.user.provider = token.provider;
            }
            return session;
        },
        async jwt({token, account}) {
            console.log('JWT callback', account, token);
            if (account) {
                // Save the provider info to the token
                token.provider = account.provider;
            }
            return token;
        }
    },
    providers: [], // Add providers with an empty array for now
} satisfies NextAuthConfig;