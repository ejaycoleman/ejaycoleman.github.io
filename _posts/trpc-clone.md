---
title: "TRPC Clone"
coverImage: "/assets/blog/trpc-clone/cover.jpg"
date: "2023-07-27T05:35:07.322Z"
---

# tRPC Clone

For a while, I’ve been interested in the [tRPC](https://trpc.io/) library - a TypeScript library that allows types to be defined in the server and referenced in the client. It’s a clever library, offering lots of functionality while still being easy to use. But beneath the surface is a complex implementation, leveraging advanced concepts in typescript to achieve a seamless experience for users. I wanted to take a deep dive into how it worked, and so that’s how this article originated.

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

This code is available on the official tRPC repository here: [https://github.com/trpc/trpc/tree/main/examples/minimal](https://github.com/trpc/trpc/tree/main/examples/minimal)

## Seems simple… right?

Let’s break this down into smaller steps. You need to have the ability to define endpoints on the server, with inputs validated by Zod. You then need to be able to use these types in the frontend, having access to the required input type and return type, but using fetch when called in the frontend. How can these types be shared, but used differently in the frontend and backend? And how can this be done dynamically? Read on to understand an approach to achieve this client/server polymorphism, leveraging JavaScript Proxies, type inference, and conditionals

## Server

### JSON type

First things first, we’ll define a standard JSON type in typescript so we can use that for our payloads.

```tsx
type JSONValue = string | number | boolean | JSONObject | JSONArray;

interface JSONObject {
  [x: string]: JSONValue;
}

interface JSONArray extends Array<JSONValue> {}
```

### Get and Post types

Easy! Now we’re going to define two types: Get and Post. These will be similar, and will later be used by the client to build a conditional type.

```tsx
export type Get<Input, Response extends Promise<JSONValue> | JSONValue> = {
  callback: (input?: Input) => Response;
  type: "get";
};

export type Post<Input, Response extends Promise<JSONValue> | JSONValue> = {
  callback: (input?: Input) => Response;
  type: "post";
};
```

When the Get or Post type is used, generics will be used to define the input and the response. The first generic, Input, will be used to pass an inferred type from Zod which will be used for our validation. The second generic, Response, will be the response in the form of JSON or a promise of JSON.

Because TypeScript is structural, and not nominal, without the `type: "get"` or `type: "post"` , Typescript would treat these as the same type. We’ll see later how this type property is used to differentiate the two.

### get and post methods

Lets now define the method which will be used to define a get endpoint on the server. This will be of type Get, as defined above, with the generics passed in.

```tsx
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

The T and O generics are used to construct the input and output type of the callback respectively. Validate is a Zod type which allows us to apply Zod’s validation on the input before calling the callback with the input. Finally, type is allocated the literal ‘get’ which will help later on when it comes to conditionals.

Post will take a similar form to get, just with the type assigned to ‘post’ instead.

```tsx
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

### Exposing the methods

So that code written for the server can take advantage of these methods, we’ll construct an object which includes post, get and input.

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

Post and get simply call their respective functions along with a type literal of ‘not_input’. This is used for the type conditionals leveraged by the client side code which we’ll explore later.

Input is then a wrapper for post and get which takes an input of a ZodType. This allows the type to be extracted with z.infer and used to declare the type of input, and the ZodType to be passed in as a parameter to be validated by post and get.

### listening

Finally, there needs to be a way for the routes to be declared and for them to start accepting traffic.

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

## Client

### Proxies

The next stage is to design the library to be used by the client. The client leverages [JavaScript Proxies](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Proxy): these allow the fundamental operators available on objects to be tapped into and redefined. Proxies allow ‘get’ and ‘apply’ operations to be intercepted: the former intercepting property accessors (eg `myProxy.getValue`), and the latter intercepting function calls on the object (eg `myProxy.applyValue()`). Proxies can be used recursively to always apply at any depth of property access. This is leveraged in the client library:

```tsx
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

Here, property accesses initialise a new proxy recursively, and property function calls will apply the callback, along with the path of the object. This enables us to get the data from a call such as `myProxy.getOne.getTwo('value')`, where callback would be called with `{args: ['value'], path: ['getOne', 'getTwo']}`, which can eventually be used by our library to determine which endpoints to call.

The initial call of createInnerProxy will be called via a function, allowing the types to be defined and initialising path as an empty array:

```tsx
type callbackType = ({
  path,
  args,
}: {
  path: string[];
  args: string[];
}) => Promise<AxiosResponse<any, any>>;

const createRecursiveProxy = (callback: callbackType) =>
  createInnerProxy(callback, []);
```

### Overwriting types

The next step is to define the Query and Mutate types so that the function calls and expected response types can be inferred

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
};.
```

As previously mentioned in the server-side library, the “no_input” generic value is used by the client to differentiate when a callback input is required. The type of this is inferred from the Query or Mutation call, which is wrapped in another type to differentiate Queries from Mutations.

```tsx
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

In OverwriteChildren, T will be the type exported in the server, which we know will be a series of either Gets or Posts. Type inference is used to either redefine a Get<Input, Response> as Query<Input, Response> or a Post<Input, Response> as a Mutate<Input, Response>.

### Exposing functionality

Finally, the function exposed to the client is createTRPCProxy, which takes the type of the server endpoints, allowing them to shape the Query and Mutations available for the client.

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

Here we call createRecursiveProxy with the callback which determines how to communicate with the server. Since queries will be called something like this: `trpc.userList.query()`, if we grab the routeName as the first value of the path (’userList’) and the procedureType as the last value of the path (’query’), we can determine that is get request is required. And likewise for post requests.

## Conclusion

Hopefully, I’ve been able to explain how, through the use of TypeScript type inference, conditionals, and JavaScript proxies, a basic implementation of tRPC can be achieved. If you haven’t already, take a look at the code here: [https://github.com/ejaycoleman/tRPClone](https://github.com/ejaycoleman/tRPClone), and run both the server and client to see how it works.

My implementation isn’t a direct clone either — there are a lot of parts I’ve missed out on for simplicity and other parts I’ve implemented in different ways. My overall intention is to demonstrate the complexities of tRPC and how they achieve the simplicity it brings to users.
