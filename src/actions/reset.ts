"use server";

import { z } from "zod";

import { ResetSchema } from "@/schemas";
import { db } from "@/lib/db";
import { sendPasswordRestEmail } from "@/lib/mail";
import { generatePasswordResetToken } from "@/lib/tokens";

type ResetSchemaType = z.infer<typeof ResetSchema>;

export const reset = async (values: ResetSchemaType) => {
    const validatedFields = ResetSchema.safeParse(values);

    if (!validatedFields.success) {
        return { error: "Invalid fields!" };
    }

    const { email } = validatedFields.data;

    const exsistingUser = await db.user.findUnique({
        where: {
            email,
        }
    });

    if (!exsistingUser) {
        return { error: "Email dosen't exsist!" };
    }

    const passwordResetToken = await generatePasswordResetToken(email);
    await sendPasswordRestEmail(
        passwordResetToken.email,
        passwordResetToken.token
    );

    return { success: "Reset email sent!" }
}