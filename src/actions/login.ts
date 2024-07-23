"use server";

import { z } from "zod";

import { LoginSchema } from "@/schemas";

type LoginSchemaType = z.infer<typeof LoginSchema>;

export const login = (values: LoginSchemaType) => {
    const validatedFields = LoginSchema.safeParse(values);

    if (!validatedFields.success) {
        return { error: "Invalid fields!" };
    }

    return {success : "Email sent"};
}