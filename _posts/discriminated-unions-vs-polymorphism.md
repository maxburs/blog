---
title: 'TypeScript: Picking between Discriminated Unions and Polymorphism'
date: '2021-01-17'
excerpt: Notes on picking between polymorphism and discriminated unions when writing typescript
tags: typescript, discriminated unions, polymorphism, polymorphism, typescript interface
---

Notes on picking between polymorphism and discriminated unions when writing typescript.

## Discriminated Unions

[https://www.typescriptlang.org/docs/handbook/unions-and-intersections.html]()

```tsx
// In TypeScript, discriminated unions are a union with a "discriminate".
// In the below example, "kind" is the discriminate.

export type Animal =
  | { kind: 'sheep' }
  | { kind: 'cat', breed: 'house' | 'wild' }
  | { kind: 'human', greeting: string }

export function speak(animal: Animal) {
  switch (animal.kind) {
		case 'cat':
      return animal.breed === 'domestic' ? 'meow' : 'ROAR';
    case 'sheep':
      return 'baa';
    case 'human':
      return animal.greeting;
    default
      assertNever(animal);
  }
}
```

- Simple use cases results in brief code
- Natural pattern is to `switch` in consuming code, which can become verbose when there is a large number of functions that access many variants.
- Callers of `speak` have full knowledge of the data in each animal.
- Caller of `speak` need to import the the type `Animal`, and the function separately.
- Logic for each variant lives alongside similar logic for other variants
- Naturally organizes functions near their consumers. Because of this:
  - `speak` is more likely it will get deleted when it is no longer used.
  - When code splitting, only required functions are be included (1)
- Because `Animal` doesn't control its own data, we likely won't be organizing many tests around `Animal`. Instead, many test will be against individual functions, or against callers of those functions.

### Possible file layout

![Discriminated union possible file layout](/posts/discriminated-unions-vs-polymorphism/union-file-layout.jpg)

## Polymorphism

[https://www.typescriptlang.org/docs/handbook/interfaces.html]()

```tsx
// Could also be a class
interface Animal {
  speak(): string;
}

class Sheep implements Animal {
  speak() {
    return 'baa';
  }
}

function createCat(breed: 'house' | 'wild'): Animal {
	return {
		breed,
    speak() {
      return this.breed === 'house' ? 'meow' : 'ROAR';
    }
  };
}

class Human implements Animal {
	constructor(
    private greeting: string;
  ) {};
  speak() {
    return this.greeting;
  }
}
```

- Scales cleanly to large numbers of variants
- Callers of speak only need to import `Animal`, or nothing at all.
- Information is hidden from callers of speak.
- `Animal` related logic can be more easily be stubbed out when testing other code.
- Logic for each variant lives alongside that variants definition
- Naturally organisms logic near type definitions. Because of this:
  - Tests naturally become written around `Animal`, and its functions.
  - Harder to delete/detect unused code
  - When code splitting, more unused methods will be included in bundles ([1)]()
- Allows for easy dependency injection

### Possible file layout

![Polymorphic possible file layout](/posts/discriminated-unions-vs-polymorphism/polymorphic-file-layout.jpg)

## Polymorphic Discriminated Unions

```tsx
interface IAnimal {
	kind: string;
  speak(): string;
}

class Sheep implements Animal {
	kind = 'sheep' as const;
  speak() {
    return 'baa';
  }
}

interface Cat extends IAnimal {
  kind: 'cat';
  breed: 'house' | 'wild';
}

function createCat(breed: Cat['breed']): Cat {
	return {
    kind: 'cat';
		breed,
    speak() {
      return this.breed === 'house' ? 'meow' : 'ROAR';
    }
  };
}

class Human implements Animal {
  kind: 'human' as const;
	constructor(
    private greeting: string;
  ) {};
  speak() {
    return this.greeting;
  }
}

export type Animal = Sheep | Cat | Human;
```

- Well suited for cases were _most_ logic should live near the type definitions, but we need to get access to concrete data outside of the definitions occasionally.
- Most complex. Easiest to make a mess of things with.

Notes

- Both patterns work fine with both mutable and functional styles. Don't sleep on using classes just because you're writing functionally.

(1): date-fns being slimmer than moment.js is a great example of this
