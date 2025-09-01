import { Field, InputType, ObjectType } from '@nestjs/graphql';
import { IsNumber, IsOptional, Max, Min } from 'class-validator';

@InputType()
export class PaginationInput {
    @Field(() => Number, { defaultValue: 1 })
    @IsOptional()
    @IsNumber()
    @Min(1)
    page?: number;

    @Field(() => Number, { defaultValue: 20 })
    @IsOptional()
    @IsNumber()
    @Min(1)
    @Max(100)
    limit?: number;
}

@ObjectType()
export class PaginationInfo {
    @Field()
    total: number = 0;

    @Field()
    page: number = 1;

    @Field()
    totalPages: number = 1;
} 