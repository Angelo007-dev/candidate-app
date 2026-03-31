import { z } from 'zod';

export const createCandidateSchema = z.object({
    name: z.string().min(2, "Le nom doit contenir au moins 2 caractères"),
    email: z.string().email("Format d'email invalide"),
    phone: z.string()
        .transform((val) => val.replace(/[\s\.\-]/g, ''))
        .refine((val) => /^\+?[0-9]{10,15}$/.test(val), {
            message: "Format de téléphone invalide",
        }), status: z.enum(['pending', 'interviewed', 'hired', 'rejected']).optional().default('pending'),
});

export type CreateCandidateDto = z.infer<typeof createCandidateSchema>;