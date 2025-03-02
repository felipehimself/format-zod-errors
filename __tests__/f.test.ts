import { describe, expect, it, test } from "vitest";
import { f } from "../src/index";
import {
  personData,
  personSchema,
  userSchema,
  userData,
  personDataAgeError,
  personDataNameError,
  userDataAddressCityError,
  userDataAddressCountryCodeError,
  userDataAddressCountryNameError,
} from "./mocks";

describe("f formatter function", () => {
  test("Should not return errors for personSchema", () => {
    const { error } = personSchema.safeParse(personData);

    let formatted!: Record<string, any>;
    if (error) {
      formatted = f(error);
    }

    expect(formatted).toEqual(undefined);
  });

  test("Should not return errors for userSchema", () => {
    const { error } = userSchema.safeParse(userData);

    let formatted!: Record<string, any>;
    if (error) {
      formatted = f(error);
    }

    expect(formatted).toEqual(undefined);
  });

  test("Should return age error: You must be 18 y.o to create an account", () => {
    const { error } = personSchema.safeParse(personDataAgeError);

    let formatted!: Record<string, any>;
    if (error) {
      formatted = f(error);
    }

    expect(formatted).toHaveProperty(
      "age",
      "You must be 18 y.o to create an account"
    );
  });

  test("Should return name error: Name must be 1 to 20 characters", () => {
    const { error } = personSchema.safeParse(personDataNameError);

    let formatted!: Record<string, any>;
    if (error) {
      formatted = f(error);
    }

    expect(formatted).toHaveProperty("name", "Name must be 1 to 20 characters");
  });

  test("Should return city error: City must be 1 to 30 characters", () => {
    const { error } = userSchema.safeParse(userDataAddressCityError);

    let formatted!: Record<string, any>;
    if (error) {
      formatted = f(error);
    }

    expect(formatted).toHaveProperty(
      "address.city",
      "City must be 1 to 30 characters"
    );
  });

  test("Should return code error: Expected number, received string", () => {
    const { error } = userSchema.safeParse(userDataAddressCountryCodeError);

    let formatted!: Record<string, any>;
    if (error) {
      formatted = f(error);
    }
    console.log(formatted);

    expect(formatted).toHaveProperty(
      "address.country.code",
      "Expected number, received string"
    );
  });

  test("Should return country name error: Expected number, received string", () => {
    const { error } = userSchema.safeParse(userDataAddressCountryNameError);

    let formatted!: Record<string, any>;
    if (error) {
      formatted = f(error);
    }
    console.log(formatted);

    expect(formatted).toHaveProperty(
      "address.country.name",
      "Country must be 1 to 25 characters"
    );
  });
});
