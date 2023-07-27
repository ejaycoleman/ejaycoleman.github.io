---
title: "TRPC Clone"
coverImage: "/assets/blog/trpc-clone/cover.png"
date: "2023-07-27T05:35:07.322Z"
---

# tRPC Clone

# Building a tRPC clone - Advanced TypeScript

For a while, I’ve been interested in the emerging tRPC library - a TypeScript library that allows types to be defined in the server and referenced in the client. It’s a clever library, offering lots of functionality while still being easy to use. But beneath the surface is a complex implementation, leveraging advanced concepts in typescript to achieve a seamless experience for users. I wanted to take a deep dive into how it worked, and so that’s how this article originated.

To skip into the code, visit it here: https://github.com/ejaycoleman/tRPClone. This post aims to explain the implementation. It’s also kinda WIP, so expect some parts to be poorly written.

While writing this article, I found that tRPC had officially published a blog post on how to implement the tRPC client: [https://trpc.io/blog/tinyrpc-client](https://trpc.io/blog/tinyrpc-client). My post aims to explain both the client and the server (in a less official way).

## What is tRPC?

The official tRPC repository includes a simple example of how tRPC can be used: [https://github.com/trpc/trpc/tree/main/examples/minimal](https://github.com/trpc/trpc/tree/main/examples/minimal).

In its simplest form, a server could be defined as such:

```tsx
const appRouter = router({
  userList: publicProcedure.query(async () => {
    // Retrieve users from a datasource, this is an imaginary database
    const users = await db.user.findMany();
    //    ^?
    return users;
  }),
  userById: publicProcedure.input(z.string()).query(async (opts) => {
    const { input } = opts;
    //      ^?
    // Retrieve the user with the given ID
    const user = await db.user.findById(input);
    return user;
  }),
  userCreate: publicProcedure
    .input(z.object({ name: z.string() }))
    .mutation(async (opts) => {
      const { input } = opts;
      //      ^?
      // Create a new user in the database
      const user = await db.user.create(input);
      //    ^?
      return user;
    }),
});
```

Here are three endpoints: GET userList, GET userByID (with a query parameter), and POST userCreate (with a body). Zod is used to validate that the userById query parameter is a string, and the userCreate body is an object of {name: string}.

The types of the AppRouter can then be leveraged within the frontend like this:

```tsx
const trpc = createTRPCProxyClient<AppRouter>({
  links: [
    httpBatchLink({
      url: "http://localhost:3000",
    }),
  ],
});

async function main() {
  /**
   * Inferring types
   */
  const users = await trpc.userList.query();
  //    ^?
  console.log("Users:", users);

  const createdUser = await trpc.userCreate.mutate({ name: "sachinraja" });
  //    ^?
  console.log("Created user:", createdUser);

  const user = await trpc.userById.query("1");
  //    ^?
  console.log("User 1:", user);
}
```

Here, the types defined in the server are available in the frontend, which means the returned value from userList.query() will preserve this type:

```tsx
const users: {
  name: string;
  id: string;
}[];
```

This code is available on the officiant tRPC repository here: [https://github.com/trpc/trpc/tree/main/examples/minimal](https://github.com/trpc/trpc/tree/main/examples/minimal)

## Seems simple… right?

Let’s break this down into smaller steps. You need to have the ability to define endpoints on the server, with inputs validated by Zod. You then need to be able to use these types in the frontend, having access to the required input type and return type, but using fetch when called in the frontend. How can these types be shared, but used differently in the frontend and backend? And how can this be done dynamically? Read on to understand an approach to achieve this client/server polymorphism, leveraging JavaScript Proxies, type inference, and conditionals

## Backend

First things first, designing the backend library. The key features of the backend library are:

- defining the endpoints as an object
- providing this object to a function will start a server that accepts requests for each endpoint defined within the object
- Enable each endpoint to accept input, either as a query parameter for a GET request or as a body for a POST request.

### Defining the endpoints as an object

For simplicity, in this implementation the server endpoints will simply be defined within an object, rather than through a `router` method, like this:

```jsx
const appRouter = {
  get: t.get(() => {
    return "get success";
  }),
  post: t.post(() => {
    return "post success";
  }),
  getWithInput: t.input(z.string()).get((input) => {
    return `get success with ${input}`;
  }),
  postWithInput: t.input(z.object({ name: z.string() })).post((input) => {
    return `post success with ${input.name}`;
  }),
};
```

To get to this stage, we need to implement `t` with the methods `get`, `post` and `input`, which can be used interchangeably.

### Implementing `t`

In tRPC, `t` is defined by calling `initTRPC.create()`. For simplicity, tRPCClone will directly export `t`.

```tsx
export const t = {
  input: <T extends z.ZodType<any, any, any>>(inputValidation: T) => {
    type InputSchema = z.infer<typeof inputValidation>;

    return {
      get: <T extends JSONValue>(i: (input: InputSchema) => Promise<T> | T) => {
        return get(i, inputValidation);
      },
      post: <T extends JSONValue>(
        i: (input: InputSchema) => Promise<T> | T
      ) => {
        return post(i, inputValidation);
      },
    };
  },
  get: <T extends JSONValue>(getCallback: () => Promise<T> | T) =>
    get<"no_input", Promise<T> | T>(getCallback),
  post: <T extends JSONValue>(postCallback: () => Promise<T> | T) =>
    post<"no_input", Promise<T> | T>(postCallback),
};
```

Starting off with `t.get` and `t.post`, they accept a callback with an inferred return type of something extending JSONValue, or a Promise of a JSONValue. This will be the value served by the endpoints.

> JSONValue is just a type of a string, number, boolean or an object or array containing those primitives:

```
type JSONValue = string | number | boolean | JSONObject | JSONArray;

interface JSONObject {
  [x: string]: JSONValue;
}

interface JSONArray extends Array<JSONValue> {}
```

when `t.get` or `t.post` are called, they’ll return `get<"no_input", Promise<T> | T>(getCallback)` and `post<"no_input", Promise<T> | T>(postCallback)` respectively. `get` and `post` are similar and defined as such:

```jsx
export const get = <T, O extends Promise<JSONValue> | JSONValue>(
  getCallback: (input?: T) => O,
  validate?: z.ZodType<any, any, any>
): Get<T, O> => {
  return {
    callback: (input) => {
      validate?.parse(input);
      return getCallback(input);
    },
    type: "get",
  };
};
```

```jsx
export const post = <T, O extends Promise<JSONValue> | JSONValue>(
  postCallback: (input?: T) => O,
  validate?: z.ZodType<any, any, any>
): Post<T, O> => {
  return {
    callback: (input) => {
      validate?.parse(input);
      return postCallback(input);
    },
    type: "post",
  };
};
```

> Initially `post` and `get` were as simple as

```tsx
const get = <T,>(getCallback: T) => getCallback;
const post = <T,>(postCallback: T) => postCallback;
```

> this later posed issues with the client when I had a conditional type based on whether it was a get or a post. Because these two types have identical signatures, TypeScript was seeing them as identical: TypeScript is structural, not nominal - something I was unaware of!

Regarding the `input` method, it accepts a `ZodType` for validation. Zod can then be used to infer the type from this, which will be used to define the parameter type in the returned `get` and `post` methods.

Finally, the server library defines the createHTTPServer method to serve the defined endpoints.

```tsx
export const createHTTPServer = ({
  router,
}: {
  router: { [key: string]: Get<any, any> | Post<any, any> };
}) => {
  const app = express();

  app.use(bodyParser.urlencoded({ extended: true }));
  app.use(bodyParser.json());

  Object.entries(router).map(([routeName, routeFunction]) => {
    if (routeFunction.type == "get") {
      app.get("/" + routeName, async (req, res) => {
        if (req?.query.input) {
          const input = decodeURIComponent(req?.query.input as string);
          res.send(await routeFunction.callback(JSON.parse(input)));
        } else {
          res.send(await routeFunction.callback());
        }
      });
      return;
    }

    if (routeFunction.type == "post") {
      app.post("/" + routeName, async (req, res) => {
        res.send(await routeFunction.callback(req.body));
      });
      return;
    }
  });

  return app;
};
```

This is a simple express implementation. It accepts an object, router, which contains the GET and POST requests. For `get` requests, inputs are communicated through a JSON stringified query parameter: `input`. This is then passed onto the associated callback if necessary. For `post` requests, inputs are communicated through the body.

## Defining the client library

Similarly to how tRPC does it, the client will use the server like this:

```tsx
import { createTRPCProxy } from "../library/client";
import type { AppRouter } from "../server/server";

const trpc = createTRPCProxy<AppRouter>();

async function main() {
  /**
   * Inferring types
   */
  const users = await trpc.userList.query();
  console.log("Users:", users.data);

  const createdUser = await trpc.userCreate.mutate({ name: "sachinraja" });
  console.log("Created user:", createdUser.data);

  const user = await trpc.userById.query("1");
  console.log("User 1:", user.data);
}

main().catch(console.error);
```

In the server, you’ll have noticed the type of router that was exported: `export type AppRouter = typeof appRouter`. This will simply be:

```tsx
type AppRouter = {
    userList: Get<"no_input", User[] | Promise<User[]>>;
    userById: Get<string, User | "not found" | Promise<User | "not found">>;
    userCreate: Post<...>;
}
```

So how do we then attach the .query and .mutate to getValues and post respectively? That’s where the magic of createTRPCProxy comes into play.

```tsx
export const createTRPCProxy = <T,>() => {
  return createRecursiveProxy(
    ({ path, args }: { path: string[]; args: string[] }) => {
      const routeName = path[0];
      const procedureType = path[path.length - 1];

      if (procedureType === "query") {
        const parsedArgs = args[0]
          ? `?input=${encodeURIComponent(JSON.stringify(args[0]))}`
          : "";

        return axios.get(`http://localhost:3000/${routeName}${parsedArgs}`);
      }

      return axios.post(`http://localhost:3000/${routeName}`, args[0]);
    }
  ) as OverwriteChildren<T>;
};
```

This is a function which simply calls `createRecursiveProxy` with a callback. Before diving into the callback, let’s investigate what createRecursiveProxy does.

```tsx
const createRecursiveProxy = (callback: callbackType) =>
  createInnerProxy(callback, []);

