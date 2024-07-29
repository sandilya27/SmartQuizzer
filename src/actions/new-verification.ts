"use server";

import { db } from "@/lib/db";
import { getVerificationTokenByToken } from "@/data/verification-token";

export const newVerification = async (token: string) => {
    const exsistingToken = await getVerificationTokenByToken(token);

    if (!exsistingToken) {
        return { error: "Token dosen't exsist!" }
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
        return { error: "Email doesn't exsist!" }
    }

    await db.user.update({
        where: { id: exsistingUser.id },
        data: {
            emailVerified: new Date(),
            email: exsistingUser.email
        }
    });

    await db.verificationToken.delete({
        where: { id: exsistingToken.id }
    });

    return { success: "Email verified!" }
}