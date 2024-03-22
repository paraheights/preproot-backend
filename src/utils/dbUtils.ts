import mongoose, { Document, Model, Query } from "mongoose";
import { Result } from "./result";
import { CustomError } from "./apiError";

interface Options {
  projections?: string;
  sort?: any;
  limit?: number;
  skip?: number;
  lean?: boolean;
  populate?: string;
  findAll?: boolean;
  countOnly?: boolean;
}

interface FindOptions {
  model: Model<Document>;
  query?: any;
  options?: Options;
}

const isValidMongooseId = (id: string): boolean => {
  if (mongoose.Types.ObjectId.isValid(id)) {
    if (String(new mongoose.Types.ObjectId(id)) === id) {
      return true;
    }
    return false;
  }

  return false;
};

export const dbSave = async (doc: Document): Promise<Result> => {
  try {
    // if (!isValidMongooseId(doc._id)) {
    //   throw new CustomError({
    //     status: 400,
    //     message: "Not a valid mongoose document!",
    //   });
    // }

    const newDoc: Document = await doc.save();

    return new Result({
      status: 200,
      success: true,
      message: "Document saved in database!",
      data: newDoc,
    });
  } catch (error: any) {
    if (error.name === "ValidationError") {
      const validationErrors: string[] = Object.values(error.errors).map(
        (err: any) => err.message
      );
      return new Result({
        status: 400,
        message: `Validation Error: ${validationErrors.join(", ")}`,
      });
    }
    return new Result({
      status: 400,
      message: error.message,
    });
  }
};

export const dbFind = async ({
  model,
  query = {},
  options = {},
}: FindOptions): Promise<Result> => {
  try {
    const {
      projections = "",
      sort = null,
      limit = 0,
      skip = 0,
      lean = false,
      populate = "",
      findAll = false,
      countOnly = false,
    } = options;

    let dbQuery: Query<any, Document> | null = null;
    if (countOnly) {
      dbQuery = model.countDocuments(query);
    } else {
      if (findAll) {
        dbQuery = model.find(query);
      } else {
        dbQuery = model.findOne(query);
      }
    }

    if (projections) {
      dbQuery = dbQuery.select(projections);
    }

    if (sort) {
      dbQuery = dbQuery.sort(sort);
    }

    if (limit) {
      dbQuery = dbQuery.limit(limit);
    }

    if (skip) {
      dbQuery = dbQuery.skip(skip);
    }

    if (lean) {
      dbQuery = dbQuery.lean();
    }

    if (populate) {
      dbQuery = dbQuery.populate(populate);
    }

    const result = await dbQuery.exec();
    if (!result) {
      throw new CustomError({
        status: 400,
        message: "Document not found!",
      });
    }
    return new Result({
      status: 200,
      message: "Retrieved documents successfully",
      data: result,
      success: true,
    });
  } catch (error: any) {
    return new Result({
      status: 400,
      message: error.message,
    });
  }
};
