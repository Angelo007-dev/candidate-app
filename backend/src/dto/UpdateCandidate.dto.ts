import { z } from 'zod';
import { createCandidateSchema } from './CreateCandidate.dto';

export const updateCandidateSchema = createCandidateSchema.partial().extend({
    rejectionReason: z.string().optional(),
});

export type UpdateCandidateDto = z.infer<typeof updateCandidateSchema>;