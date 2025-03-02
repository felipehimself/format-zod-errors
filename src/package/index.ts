import { ZodError } from "zod";

export function f<T>(values: ZodError<T>) {
  return format(values);
}

function format<T>(values: ZodError<T>) {
  return values.errors.reduce<Record<string, any>>((acc, { message, path }) => {
    const obj = path.reduceRight<Record<string, any>>(
      (acc, key) => ({ [key]: acc }),
      message as unknown as Record<string, any>
    );

    mergeDeep(acc, obj);
    return acc;
  }, {} as Record<string, any>);
}

function mergeDeep<T extends Record<string, any>>(
  target: T,
  source: Record<string, any>
) {
  for (const key of Object.keys(source)) {
    if (
      typeof source[key] === "object" &&
      !Array.isArray(source[key]) &&
      source[key] !== null
    ) {
      if (!(key in target)) {
        (target as Record<string, any>)[key] = {};
      }

      mergeDeep((target as Record<string, any>)[key], source[key]);
    } else {
      (target as Record<string, any>)[key] = source[key];
    }
  }

  return target;
}
