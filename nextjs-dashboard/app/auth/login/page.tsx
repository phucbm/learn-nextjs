// app/login/email-sign-in.tsx
// 'use client';

import {signIn} from "@/auth";

export default function EmailSignIn() {
    return (
        <form
            action={async () => {
                "use server"
                await signIn("github")
            }}
        >
            <button type="submit">Sign in with GitHub</button>
        </form>
    );
}