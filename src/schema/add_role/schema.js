"use client"

import { z } from "zod";

const addRoleSchema = z.object({
    role: z.string().min(4, {
        message: "Must be 4 or more characters long!"
    }),
    permissions: z.array(z.string()).refine((value) => value.some((permission) => permission), {
        message: "You have to select at least one permission.",
    }),
});

export default addRoleSchema;