"use server";

import { z } from "zod";
import { AuthError } from "next-auth";

import { signIn } from '@/auth';
import { LoginSchema } from "@/schemas";
import { DEFAULT_LOGIN_REDIRECT } from "@/routes";
import { db } from "@/lib/db";
import { generateVerificationToken } from "@/lib/tokens";
import { sendVerificationEmail } from "@/lib/mail";


type LoginSchemaType = z.infer<typeof LoginSchema>;

export const login = async (values: LoginSchemaType) => {
    const validatedFields = LoginSchema.safeParse(values);

    if (!validatedFields.success) {
        return { error: "Invalid fields!" };
    }

    const { email, password } = validatedFields.data;

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

    try {
        await signIn("credentials", {
            email,
            password,
            redirectTo: DEFAULT_LOGIN_REDIRECT,
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