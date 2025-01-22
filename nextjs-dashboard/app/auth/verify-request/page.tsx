// app/auth/verify-request/page.tsx
export default function VerifyRequestPage() {
    return (
        <div className="flex min-h-screen items-center justify-center">
            <div className="max-w-md text-center">
                <h1 className="text-2xl font-bold">Check your email</h1>
                <p className="mt-4">
                    A sign in link has been sent to your email address.
                    Please check your inbox and click the link to continue.
                </p>
            </div>
        </div>
    );
}