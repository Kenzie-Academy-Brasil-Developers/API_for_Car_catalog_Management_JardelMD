import { z } from "zod";

export const carSchema = z.object({
    id: z.string(),
    name: z.string().min(1),
    description: z.string().min(1).nullable(),
    brand: z.string().min(1),
    year: z.number().positive(),
    km: z.number().positive(),
    userId: z.string().min(1).optional().nullable()
});

export const carCreateSchema = carSchema.omit({ id: true });

export const carUpdateSchema = carCreateSchema.partial();

export type TCar = z.infer<typeof carSchema>;

export type TCarCreateBody = z.infer<typeof carCreateSchema>;

export type TCarUpdateBody = {
    name?: string;
    description?: string | null;
    brand?: string;
    year?: number;
    km?: number;
    userId?: string
};
