"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DataBaseRepository = void 0;
const mongoose_1 = require("mongoose");
class DataBaseRepository {
    constructor(model) {
        this.model = model;
    }
    async aggregate(pipeline) {
        return this.model.aggregate(pipeline);
    }
    async create(data, session) {
        if (session) {
            return await this.model.create([data], { session }).then(docs => docs[0]);
        }
        return this.model.create(data);
    }
    async findOld(query) {
        return this.model.find(query);
    }
    async insertMany(data) {
        const result = await this.model.insertMany(data);
        return result;
    }
    async findOne(query, select, populate, sort) {
        return (await this.model
            .findOne(query)
            .select(select || '')
            .sort(sort?.replaceAll(",", " "))
            .populate(populate || []));
    }
    async find({ filter = {}, populate = [], page = 1, sort = '', select = ' ', limit, }) {
        const query = this.model.find(filter);
        if (populate)
            query.populate(populate);
        if (select)
            query.select(select.replaceAll(",", " "));
        if (sort)
            query?.sort(sort?.replaceAll(",", " "));
        if (limit)
            query.limit(limit);
        if (page && limit)
            query.skip((page - 1) * limit);
        return await query.exec();
    }
    async findById(id, select, populate) {
        let query = this.model.findById(id).select(select || '');
        if (populate) {
            query = query.populate(populate);
        }
        return query;
    }
    async findAll() {
        return this.model.find();
    }
    async findOneAndUpdate(query, data, options = { new: true }, session) {
        if (session)
            options.session = session;
        return this.model.findOneAndUpdate(query, data, options);
    }
    async findOneAndDelete(query, options) {
        return this.model.findOneAndDelete(query, options);
    }
    async updateOne(query, update) {
        return this.model.updateOne(query, update);
    }
    async findByIdAndUpdate(id, data) {
        return this.model.findByIdAndUpdate(new mongoose_1.Types.ObjectId(id), data, { new: true });
    }
    async deleteOne(query) {
        return this.model.findOneAndDelete(query);
    }
    async deleteMany(query) {
        await this.model.deleteMany(query);
    }
    async findByIdAndDelete(id) {
        return this.model.findByIdAndDelete(new mongoose_1.Types.ObjectId(id));
    }
    async updateMany(query, update) {
        return this.model.updateMany(query, update);
    }
    async countDocuments(query) {
        return this.model.countDocuments(query);
    }
    async count(query) {
        return this.model.countDocuments(query);
    }
}
exports.DataBaseRepository = DataBaseRepository;
