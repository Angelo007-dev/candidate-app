import { IsNumber, IsOptional, IsString, Max, Min, ValidateNested } from "class-validator";
import { Type } from "class-transformer";

export class CandidateFilter {
    @IsOptional()
    @IsString()
    name?: string;

    @IsOptional()
    @IsString()
    email?: string;

    @IsOptional()
    @IsString()
    phone?: string;

    @IsOptional()
    @IsString()
    status?: string;
}
export class QueryParamsDto {
    @IsOptional()
    @IsNumber()
    @Min(1)
    @Type(() => Number)
    page: number = 1;

    @IsOptional()
    @IsNumber()
    @Min(1)
    @Max(100)
    @Type(() => Number)
    limit: number = 10;

    @IsOptional()
    @ValidateNested()
    @Type(() => CandidateFilter)
    filters: CandidateFilter = new CandidateFilter();

    @IsOptional()
    sort: any = { createdAt: -1 };
}