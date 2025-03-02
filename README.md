<p align="center"> <h1 align="center">format-zod-errors</h1></p>

<p align="center">
<a href="https://github.com/felipehimself" rel="nofollow"><img src="https://img.shields.io/badge/created%20by-@felipehimself-4BBAAB.svg" alt="Created by felipehimself"></a>
<a href="https://opensource.org/licenses/MIT" rel="nofollow"><img src="https://img.shields.io/github/license/felipehimself/format-zod-errors" alt="License"></a>
</p>

A light weight utility for formatting validation errors from [Zod](https://github.com/colinhacks/zod) schemas, returning an object with easy-to-access error messages for each field.

## Motivation

Formatting zod errors can take some time to address. Also, other packages I used didn't return the way I expected and weren't as lightweight as wanted.

## Installation

```bash
npm install format-zod-errors
# or
yarn add format-zod-errors
```

## Usage

### Using safeParse

```
import { z } from "zod";
import { f } from "format-zod-errors";

const personSchema = z.object({
  id: z.string(),
  email: z.string().email(),
  age: z.number().min(18),
  name: z.string().min(1).max(20),
  lastName: z.string().min(1).max(20),
});

const personData: z.infer<typeof personSchema> = {
  id: "1",
  email: "jane@email.com",
  age: 15,
  name: "Jane",
  lastName: "Doe",
};


const { error } = personSchema.safeParse(personData);

if (error) {
  const errorsMessages = f(error);

  // output
   {
    age: 'Number must be greater than or equal to 18'
   }
}

```

### Or using parse

```
import { z } from "zod";
import { f } from "format-zod-errors";

const userSchema = z.object({
  name: z.string().min(1),
  lastName: z.string().min(1),
  address: z.object({
    street: z.string(),

    city: z.string(),
    state: z.string(),
    country: z.object({
      name: z.string(),
      code: z.number(),
    }),
  }),
});

const userData = {
  name: "John",
  lastName: 1,
  address: {
    street: "123 Main St",
    city: 123,
    country: { name: 5, code: "21" },
  },
};

 try {
      const data = userSchema.parse(userData);
      // it will throw an error

    } catch (error) {

      if (error instanceof z.ZodError) {
        const formattedErrors = f(error);

        // output
        {
          "lastName": "Expected string, received number",
          "address": {
              "city": "Expected string, received number",
              "state": "Required",
              "country": {
                "name": "Expected string, received number",
                "code": "Expected number, received string"
            }
          }
        }
      }
    }
```
