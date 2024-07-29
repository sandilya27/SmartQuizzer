import { v4 as uuidv4 } from "uuid";

import { db } from "@/lib/db";
import { getVerificationTokenByEmail } from "@/data/verification-token";

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