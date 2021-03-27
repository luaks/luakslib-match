# [@luaks/match](https://www.npmjs.com/package/@luaks/match)

This library provides simple patternmatching, somewhat inspired by [vavr](https://docs.vavr.io/#_pattern_matching).

## Usage

The usage of this library is quite simple, you just create a matcher and use it with a bunch of cases.
A case is just a tuple of a predicate and a result provider.

```typescript
match('Hello, World!').with(
    [str => str.includes('a'), () => 'contains a'],
    [str => str.includes('e'), () => 'contains e'],
    [str => str.includes('i'), () => 'contains i'],
    [str => str.includes('o'), () => 'contains o'],
    [str => str.includes('u'), () => 'contains u']
) === 'contains e';
```

When no case matches `undefined` is returned.
If you want to have a catch-all case, you can just provide a predicate, that always matches.

```typescript
match('Hello, World!').with(
    [str => str.includes('a'), () => 'a'],
    [str => str.includes('b'), () => 'b'],
    [str => str.includes('c'), () => 'c'],
    [() => true, () => 'Nothing Matches']
) === 'Nothing Matches';
```

For better readability, it is recommended to wrap the predicates in nicely readable functions.

```typescript
const includes = char =>  str => str.includes(char);
const alwaysMatch = () => () => true;

match('Hello, World!').with(
    [includes('a'), () => 'a'],
    [includes('b'), () => 'b'],
    [includes('c'), () => 'c'],
    [alwaysMatch(), () => 'Nothing Matches']
) === 'Nothing Matches';
```
