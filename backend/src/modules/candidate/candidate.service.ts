import { SortOrder } from "mongoose";
import { CreateCandidateDto } from "../../dto/CreateCandidate.dto";
import { QueryParamsDto } from "../../dto/QueryParamsDto";
import { UpdateCandidateDto } from "../../dto/UpdateCandidate.dto";
import candidateSchema from "./candidate.schema";

export const createCandidate = async (data: CreateCandidateDto) => {
    return await candidateSchema.create(data);
};


export const getCandidate = async (id: string) => {
    return await candidateSchema.findById(id).exec();
};

export const updateCandidate = async (id: string, data: UpdateCandidateDto) => {
    return await candidateSchema.findByIdAndUpdate(id, data, { new: true }).exec();
};


//soft delete with find
export const deleteCandidate = async (id: string) => {
    return await candidateSchema.findByIdAndUpdate(id, { deletedAt: new Date() }, { new: true }).exec();
};

export const validateCandidate = async (id: string) => {
    await new Promise(res => setTimeout(res, 2000));
    return await candidateSchema.findByIdAndUpdate(id, {
        status: "validate",
    }, { new: true }).exec();
};

export const listCandidates = async (dto: QueryParamsDto) => {
    const { limit, filters, page, sort } = dto;
    const sort_parsed: Record<string, SortOrder> = {}
    for (const key in sort) {
        const val = Number(sort[key]);
        if (val === 1 || val === -1) {
            sort_parsed[key] = val as SortOrder;
        }
    };

    const skip = (page - 1) * limit;
    const query: any = {
        deletedAt: null //ignore les supprimé
    };
    if (filters.name) query.name = { $regex: filters.name, $options: "i" };
    if (filters.email) query.email = { $regex: filters.email, $options: "i" };
    if (filters.phone) {
        const cleanPhone = filters.phone.replace(/[\s\.\-]/g, '');
        query.phone = { $regex: cleanPhone };
    }
    if (filters.status) query.status = filters.status;

    const [data, total] = await Promise.all([
        candidateSchema.
            find(query)
            .sort(sort_parsed)
            .skip(skip)
            .limit(limit)
            .exec(),
        candidateSchema
            .countDocuments(query)
            .exec(),
    ]);
    return {
        data,
        meta: {
            total,
            page,
            limit,
            totalPage: Math.ceil(total / limit)
        }
    }
};