'use server';
import {AuthError} from "next-auth";
import {z} from "zod";
import {signIn} from "@/auth";
import {getUser} from "@/app/lib/auth/get-user-by-email";

const LogInSchema = z.object({
    email: z.string({
        invalid_type_error: 'Please enter a valid email address.',
        required_error: 'Email is required',
    })
        .email('Invalid email address format')
        .superRefine(async (email, ctx) => {
            if (email) {  // Only check if previous validations passed
                const user = await getUser(email);

                if (!user) {
                    ctx.addIssue({
                        code: z.ZodIssueCode.custom,
                        message: 'This email is not registered.'
                    });
                }
            }
        }),
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
    message: string;
    formValues: {
        email: string;
        password?: string;
    };
};

export async function authenticate(
    prevState: AuthState,
    formData: FormData,
) {
    let email = formData.get('email') as string;
    // let password = formData.get('password') as string;

    // Validate form fields using Zod
    const validatedFields = await LogInSchema.safeParseAsync({
        email: formData.get('email'),
        password: formData.get('password')
    });

    // If form validation fails, return errors early. Otherwise, continue.
    if (!validatedFields.success) {
        console.log(`Error: ${validatedFields.error.flatten().fieldErrors}`);
        return {
            errors: validatedFields.error.flatten().fieldErrors,
            message: 'Missing Fields. Failed to Log In.',
            formValues: {email}
        };
    }

    // Prepare data for insertion into the database
    email = validatedFields.data.email;
    // password = validatedFields.data.password;
    // console.log(`Email: ${email}, Password: ${password}`);

    try {
        await signIn('credentials', formData);
    } catch (error) {
        if (error instanceof AuthError) {
            switch (error.type) {
                case 'CredentialsSignin':
                    return {
                        message: 'Invalid email or password.',
                        errors: {
                            email: email ? [] : ['Invalid email.'],
                            password: ['Invalid password.'],
                        },
                        formValues: {email}
                    };
                default:
                    return {
                        message: 'Failed to Log In.',
                        formValues: {email}
                    };
            }
        }

        throw error;
    }

    return {
        message: 'Database Error: Failed to Log In.',
        formValues: {email},
    };
}


export async function githubSignIn() {
    await signIn('github')
}