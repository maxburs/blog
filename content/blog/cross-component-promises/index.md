---
title: Cross Component Promises
date: "2018-03-31"
description: Async cross component communication can be easily (ish) achived without breaking component data flow rules
tags: React, JavaScript, Promise, Async/Await
---

Promises and async/await are awesome and should be used more often in the front end. I rarely see them getting used for anything besides ajax and that's a shame. I'll provide a short (contrived) example of a problem that can be simplified by using promises.

```jsx
async function seriousBusinessLogic(pickAColor) {
  const favorite = await pickAColor("Pick your favorite", [
    "steelblue",
    "darkgoldenrod",
    "olivedrab",
  ]);

  const leastFavorite = await pickAColor(
    "Please pick your least favorite of these colors",
    ["aquamarine", "darksalmon", "rebeccapurple"],
  );

  alert(`You picked ${favorite}, and ${leastFavorite}`);
}
```

Working example with React: https://codepen.io/genuine_smiles/pen/rbNOWO

The most immediate benefit is not spliting the above code into multiple parts. We can keep the dispatching logic and the resulting effects in the same block as they should be; as well as chaining multiple requests together easily and naturally.

Promises also let us keep this business logic hidden inside of a component when we need to call into outside components to get our answer. Suppose this question could be best answered using the ui of an already mounted component, and this was a regular callback that didn't return a promise. The component that needs the question answered would need to set a flag inside of itself and then wait for the answer to come down as a prop. _But_, other components that ask the same question may also receive the prop, and because the answer is stateful we would need to call another callback to clear the answer prop.

This could all be avoided by moving all this logic and state into a higher component, but, that defeats our original goal of isolation. On the other hand, if the qustion can be answered by a modal inside of the current class we should likely just do that.

I've used this trick successfully in these situations:

- The question was being asked a _lot_. We could just render a modal in the current context whenever we need to and be done with it; but creating a service to answer a frequent question saves a large amount of time.
- The question could only be answered by other components. Other components need to be interacted with by the user to get the question answered or other components have state inside of them that we don't want to pass around.
