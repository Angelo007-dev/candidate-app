import type { ICreateInput, IDataRes } from "../model/model";
import { queryClient } from "../queryClients";
import { api, EEndpoint, type QueryParamsOptions } from "../service/candidateApi";
import { useMutation, useQuery } from "@tanstack/react-query"
import { notify } from "../utils/notify";

export const useList = (query: QueryParamsOptions) => {
    return useQuery({
        queryKey: [EEndpoint.GET_ALL, query],
        queryFn: () => api.candidateList(query),
        placeholderData: (previousData) => previousData,
    });
};

export const useCreate = () => {
    return useMutation<IDataRes, Error, ICreateInput>({
        mutationKey: [EEndpoint.CREATE],
        mutationFn: (payload) => api.createCandidate(payload),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: [EEndpoint.GET_ALL] });
            notify.success('Candidat créer avec succèes');
        },
        onError: (e) => notify.error(e.message)
    });
}

export const useUpdate = () => {
    return useMutation<IDataRes, Error, {_id:string,payload:Partial<ICreateInput>}>({
        mutationKey: [EEndpoint.UPDATE],
        mutationFn: ({ _id, payload }) => api.updateCandidate(_id, payload),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: [EEndpoint.GET_ALL] });
            notify.success('Information candidat mise à jour');
        },
        onError: (e) => notify.error(e.message)
    });
}