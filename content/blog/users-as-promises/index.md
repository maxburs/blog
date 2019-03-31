---
title: Promises are Great
date: '2018-02-24'
description: Promises should be for more than just server calls. We can use promises to both group related logic and to avoid unintented couplings.
tags: React, Javascript, TypeScript
---

TLDR: Abstracting modals and other kinds of user input like this can sometimes simplify things.

```jsx
async function component(pickThing) {
  const await thing1 = pickThing(
    <>Pick your favorite</>,
    thing => thing.color === 'blue',
  );

  const await thing2 = pickThing(
    <>Pick your favorite</>,
    thing => thing.color === 'red',
  );

  alert.success(<>`The things you picked are <i>thing1</i> and <i>thing2</i></>);
}
```

Why isn't this working??
