import type { ICandidateRes, ICreateInput, IDataRes, IDataResponse, IStandardResponse } from "../model/model";
import apiClient from "./candidateService";

export const EEndpoint = {
    CREATE: "/create",
    VIEW: "/view",
    UPDATE: "/update",
    DELETE: "/delete",
    VALIDATE: "/validate",
    GET_ALL: "/all/candidates"
} as const;

export interface QueryParamsOptions {
    page: number;
    limit: number;
    filters?: {
        name?: string;
        email?: string;
        status?: string;
        phone?: string;
    };
    sort?: any;
}
export const api = {
    candidateList: async (query: QueryParamsOptions) => {
        try {
            const { data } = await apiClient.get<IDataResponse<ICandidateRes[]>>(
                EEndpoint.GET_ALL,
                { params: query }
            );
            return data;
        } catch (err: any) {
            throw new Error(err);
        }
    },
    createCandidate: async (payload: ICreateInput) => {
        try {
            const { data } = await apiClient.post<IDataRes>(
                EEndpoint.CREATE, payload
            );
            return data;
        } catch (err: any) {
            throw new Error(err);
        }
    },
    updateCandidate: async (_id: string, payload: Partial<ICreateInput>) => {
        try {
            const { data } = await apiClient.put<IDataRes>(
                `${EEndpoint.UPDATE}/${_id}`, payload
            );
            return data;
        } catch (err: any) {
            throw new Error(err);
        }
    },
    deleteCandidate: async (_id: string) => {
        try {
            const { data } = await apiClient.delete<IDataRes>(
                `${EEndpoint.DELETE}/${_id}`,
            );
            return data;
        } catch (err: any) {
            throw new Error(err);
        }
    },
    viewCandidate: async (_id: string) => {
        try {
            const { data } = await apiClient.get<IStandardResponse<ICandidateRes>>(
                `${EEndpoint.VIEW}/${_id}`,
            );
            return data;
        } catch (err: any) {
            throw new Error(err);
        }
    },
    validateCandidate: async (_id: string) => {
        try {
            const { data } = await apiClient.patch<IDataRes>(
                `${EEndpoint.VALIDATE}/${_id}`,
            );
            return data;
        } catch (err: any) {
            throw new Error(err);
        }
    },

}