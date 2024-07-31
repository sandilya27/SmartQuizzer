"use server";

import { z } from "zod";
import { AuthError } from "next-auth";

import { signIn } from '@/auth';
import { LoginSchema } from "@/schemas";
import { DEFAULT_LOGIN_REDIRECT } from "@/routes";
import { db } from "@/lib/db";
import { generateVerificationToken, generateTwoFactorToken } from "@/lib/tokens";
import { sendVerificationEmail, sendTwoFactorTokenEmail } from "@/lib/mail";
import { getTwoFactorTokenByEmail } from "@/data/two-factor-token";
import { getTwoFactorConfirmationByUserId } from "@/data/two-factor-confirmation";


type LoginSchemaType = z.infer<typeof LoginSchema>;

export const login = async (values: LoginSchemaType) => {
    const validatedFields = LoginSchema.safeParse(values);

    if (!validatedFields.success) {
        return { error: "Invalid fields!" };
    }

    let { email, password, code } = validatedFields.data;

    // code=JSON.stringify(code);

    console.log({ code });
    console.log(typeof code);

    const exsistingUser = await db.user.findUnique({
        where: {
            email,
        }
    });

    if (!exsistingUser || !exsistingUser.email) {
        return { error: "Email dosen't exsist!" }
    }

    if (!exsistingUser.emailVerified) {
        const verificationToken = await generateVerificationToken(exsistingUser.email);

        await sendVerificationEmail(
            verificationToken.email,
            verificationToken.token
        );

        return { success: "Confirmation email sent!" };
    }

    if (exsistingUser.isTwoFactorEnabled && exsistingUser.email) {
        if (code) {
            const twoFactorToken = await getTwoFactorTokenByEmail(
                exsistingUser.email
            )

            if (!twoFactorToken) {
                return { error: "Invalid code!" }
            }

            if (twoFactorToken.token !== code) {
                return { error: "Invalid code!" }
            }

            const hasExpired = new Date(twoFactorToken.expires) < new Date();

            if (hasExpired) {
                return { error: "Code expired!" }
            }

            await db.twoFactorToken.delete({
                where: { id: twoFactorToken.id }
            })

            const exsistingConfirmation = await getTwoFactorConfirmationByUserId(exsistingUser.id);

            if (exsistingConfirmation) {
                await db.twoFactorConfirmation.delete({
                    where: { id: exsistingConfirmation.id }
                })
            }

            await db.twoFactorConfirmation.create({
                data: {
                    userId: exsistingUser.id,
                }
            })
        } else {
            const twoFactorToken = await generateTwoFactorToken(exsistingUser.email);
            await sendTwoFactorTokenEmail(
                twoFactorToken.email,
                twoFactorToken.token
            );

            return { twoFactor: true };
        }

    }

    try {
        await signIn("credentials", {
            email,
            password,
            redirectTo: exsistingUser?.role === "STUDENT" ? "/student/dashboard" : "/teacher/dashboard",
        })
    } catch (error) {
        if (error instanceof AuthError) {
            if (error.type == "CredentialsSignin") {
                return { error: "Invalid credentials!" }
            } else {
                return { error: "Something went wrong" }
            }
        }

        throw error;
    }
};