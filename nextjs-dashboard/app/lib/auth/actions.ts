'use server';
import {AuthError} from "next-auth";
import {z} from "zod";
import {signIn} from "@/auth";

const SignUpSchema = z.object({
    id: z.string(),
    email: z.string({
        invalid_type_error: 'Please enter a valid email address.',
        required_error: 'Email is required',
    })
        .email('Invalid email address format')  // Validates proper email format
        .min(5, 'Email must be at least 5 characters')
        .max(100, 'Email must be less than 100 characters'),

    password: z.string({
        required_error: 'Password is required',
    })
        .min(8, 'Password must be at least 8 characters')
        .max(100, 'Password must be less than 100 characters')
        .regex(/[A-Z]/, 'Password must contain at least one uppercase letter')
        .regex(/[a-z]/, 'Password must contain at least one lowercase letter')
        .regex(/[0-9]/, 'Password must contain at least one number')
        .regex(/[^A-Za-z0-9]/, 'Password must contain at least one special character')
});
const LogInSchema = z.object({
    email: z.string({
        invalid_type_error: 'Please enter a valid email address.',
        required_error: 'Email is required',
    })
        .email('Invalid email address format'),
    password: z.string({
        required_error: 'Password is required',
    })
        .min(1, 'Password is required')
});

export type AuthState = {
    errors?: {
        email?: string[];
        password?: string[];
    };
    message?: string | null;
};

export async function authenticate(
    prevState: AuthState,
    formData: FormData,
) {
    // Validate form fields using Zod
    const validatedFields = LogInSchema.safeParse({
        email: formData.get('email'),
        password: formData.get('password')
    });

    // If form validation fails, return errors early. Otherwise, continue.
    if (!validatedFields.success) {
        console.log(`Error: ${validatedFields.error.flatten().fieldErrors}`);
        return {
            errors: validatedFields.error.flatten().fieldErrors,
            message: 'Missing Fields. Failed to Log In.',
        };
    }

    // Prepare data for insertion into the database
    const {email, password} = validatedFields.data;
    console.log(`Email: ${email}, Password: ${password}`);

    try {
        await signIn('credentials', formData);
    } catch (error) {
        if (error instanceof AuthError) {
            switch (error.type) {
                case 'CredentialsSignin':
                    return {
                        message: 'Invalid email or password.',
                        errors: {
                            email: ['Invalid email'],
                            password: ['Invalid password.'],
                        },
                    };
                default:
                    return {
                        message: 'Failed to Log In.',
                        error
                    };
            }
        }

        throw error;
    }

    return {
        message: 'Database Error: Failed to Log In.',
    };
}