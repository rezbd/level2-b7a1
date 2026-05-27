# TypeScript Generics: Write Once, Work With Anything

Most developers hit the same wall at some point. You write a utility function, it works perfectly for strings, then someone passes in a number and suddenly you're debugging at 2am. The usual fix is either duplicating the function or surrendering to `any`. Neither is great. Generics are the actual solution.

---

## The Problem With `any`

Say we want a simple identity function, something that takes a value and returns it as is. Without generics, we might write this:

```typescript
function identity(value: any): any {
  return value;
}
```

It works. But the moment we use it, TypeScript goes quiet on us:

```typescript
const result = identity("hello");
// result: any
```

That `any` is TypeScript washing its hands of the problem. Autocomplete disappears. Error checking stops. We could write this next and TypeScript won't say a word:

```typescript
result.toFixed(2); // No compile error. Crashes at runtime.
```

The compiler trusted us, and we passed in a string. That's the trade-off with `any` we get flexibility, but we pay for it in runtime surprises.

---

## Enter Generics

A generic is a type placeholder. Instead of locking a function to a specific type we say: *"I don't know what type this will be yet figure it out when it's called."*

```typescript
function identity<T>(value: T): T {
  return value;
}
```

`T` is just a name a convention, not a keyword. You could call it `Item`, `Payload`, or anything else. What matters is that TypeScript now tracks the actual type through the function:

```typescript
const str = identity("hello");  // str: string
const num = identity(42);       // num: number
const flag = identity(true);    // flag: boolean
```

TypeScript infers `T` from what we pass in. We get back exactly what we put in, typed correctly, with no `any` in sight.

---

## Generic Arrays

The same idea scales up. If we want a function that returns the first item in an array:

```typescript
function first<T>(arr: T[]): T | undefined {
  return arr[0];
}

const names = first(["Alice", "Bob", "Carol"]); // string | undefined
const scores = first([98, 87, 76]);              // number | undefined
```

One function. Two different types. Both fully typed.

---

## Generic Interfaces

Generics aren't limited to functions. They're just as useful when defining data shapes:

```typescript
interface ApiResponse<T> {
  data: T;
  status: number;
  message: string;
}
```

Now we can describe what our API returns without writing a separate interface for every endpoint:

```typescript
interface User {
  id: number;
  name: string;
}

interface Post {
  id: number;
  title: string;
  body: string;
}

const userResponse: ApiResponse<User> = {
  data: { id: 1, name: "Alice" },
  status: 200,
  message: "OK",
};

const postResponse: ApiResponse<Post> = {
  data: { id: 42, title: "Generics", body: "..." },
  status: 200,
  message: "OK",
};
```

The wrapper stays the same. The content is strictly typed.

---

## Constraints: Generics With Guardrails

Sometimes we need a generic that's flexible, but not *that* flexible. We know the input will have certain properties, we just don't know the full shape.

```typescript
function getProperty<T, K extends keyof T>(obj: T, key: K): T[K] {
  return obj[key];
}

const user = { id: 1, name: "Alice", email: "alice@example.com" };

const name = getProperty(user, "name");   // string
const id = getProperty(user, "id");       // number

// getProperty(user, "password");  // Error: 'password' doesn't exist on this type
```

`K extends keyof T` tells TypeScript that `key` must be an actual property of `obj`. We get the flexibility of a generic with the safety of a constraint.

---

## A Real Example: A Typed Data Store

Here's something closer to production code, a simple store that works with any type:

```typescript
class Store<T> {
  private items: T[] = [];

  add(item: T): void {
    this.items.push(item);
  }

  getAll(): T[] {
    return [...this.items];
  }

  findById<K extends keyof T>(key: K, value: T[K]): T | undefined {
    return this.items.find((item) => item[key] === value);
  }
}

interface Product {
  id: number;
  name: string;
  price: number;
}

const store = new Store<Product>();

store.add({ id: 1, name: "Keyboard", price: 120 });
store.add({ id: 2, name: "Monitor", price: 399 });

const item = store.findById("id", 1);
// item: Product | undefined
```

This class handles any data structure We throw at it. TypeScript knows the shape of every item in the store, which means `findById` returns `Product | undefined` not `any`, not `unknown`, not a guess.

---

## Multiple Type Parameters

When a function works with more than one type, you can use multiple parameters:

```typescript
function zip<A, B>(a: A[], b: B[]): [A, B][] {
  return a.map((item, i) => [item, b[i]]);
}

const pairs = zip(["a", "b", "c"], [1, 2, 3]);
// pairs: [string, number][]
```

TypeScript tracks both types independently and returns a properly typed array of tuples.

---

## When to Actually Use Generics

Generics are the right tool when:

- A function or class needs to work with multiple types without duplicating code
- The relationship between input and output types needs to be preserved
- We are building utility functions (wrappers, transformers, data fetchers)
- We are building reusable components that shouldn't care about the specifics of what's passed in

They're overkill when the type is always the same. A function that only ever handles `User` objects doesn't need to be generic.

---

## The Bottom Line

`any` is an escape hatch, not a solution. It trades type safety for flexibility and leaves bugs to surface at runtime instead of compile time. Generics give us the flexibility without the trade-off. Our functions stay reusable, our types stay accurate, and TypeScript stays useful.

Write the abstraction once. Let the type system do the rest.