import { FilterQuery, Model, PopulateOptions, QueryOptions, Types, UpdateQuery, UpdateResult, UpdateWriteOpResult } from "mongoose";

interface FindOptions<TDocument> {
    filter?: FilterQuery<TDocument>;
    populate?: PopulateOptions[];
    limit?: number;
    select?: string;
    page?: number;
    sort?: string;
}

export class DataBaseRepository<TDocument> {
    constructor(private readonly model: Model<TDocument>) { }

    async create(data: Partial<TDocument>): Promise<TDocument> {


        return this.model.create(data);
    }

    async insertMany(data: Partial<TDocument>[]): Promise<TDocument[]> {
        const result = await this.model.insertMany(data);
        return result as TDocument[];
    }

    async findOne(
        query: FilterQuery<TDocument>,
        select?: string | Record<string, 0 | 1>,
        populate?: PopulateOptions[],
    ): Promise<TDocument | null> {
        return (await this.model
            .findOne(query)
            .select(select || '')
            .populate(populate || [])) as TDocument;
    }


    async find({
        filter = {},
        populate = [],
        page = 1,
        sort = '',
        select = ' ',
        limit,
    }: FindOptions<TDocument>): Promise<TDocument[] | []> {
        const query = this.model.find(filter);
        if (populate) query.populate(populate);
        if (select) query.select(select.replaceAll(",", " "));
        if (sort) query.sort(sort.replaceAll(",", " "));
        if (limit) query.limit(limit);
        if (page && limit) query.skip((page - 1) * limit);
        return await query.exec();
    }

    async findById(
        id: String,
        select?: string,
        populate?: PopulateOptions | PopulateOptions[]
    ): Promise<TDocument | null> {
        let query = this.model.findById(id).select(select || '');
        if (populate) {
            query = query.populate(populate);
        }
        return query;
    }

    async findAll(): Promise<TDocument[]> {
        return this.model.find();
    }


    async findOneAndUpdate(
        query: FilterQuery<TDocument>,
        data: UpdateQuery<TDocument>,
        options: QueryOptions = { new: true },
    ): Promise<TDocument | null> {
        return this.model.findOneAndUpdate(query, data, options);
    }
    async findOneAndDelete(
        query: FilterQuery<TDocument>,
        options?: QueryOptions,
    ): Promise<TDocument | null> {
        return this.model.findOneAndDelete(query, options);
    }

    async updateOne(
        query: FilterQuery<TDocument>,
        update: UpdateQuery<TDocument>
    ): Promise<UpdateWriteOpResult> {
        return this.model.updateOne(query, update);
    }

    async findByIdAndUpdate(
        id: string,
        data: Partial<TDocument>,
    ): Promise<TDocument | null> {
        return this.model.findByIdAndUpdate(new Types.ObjectId(id), data, { new: true });
    }

    async deleteOne(
        query: FilterQuery<TDocument>,
    ): Promise<TDocument | null> {
        return this.model.findOneAndDelete(query);
    }

    async deleteMany(query: FilterQuery<TDocument>): Promise<void> {
        await this.model.deleteMany(query);
    }

    async findByIdAndDelete(id: string): Promise<TDocument | null> {
        return this.model.findByIdAndDelete(new Types.ObjectId(id));
    }

    async updateMany(
        query: FilterQuery<TDocument>,
        update: UpdateQuery<TDocument>
    ): Promise<UpdateResult> {
        return this.model.updateMany(query, update);
    }

    async countDocuments(query: FilterQuery<TDocument>): Promise<number> {
        return this.model.countDocuments(query);
    }

    async count(query: FilterQuery<TDocument>): Promise<number> {
        return this.model.countDocuments(query);
    }
}