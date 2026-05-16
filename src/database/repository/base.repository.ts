import { HydratedDocument, Model, PopulateOptions, QueryFilter, QueryOptions, UpdateQuery } from "mongoose";

export class DatabaseRepository<TRowDocs> {
  constructor(private model: Model<TRowDocs>) {
    this.model = model;
  }

  async create(data: Partial<TRowDocs>): Promise<HydratedDocument<TRowDocs>> {
    return await this.model.create(data);
  }

  async findOne(
    filter: QueryFilter<TRowDocs>,
    select?: string | Record<string, 0 | 1>,
    populate?: PopulateOptions | PopulateOptions[]
  ) {
    let result = this.model.findOne(filter);
    if (select) {
      result = result.select(select);
    }
    if (populate) {
      result = result.populate(populate);
    }
    return await result;
  }

  async findOneAndUpdate(
    filter: QueryFilter<TRowDocs>,
    update: UpdateQuery<TRowDocs>,
    options?: QueryOptions<TRowDocs>
  ) {
    let result = this.model.findOneAndUpdate(filter, update, options);
    return await result;
  }
}
