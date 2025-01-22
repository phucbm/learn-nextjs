import { sql } from '@vercel/postgres';
import bcrypt from 'bcrypt';

export async function createTempUser({
                                         email,
                                         password
                                     }: {
    email: string;
    password: string;
}) {
    // Check if email already exists in main users table
    const existingUser = await sql`
    SELECT email FROM users WHERE email = ${email}
  `;

    if (existingUser.rows.length > 0) {
        throw new Error('Email already registered');
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    // Format the date as ISO string for PostgresSQL
    const expiresAt = new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString();

    // Store in temporary users table
    await sql`
    INSERT INTO temp_users (email, password, expires_at)
    VALUES (${email}, ${hashedPassword}, ${expiresAt}::timestamp with time zone)
    ON CONFLICT (email) 
    DO UPDATE SET 
      password = ${hashedPassword},
      expires_at = ${expiresAt}::timestamp with time zone
  `;
}
