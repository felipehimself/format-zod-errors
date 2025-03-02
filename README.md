<p align="center"> <h1 align="center">format-zod-errors</h1></p>

<p align="center">
<a href="https://twitter.com/colinhacks" rel="nofollow"><img src="https://img.shields.io/badge/created%20by-@felipehimself-4BBAAB.svg" alt="Created by Colin McDonnell"></a>
<a href="https://opensource.org/licenses/MIT" rel="nofollow"><img src="https://img.shields.io/github/license/colinhacks/zod" alt="License"></a>
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

### Create your schema

```
import { z } from "zod";

const personSchema = z.object({
  id: z.string().optional(),
  name: z
    .string({
      errorMap: () => {
        return { message: "Name must be 1 to 5 characters long" };
      },
    })
    .min(1)
    .max(5),
  age: z
    .number({ message: "Age is required" })
    .min(18, { message: "You must be 18 y.o to create an account" }),
  email: z
    .string({ message: "Email is required" })
    .email({ message: "Invalid email" }),
});



```

### Get the errors

```
import { f } from "format-zod-errors";

const mockPersonValues = {
  id: "1",
  email: "invalidemail@",
  age: 15,
  name: "my name has more than 5 characters",
};

const { error } = personSchema.safeParse(mockPersonValues);

if (error) {
  const errorsMessages = f(error);
  console.log(errorsMessages);

  // output
  // {
  //  "name": "Name must be 1 to 5 characters long",
  //  "age": "You must be 18 y.o to create an account",
  //  "email": "Invalid email"
  // }

 return;
}


// Or if you want more details just pass the options argument

if (error) {
  const errorsMessages = f(error, { verbose: true });
  console.log(errorsMessages);

  // output
  // {
  //    "name": {
  //        "message": "Name must be 1 to 5 characters long",
  //        "code": "too_big",
  //        "maximum": 5,
  //        "type": "string",
  //        "inclusive": true,
  //        "exact": false
  //    },
  //    "age": {
  //        "message": "You must be 18 y.o to create an account",
  //        "code": "too_small",
  //        "minimum": 18,
  //        "type": "number",
  //        "inclusive": true,
  //        "exact": false
  //    },
  //    "email": {
  //        "message": "Invalid email",
  //        "validation": "email",
  //        "code": "invalid_string"
  //    }
  //  }

 return;
}
```
