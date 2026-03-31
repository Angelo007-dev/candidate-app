export const ECandidateStatus = {
    VALIDATE: 'validate',
    PENDING: 'pending',
} as const;

export type TCandidatetatus = typeof ECandidateStatus[keyof typeof ECandidateStatus];