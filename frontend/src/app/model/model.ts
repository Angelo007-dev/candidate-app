import { z } from "zod";

export interface IDataResponse<T> {
    success: boolean;
    data: {
        data: Array<T>;
        meta: {
            total: number;
            page: number;
            limit: number;
            totalPage: number;
        };
    }
    timestamp: string;
}

export interface IDataRes {
    success: boolean;
    data: { message: string }
    timestamp: string;
}

export interface ICreateInput {
    name: string;
    email: string;
    phone: string;
}

export interface ICandidateRes {
    _id: string;
    name: string;
    email: string;
    phone: string;
    status: string;
    createdAt: string;
    updatedAt: string;
    __v: number
}
export const CandidateSchema = z.object({
    name: z.string().nonempty("Le nom est obligatoire"),
    email: z.string().email("Email invalide"),
    phone: z.string().nonempty("le téléphone est obligatoire"),
});
export type CandidateFormValues = z.infer<typeof CandidateSchema>;