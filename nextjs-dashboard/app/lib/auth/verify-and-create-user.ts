import {sql} from '@vercel/postgres';

export async function verifyAndCreateUser(email: string) {
    // Start a transaction
    await sql`BEGIN`;

    try {
        // Get temporary user data
        const tempUser = await sql`
            SELECT email, password
            FROM temp_users
            WHERE email = ${email}
              AND expires_at > NOW()
        `;

        if (tempUser.rows.length === 0) {
            throw new Error('Verification link expired or invalid');
        }

        // Create verified user
        await sql`
            INSERT INTO users (email, password, email_verified)
            VALUES (${tempUser.rows[0].email},
                    ${tempUser.rows[0].password},
                    ${true})
        `;

        // Delete temporary user
        await sql`
            DELETE
            FROM temp_users
            WHERE email = ${email}
        `;

        await sql`COMMIT`;
    } catch (error) {
        await sql`ROLLBACK`;
        throw error;
    }
}