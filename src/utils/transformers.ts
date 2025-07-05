import { Transform } from "class-transformer";
import { Types } from "mongoose";
import createHttpError from "http-errors"; // Install with: npm install http-errors

export function ToObjectId() {
  return Transform(({ value }) => {
    if (typeof value == 'string') {
      value = JSON.parse(value)
    }
    if (Array.isArray(value)) {
      // If value is an array, transform each item into ObjectId
      return value.map((id) => {
        if (!Types.ObjectId.isValid(id)) {
          throw createHttpError(400, `Invalid ObjectId in array: ${id}`);
        }
        return new Types.ObjectId(id);
      });
    }

    // If value is a single value, transform it into ObjectId
    if (!Types.ObjectId.isValid(value)) {
      throw createHttpError(400, `Invalid ObjectId: ${value}`);
    }
    return new Types.ObjectId(value);
  }, { toClassOnly: true });
}
