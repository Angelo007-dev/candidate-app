import mongoose from 'mongoose';
import * as CandidateService from './candidate.service';
import { CreateCandidateDto } from "../../dto/CreateCandidate.dto";
import { QueryParamsDto } from "../../dto/QueryParamsDto";
import { UpdateCandidateDto } from "../../dto/UpdateCandidate.dto";
import candidateSchema from './candidate.schema';

// Mock Mongoose
jest.mock('./candidate.schema');

describe('CandidateService', () => {
    const mockCandidate = {
        _id: new mongoose.Types.ObjectId(),
        name: 'John Doe',
        email: 'john@example.com',
        phone: '+1234567890',
        status: 'pending',
        deletedAt: null,
    };

    const mockExec = (value: any) => ({ exec: jest.fn().mockResolvedValue(value) });

    beforeEach(() => {
        jest.clearAllMocks();
    });

    it('should create a candidate', async () => {
        (candidateSchema.create as jest.Mock).mockResolvedValueOnce(mockCandidate);

        const dto: CreateCandidateDto = {
            name: 'John Doe',
            email: 'john@example.com',
            phone: '+1234567890',
            status: 'pending',
        };

        const result = await CandidateService.createCandidate(dto);
        expect(candidateSchema.create).toHaveBeenCalledWith(dto);
        expect(result).toEqual(mockCandidate);
    });

    it('should get a candidate by id', async () => {
        (candidateSchema.findById as jest.Mock).mockReturnValueOnce(mockExec(mockCandidate));

        const result = await CandidateService.getCandidate('123');
        expect(candidateSchema.findById).toHaveBeenCalledWith('123');
        expect(result).toEqual(mockCandidate);
    });

    it('should update a candidate', async () => {
        const updateData: UpdateCandidateDto = { name: 'Jane Doe' };

        (candidateSchema.findByIdAndUpdate as jest.Mock).mockReturnValueOnce(
            mockExec({ ...mockCandidate, ...updateData })
        );

        const result = await CandidateService.updateCandidate('123', updateData);
        expect(candidateSchema.findByIdAndUpdate).toHaveBeenCalledWith('123', updateData, { new: true });
        expect(result).toEqual({ ...mockCandidate, ...updateData });
    });

    it('should delete a candidate', async () => {
        const deletedCandidate = { ...mockCandidate, deletedAt: new Date() };

        (candidateSchema.findByIdAndUpdate as jest.Mock).mockReturnValueOnce({
            exec: jest.fn().mockResolvedValueOnce(deletedCandidate),
        });

        const result = await CandidateService.deleteCandidate('123');
        expect(candidateSchema.findByIdAndUpdate).toHaveBeenCalledWith(
            '123',
            { deletedAt: expect.any(Date) },
            { new: true }
        );
        expect(result).toEqual(deletedCandidate);
    });

    it('should validate a candidate', async () => {
        (candidateSchema.findByIdAndUpdate as jest.Mock).mockReturnValueOnce(
            mockExec({ ...mockCandidate, status: 'validate' })
        );

        const result = await CandidateService.validateCandidate('123');
        expect(candidateSchema.findByIdAndUpdate).toHaveBeenCalledWith(
            '123',
            { status: 'validate' },
            { new: true },
        );
        expect(result).toEqual({ ...mockCandidate, status: 'validate' });
    });

    it('should list candidates with filters', async () => {
        const mockData = [mockCandidate];
        const mockTotal = 1;

        const findMock = {
            sort: jest.fn().mockReturnThis(),
            skip: jest.fn().mockReturnThis(),
            limit: jest.fn().mockReturnThis(),
            exec: jest.fn().mockResolvedValue(mockData),
        };
        (candidateSchema.find as jest.Mock).mockReturnValue(findMock);
        (candidateSchema.countDocuments as jest.Mock).mockReturnValue(mockExec(mockTotal));

        const dto: QueryParamsDto = {
            limit: 10,
            page: 1,
            sort: { createdAt: -1 },
            filters: {},
        };

        const result = await CandidateService.listCandidates(dto);
        expect(candidateSchema.find).toHaveBeenCalled();
        expect(result.data).toEqual(mockData);
        expect(result.meta.total).toEqual(mockTotal);
    });
});