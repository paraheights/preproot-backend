import { CustomError } from "./apiError";

export const requiredFieldsChecker = (
  body: Record<string, any>,
  fields: string[]
): void => {
  const missingFields: string[] = fields.filter(
    (field: string) => !(field in body)
  );

  if (missingFields.length > 0) {
    throw new CustomError({
      status: 400,
      message: `Missing required fields: ${missingFields.join(", ")}`,
    });
  }
};
