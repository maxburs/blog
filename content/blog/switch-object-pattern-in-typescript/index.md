---
title: Making the switch => object pattern work in TypeScript
date: '2019-09-22'
description: Where I come to terms with TypeScript not being perfect
tags: TypeScript
---

## Switch => Object is a great pattern

I'm a huge fan of the JavaScript pattern where replaces a swith like this:

```js
function handle(event) {
  switch (event.kind) {
    case 'goblins_are_coming':
      repelMonsters(event);
    case 'family_is_coming':
      stockFridge(event);
  }
}
```

with an object:

```js
const eventHandlers = {
  goblins_are_coming: repelMonsters,
  family_is_coming: stockFridge,
};
```

The second method really shines when we don't want to specify the kinds of event are handling in the same file.

```js
import familyEventHandlers from './familyEventHandlers';

export default const eventHandlers = {
  goblins_are_coming: repelMonsters,
  ...familyEventHandlers,
};
```

## The pattern doesn't work in TypeScript very well

Assume this is written above the rest of the TypeScript examples:

```ts
interface GoblinEvent {
  kind: 'goblins_are_coming';
  smell: number;
}

interface FamilyEvent {
  kind: 'family_is_coming';
  notice: number;
}

type OurEvent = GoblinEvent | FamilyEvent;

declare const repelMonsters: (event: GoblinEvent) => void;
declare const stockFridge: (event: FamilyEvent) => void;
```

TypeScript plays fine with the first JavaScript example.

```ts
function handle(event: FamilyEvent | GoblinEvent) {
  switch (event.kind) {
    case 'goblins_are_coming':
      repelMonsters(event);
    case 'family_is_coming':
      stockFridge(event);
  }
}
```

But cant make sense of the second one:

```ts
const eventHandlers = {
  goblins_are_coming: repelMonsters,
  family_is_coming: stockFridge,
};

declare const e: OurEvent;

eventHandlers[e.kind](e);
```

This ☝ produces this 👇 error message.

```
Argument of type 'OurEvent' is not assignable to parameter of type 'GoblinEvent & FamilyEvent'.
  Type 'GoblinEvent' is not assignable to type 'GoblinEvent & FamilyEvent'.
    Property 'notice' is missing in type 'GoblinEvent' but required in type 'FamilyEvent'.ts(2345)

```

## Here's the great (terrible?) hack to make it work

```ts
function handle<P extends OurEvent, T extends P['kind']>(
  payload: P,
  stuff: { [K in T]: (arg0: P) => void }
) {
  stuff[payload.kind](payload);
}

handle(e, eventHandlers);
```

No type errors! 🎊

... but with a catch.

This works because the inteface is still generic when accessed. To keep this compiling, the mapped type generic as long as the event is generic.

That is to say, the following produces a type error:

```ts
function handleWrapper<P extends OurEvent>(payload: P) {
  handle(payload, eventHandlers);
}
```

## TLDR:

Check this out:

```ts
function handle<P extends OurEvent, T extends P['kind']>(
  payload: P,
  stuff: { [K in T]: (arg0: P) => void }
) {
  stuff[payload.kind](payload);
}
```