---
title: TypeScript Map Narrowing
date: '2019-09-22'
description: Where I come to terms with TypeScript not being perfect
tags: TypeScript
---

# Something I like doing in JavaScript

A common pattern in JavaScript is to refactor this:

```js
function handle(event) {
  switch (event.kind) {
    case 'goblins_are_coming':
      repelMonsters(event);
    case 'inlaws_are_coming':
      stockFridge(event);
  }
}
```

into this:

```js
const eventHandlers = {
  goblins_are_coming: repelMonsters,
  inlaws_are_coming: stockFridge,
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

# Where I try to do it in TypeScript

Assume this is written above the rest of the TypeScript examples:

```ts
interface GoblinEvent {
  kind: 'goblins_are_coming';
  smell: number;
}

interface InlawEvent {
  kind: 'inlaws_are_coming';
  notice: number;
}

type OurEvent = GoblinEvent | InlawEvent;

declare const repelMonsters: (event: GoblinEvent) => void;
declare const stockFridge: (event: InlawEvent) => void;
```

TypeScript plays fine with the first JavaScript example.

```ts
function handle(event: InlawEvent | GoblinEvent) {
  switch (event.kind) {
    case 'goblins_are_coming':
      repelMonsters(event);
    case 'inlaws_are_coming':
      stockFridge(event);
  }
}
```

But cant make sense of the second one:

```ts
const eventHandlers = {
  goblins_are_coming: repelMonsters,
  inlaws_are_coming: stockFridge,
};

declare const e: OurEvent;

eventHandlers[e.kind](e);
```

This ☝ produces this 👇 error message:

```
Argument of type 'OurEvent' is not assignable to parameter of type 'GoblinEvent & InlawEvent'.
  Type 'GoblinEvent' is not assignable to type 'GoblinEvent & InlawEvent'.
    Property 'notice' is missing in type 'GoblinEvent' but required in type 'InlawEvent'.ts(2345)

```
