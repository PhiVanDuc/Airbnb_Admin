"use client"

import z from "zod";

const categorySchema = z.object({
    category_name: z.string().min(3, {
        message: "Must be 3 or more characters long!"
    }),
    category_type: z.string().min(1, {
        message: "Please select category type!"
    }),
    icon: z.string().min(1, {
        message: "Please choose icon for category!"
    }),
    prefix_icon: z.string()
});

export default categorySchema;