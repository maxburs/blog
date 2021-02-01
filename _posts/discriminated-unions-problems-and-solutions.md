---
title: 'TypeScrip discriminated unions: Problems and solutions'
date: '2021-01-31'
excerpt: Solutions to problems with TypeScript's discriminated unions
tags: typescript, discriminated unions, generics, optional chaining
---

Disclaimer: Following solutions create new problems, including more types and sometimes more JavaScript.

## Problem: Union properties don't narrow

```tsx
declare function assertType<T>(arg: T);

interface Circle {
  kind: 'circle';
}
interface Square {
  kind: 'square';
}

interface House<TDoor> {
  door: TDoor;
}

declare const house: House<Circle | Square>;

if (house.door.kind === 'circle') {
  // Argument of type 'House<Circle | Square>' is not assignable to parameter of
  // type 'House<Circle>'.
  //                        👇👇👇
  assertType<House<Circle>>(house);
}
```

### Solution 1: Narrow the property by itself, then reconstruct

```tsx
declare const house: House<Circle | Square>;

const { door } = house;

if (door.kind === 'circle') {
  assertType<House<Circle>>({ door });
}
```

### Solution 2: Union property to union the whole thing

```tsx
declare function assertType<T>(arg: T);

type Shape = Circle | Square;

interface House<TDoor extends Shape = Shape> {
  kind: TDoor['kind'];
  door: TDoor;
}

declare const house: House<Circle> | House<Square>;

// Still does not work
if (house.door.kind === 'circle') {
  // Argument of type 'House<Circle> | House<Square>' is not assignable to parameter of
  // type 'House<Circle>'.
  //                        👇👇👇
  assertType<House<Circle>>(house);
}

// Using the new property we added does work though!
if (house.kind === 'circle') {
  assertType<House<Circle>>(house);
}
```

Related TypeScript issue: [https://github.com/Microsoft/TypeScript/issues/27272](https://github.com/Microsoft/TypeScript/issues/27272)

## Problem: Discriminated union definitions are verbose

```tsx
// So verbose! 👎 Too much boilerplate for a one-off use case.

interface Circle {
  kind: 'circle';
}

interface Square {
  kind: 'square';
}

type Shape = Circle | Square;

const data: Shape = { kind: 'circle' };
```

### Solution: Skip defining types

```tsx
// More pragmatic

type Shape2 = { kind: 'circle' } | { kind: 'square' };

const data2: Shape2 = { kind: 'circle' };

/* --- */

// Most pragmatic! 👍 Don't bother defining the types at all. We'll still get
// type errors if we mess up.
const data3 = { kind: 'circle' as const };
```

## Problem: Pulling a property off a union is verbose

### Solution: Define more types to allow direct property access

```tsx
type Result<T> = { kind: 'ok'; value: T } | { kind: 'err'; msg: string };

declare const result: Result<number>;

// So verbose! 🤮 (More of my code looks like this than would ideal)
const value = result.kind === 'ok' ? result.value : undefined;

/* --- */

type Result2<T> =
  | { kind: 'ok'; value: T; msg?: undefined }
  | { kind: 'err'; value?: undefined; msg: string };

declare const result2: Result2<number>;

// Much better! 😌
const value2 = result2.value;

declare const result3: Result2<{ nested: string }>;

// And it works with optional chaining! 🎊
const value3 = result3.value?.nested;
```