const createInnerProxy = (callback: callbackType, path: any[]) => {
  const proxy: unknown = new Proxy(() => {}, {
    get(_obj, key) {
      return createInnerProxy(callback, [...path, key]);
    },
    apply(_1, _2, args) {
      return callback({
        args,
        path,
      });
    },
  });

  return proxy;
};
```

It creates an InnerProxy, passing in the callback and an empty path to createInnerProxy. This initialises a JavaScript proxy.

### JavaScript Proxy

What is a JavaScript proxy? It allows the fundamental operators existing on objects to be tapped into and reimplemented. In this example, any `get` operations on the object will create another proxy through createInnerProxy. This means that the proxy will be applied at any level: trpc.one(), trpc.one.two(). For each of these function calls, apply will be called with the path, which is eventually passed back into the callback defined in `createTRPCProxy`.

### createTRPCProxy callback

```tsx
({ path, args }: { path: string[]; args: string[] }) => {
      const routeName = path[0];
      const procedureType = path[path.length - 1];

      if (procedureType === "query") {
        const parsedArgs = args[0]
          ? `?input=${encodeURIComponent(JSON.stringify(args[0]))}`
          : "";

        return axios.get(`http://localhost:3000/${routeName}${parsedArgs}`);
      }

      return axios.post(`http://localhost:3000/${routeName}`, args[0]);
    }
  ) as OverwriteChildren<T>;
