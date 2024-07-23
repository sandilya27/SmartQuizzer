"use server";

import { z } from "zod";

import { RegisterSchema } from "@/schemas";

type RegisterSchemaType = z.infer<typeof RegisterSchema>;

export const register = async (values: RegisterSchemaType) => {
    const validatedFields = RegisterSchema.safeParse(values);

    if (!validatedFields.success) {
        return { error: "Invalid fields!" };
    }

    return {success : "Email sent"};
}