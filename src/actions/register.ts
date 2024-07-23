"use server";

import { z } from "zod";
import bcrypt from "bcryptjs";

import { db } from "@/lib/db";
import { RegisterSchema } from "@/schemas";

type RegisterSchemaType = z.infer<typeof RegisterSchema>;

export const register = async (values: RegisterSchemaType) => {
    const validatedFields = RegisterSchema.safeParse(values);

    if (!validatedFields.success) {
        return { error: "Invalid fields!" };
    }

    const { email, password, name } = validatedFields.data;
    const hashedPassword = await bcrypt.hash(password, 10);

    const exsistingUser = await db.user.findUnique({
        where: {
            email,
        }
    });

    if (exsistingUser) {
        return { error: "Email already in use!" };
    }

    await db.user.create({
        data: {
            name,
            email,
            password: hashedPassword
        }
    });

    //TODO: Send verification token email

    return { success: "User created!" };
}