"use server";

import { z } from "zod";
import bcrypt from "bcryptjs";

import { db } from "@/lib/db";
import { NewPasswordSchema } from "@/schemas";
import { getPasswordResetTokenByToken } from "@/data/password-reset-token";


type NewPasswordSchemaType = z.infer<typeof NewPasswordSchema>;

export const newPassword = async (
    values: NewPasswordSchemaType,
    token?: string | null
) => {
    if (!token) return { error: "Missing token!" };

    const validatedFields = NewPasswordSchema.safeParse(values);

    if (!validatedFields.success) {
        return { error: "Invalid fields!" };
    }

    const { password } = validatedFields.data;

    const exsistingToken = await getPasswordResetTokenByToken(token);

    if (!exsistingToken) {
        return { error: "Invalid token!" };
    }

    const hasExpired = new Date(exsistingToken.expires) < new Date();

    if (hasExpired) {
        return { error: "Token has expired!" }
    }

    const exsistingUser = await db.user.findUnique({
        where: {
            email: exsistingToken.email,
        }
    });

    if (!exsistingUser) {
        return { error: "Email doesn't exsist!" };
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    await db.user.update({
        where: { id: exsistingUser.id },
        data: { password: hashedPassword }
    })

    await db.passwordResetToken.delete({
        where: { id: exsistingToken.id }
    });

    return { success: "Password updated!" };
}