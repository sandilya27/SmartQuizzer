import { v4 as uuidv4 } from "uuid";
import crypto from "crypto";

import { db } from "@/lib/db";
import { getVerificationTokenByEmail } from "@/data/verification-token";
import { getPasswordResetTokenByEmail } from "@/data/password-reset-token";
import { getTwoFactorTokenByEmail } from "@/data/two-factor-token";

export const generateTwoFactorToken = async (email: string) => {
    const token = crypto.randomInt(100000, 1000000).toString();
    const expires = new Date(new Date().getTime() + 300 * 1000);

    const exsistingToken = await getTwoFactorTokenByEmail(email);

    if (exsistingToken) {
        await db.twoFactorToken.delete({
            where: {
                id: exsistingToken.id
            }
        })
    }

    const twoFactorToken = await db.twoFactorToken.create({
        data: {
            email,
            token,
            expires
        }
    })

    return twoFactorToken;
}

export const generatePasswordResetToken = async (email: string) => {
    const token = uuidv4();
    const expires = new Date(new Date().getTime() + 3600 * 1000);

    const exsistingToken = await getPasswordResetTokenByEmail(email);

    if (exsistingToken) {
        await db.passwordResetToken.delete({
            where: {
                id: exsistingToken.id
            }
        })
    }

    const passwordResetToken = await db.passwordResetToken.create({
        data: {
            email,
            token,
            expires
        }
    })

    return passwordResetToken;
}

export const generateVerificationToken = async (email: string) => {
    const token = uuidv4();
    const expires = new Date(new Date().getTime() + 3600 * 1000);

    const exsistingToken = await getVerificationTokenByEmail(email);

    if (exsistingToken) {
        await db.verificationToken.delete({
            where: {
                id: exsistingToken.id
            }
        })
    }

    const verificationToken = await db.verificationToken.create({
        data: {
            email,
            token,
            expires
        }
    })

    return verificationToken;
}