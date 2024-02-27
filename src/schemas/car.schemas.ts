import { z } from "zod";

export const carSchema = z.object({
    id: z.string().min(1),
    name: z.string().min(1),
    description: z.string().min(1).optional(),
    brand: z.string().min(1),
    year: z.number().positive(),
    km: z.number().positive()
});

export const carCreateSchema = carSchema.omit({ id: true });

export const carUpdateSchema = carSchema.omit({ id: true });

export type TCar = z.infer<typeof carSchema>;

export type TCarCreateBody = z.infer<typeof carCreateSchema>;

export type TCarUpdateBody = z.infer<typeof carUpdateSchema>;
