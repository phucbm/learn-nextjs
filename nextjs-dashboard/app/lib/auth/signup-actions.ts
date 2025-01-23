'use server';

import {z} from "zod";
import {signIn} from "@/auth";
import {createTempUser} from "@/app/lib/auth/create-temp-user";

const SignUpSchema = z.object({
    email: z.string({
        invalid_type_error: 'Please enter a valid email address.',
        required_error: 'Email is required',
    })
        .email('Invalid email address format'),
    password: z.string({
        required_error: 'Password is required',
    })
        .min(8, 'Password must be at least 8 characters'),
    rePassword: z.string({
        required_error: 'Please confirm your password',
    })
}).refine((data) => data.password === data.rePassword, {
    message: "Passwords don't match",
    path: ["rePassword"],
});

export async function handleSignUp(
    prevState: unknown,
    formData: FormData,
) {
    const validatedFields = await SignUpSchema.safeParseAsync({
        email: formData.get('email'),
        password: formData.get('password'),
        rePassword: formData.get('re-password')
    });

    if (!validatedFields.success) {
        return {
            errors: validatedFields.error.flatten().fieldErrors,
            message: 'Please fix the errors below.',
            formValues: {email: formData.get('email')}
        };
    }

    const {email, password} = validatedFields.data;

    try {
        // Store credentials temporarily with an expiration
        await createTempUser({email, password});

        // Send verification email
        await signIn('email', {
            email,
            redirect: false,
        });

        return {
            message: 'Verification email sent! Please check your inbox.',
            formValues: {email}
        };
    } catch (error) {
        return {
            message: error instanceof Error ? error.message : 'Something went wrong',
            formValues: {email}
        };
    }
}