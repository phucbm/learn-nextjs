'use client';

import {lusitana} from '@/app/ui/fonts';
import {AtSymbolIcon, KeyIcon,} from '@heroicons/react/24/outline';
import {ArrowRightIcon} from '@heroicons/react/20/solid';
import {Button} from '@/components/ui/button';
import {useActionState} from 'react';
import {authenticate, AuthState, githubSignIn} from "@/app/lib/auth/actions";
import {Github} from "lucide-react";

export default function LoginForm() {
    const initialState: AuthState = {
        message: '',
        errors: {},
        formValues: {
            email: '',
            password: ''
        }
    };
    const [state, formAction, isPending] = useActionState(authenticate, initialState);

    return (
        <>
            <form action={formAction} className="space-y-3">
                <div className="flex-1 rounded-lg bg-gray-50 px-6 pb-4 pt-8">
                    <h1 className={`${lusitana.className} mb-3 text-2xl`}>
                        Please log in to continue.
                    </h1>
                    <div className="w-full">
                        <div>
                            <label
                                className="mb-3 mt-5 block text-xs font-medium text-gray-900"
                                htmlFor="email"
                            >
                                Email (user@nextmail.com)
                            </label>
                            <div className="relative">
                                <input
                                    className="peer block w-full rounded-md border border-gray-200 py-[9px] pl-10 text-sm outline-2 placeholder:text-gray-500"
                                    id="email"
                                    type="text"
                                    name="email"
                                    placeholder="Enter your email address"
                                    defaultValue={state.formValues?.email || ''}
                                />
                                <AtSymbolIcon
                                    className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900"/>
                            </div>
                            <div id="email-error" aria-live="polite" aria-atomic="true">
                                {state.errors?.email &&
                                    state.errors.email.map((error: string) => (
                                        <p className="mt-2 text-sm text-red-500" key={error}>
                                            {error}
                                        </p>
                                    ))}
                            </div>
                        </div>
                        <div className="mt-4">
                            <label
                                className="mb-3 mt-5 block text-xs font-medium text-gray-900"
                                htmlFor="password"
                            >
                                Password (123456)
                            </label>
                            <div className="relative">
                                <input
                                    className="peer block w-full rounded-md border border-gray-200 py-[9px] pl-10 text-sm outline-2 placeholder:text-gray-500"
                                    id="password"
                                    type="password"
                                    name="password"
                                    placeholder="Enter password"
                                />
                                <KeyIcon
                                    className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900"/>
                            </div>
                            <div id="password-error" aria-live="polite" aria-atomic="true">
                                {state.errors?.password &&
                                    state.errors.password.map((error: string) => (
                                        <p className="mt-2 text-sm text-red-500" key={error}>
                                            {error}
                                        </p>
                                    ))}
                            </div>
                        </div>
                    </div>

                    <div className="flex flex-col gap-3">
                        <Button className="mt-4 w-full" aria-disabled={isPending}>
                            Log in <ArrowRightIcon className="ml-auto h-5 w-5 text-gray-50"/>
                        </Button>
                        {/*<Link*/}
                        {/*    className="flex h-10 items-center rounded-lg bg-gray-100 px-4 text-sm font-medium text-gray-600 transition-colors hover:bg-gray-200"*/}
                        {/*    href="/sign-up">*/}
                        {/*    Create an account*/}
                        {/*    <UserPlusIcon className="ml-auto h-5 w-5 text-gray-600"/>*/}
                        {/*</Link>*/}
                    </div>

                </div>
            </form>
            <form action={githubSignIn} className="text-center p-6">
                <p className="mb-4">or</p>
                <Button type="submit" className="w-full">
                    Sign in with GitHub
                    <Github className="ml-auto h-5 w-5 text-gray-50"/>
                </Button>
            </form>
        </>
    )
        ;
}