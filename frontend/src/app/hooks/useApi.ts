import { api, EEndpoint, type QueryParamsOptions } from "../service/candidateApi";
import { useQuery } from "@tanstack/react-query"

export const useList = (query: QueryParamsOptions) => {
    return useQuery({
        queryKey: [EEndpoint.GET_ALL, query],
        queryFn: () => api.candidateList(query),
        placeholderData: (previousData) => previousData,
    });
};