```

This will call GET and POST depending on the procedure type. This will be defined when called by the client, eg `const users = await trpc.userList.query();` or `const createdUser = await trpc.userCreate.mutate({ name: "sachinraja" });`. The query() or mutate() will be passed as a string in procedureType, and userList or userCreate will be passed as a string in routeName. Axios is then used to either GET with a stringified input, or POST with a body. This is then assigned to the type OverwriteChildren, which lets typescript expose the types defined in the server.

```tsx
type Query<Input, Response> = {
  query: Input extends "no_input"
    ? () => AxiosResponse<Response>
    : (param: Input) => AxiosResponse<Response>;
};

type Mutate<Input, Response> = {
  mutate: Input extends "no_input"
    ? () => AxiosResponse<Response>
    : (param: Input) => AxiosResponse<Response>;
};

type OverwriteChildren<T> = {
  [PropertyKey in keyof T]: T[PropertyKey] extends Get<
    infer Input,
    infer Response
  >
    ? Query<Input, Response>
    : T[PropertyKey] extends Post<infer Input, infer Response>
    ? Mutate<Input, Response>
    : unknown;
};
```

In OverwriteChildren, T will be the type exported in the server, which we know will be a series of either Gets or Posts. Type inference is used to either redefine a Get<Input, Response> as Query<Input, Response> or a Post<Input, Response> as a Mutate<Input, Response>. We can then see Query and Mutate are similar, which just determine if an input parameter is required.
