import { number, z } from "zod";

export const personSchema = z.object({
  id: z.string(),
  email: z.string().email(),
  age: z
    .number()
    .min(18, { message: "You must be 18 y.o to create an account" }),
  name: z
    .string()
    .min(1)
    .max(20, { message: "Name must be 1 to 20 characters" }),
  lastName: z.string().min(1).max(20),
});

export const personData: z.infer<typeof personSchema> = {
  id: "1",
  email: "jane@email.com",
  age: 18,
  name: "Jane",
  lastName: "Doe",
};

export const personDataAgeError: z.infer<typeof personSchema> = {
  id: "1",
  email: "jane@email.com",
  age: 15,
  name: "Jane",
  lastName: "Doe",
};

export const personDataNameError: z.infer<typeof personSchema> = {
  id: "1",
  email: "jane@email.com",
  age: 15,
  name: "Jane Jane Jane Jane Jane Jane Jane Jane Jane Jane Jane",
  lastName: "Doe",
};

export const userSchema = z.object({
  name: z.string().min(1),
  lastName: z.string().min(1),
  address: z.object({
    street: z.string(),
    city: z.string().max(30, { message: "City must be 1 to 30 characters" }),
    state: z.string(),
    country: z.object({
      name: z
        .string()
        .max(25, { message: "Country must be 1 to 25 characters" }),
      code: number(),
    }),
  }),
});

export const userData: z.infer<typeof userSchema> = {
  address: {
    street: "Rua do Sorvete",
    state: "Rio de Janeiro",
    city: "Cidade do Sorvete",
    country: { name: "Brazil", code: 55 },
  },
  name: "John",
  lastName: "Silva",
};

export const userDataAddressCityError: z.infer<typeof userSchema> = {
  address: {
    street: "Rua do Sorvete",
    state: "Rio de Janeiro",
    city: "Cidade do Sorvete Cidade do Sorvete Cidade do Sorvete Cidade do Sorvete Cidade do Sorvete Cidade do Sorvete Cidade do Sorvete",
    country: { name: "Brazil", code: 55 },
  },
  name: "John",
  lastName: "Silva",
};

export const userDataAddressCountryCodeError = {
  address: {
    street: "Rua do Sorvete",
    state: "Rio de Janeiro",
    city: "Cidade do Sorvete Cidade do Sorvete Cidade do Sorvete Cidade do Sorvete Cidade do Sorvete Cidade do Sorvete Cidade do Sorvete",
    country: { name: "Brazil", code: "55" },
  },
  name: "John",
  lastName: "Silva",
};

export const userDataAddressCountryNameError = {
  address: {
    street: "Rua do Sorvete",
    state: "Rio de Janeiro",
    city: "Cidade do Sorvete",
    country: {
      name: "Brazil Brazil Brazil Brazil Brazil Brazil Brazil Brazil Brazil",
      code: "55",
    },
  },
  name: "John",
  lastName: "Silva",
};
