# TypeScript: `any` vs `unknown` and Type Narrowing

With `any`, TypeScript stops protecting the type. There's a chance to introduce bug in the code during development. That's why it is called type safety hole.

With `unknown` the TypeScript protection is still active, but we do not know the data type yet. So the safety level is higher with `unknown` type than with `any` type.

Type narrowing gradually makes the type more specific through checks.

## Example

```typescript
function handleData(data: unknown) {
    if (Array.isArray(data)){
        // TypeScript now knows that it is an array
        data.forEach(item => console.log(item));
    }
}
```

So it is better to use `unknown` + type narrowing when we are dealing with unpredictable data.

So it is better to avoid `any` as much as possible, especially in a large codebase.