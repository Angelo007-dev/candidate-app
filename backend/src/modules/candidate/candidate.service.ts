import { CreateCandidateDto } from "../../dto/CreateCandidate.dto";
import { UpdateCandidateDto } from "../../dto/UpdateCandidate.dto";
import candidateSchema from "./candidate.schema"

export const createCandidate = async (data: CreateCandidateDto) => {
    return await candidateSchema.create(data);
};


export const getCandidate = async (id: string) => {
    return await candidateSchema.findById(id);
};

export const updateCandidate = async (id: string, data: UpdateCandidateDto) => {
    return await candidateSchema.findByIdAndUpdate(id, data, { new: true });
};

export const deleteCandidate = async (id: string) => {
    return await candidateSchema.findByIdAndUpdate(id, { deletedAt: new Date() }, { new: true });
};

export const validateCandidate = async (id: string) => {
    await new Promise(res => setTimeout(res, 2000));
    return await candidateSchema.findByIdAndUpdate(id, {
        status: "validate",
    }, { new: true });
};