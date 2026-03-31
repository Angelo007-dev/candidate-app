export interface IDataResponse<T> {
    success: boolean;
    data: {
        data: Array<T>;
        meta: {
            total: number;
            page: number;
            limit: number;
            totalPages: number;
        };
    }
    timestamp: string;
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