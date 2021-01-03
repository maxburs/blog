---
title: 'Gatsby vs Next.js: Blog Starters Showdown ⚔️'
date: '2021-01-02'
excerpt: Yesterday I switched from using Gatsby to generate my blog to Next.js. ... Here I'll narrate my experience with both of them, and pit them against each other in a blog-on-blog showdown!
tags: Gatsby, Next.js, Blogging, React
---

Yesterday I switched from using Gatsby to generate my blog to Next.js. I had forked [Gatsby's blog starter](https://github.com/gatsbyjs/gatsby-starter-blog), and just forked Next.js's [blog-starter-typescript](https://github.com/vercel/next.js/tree/canary/examples/blog-starter-typescript) example. Here I'll narrate my experience with both of them, and pit them against each other in a blog-on-blog showdown!

## TLDR

Gatsby's more barebones approach to styling and layout match my taste better than Next.js's more filled-in blog template. Gatsby's plugins make it easy to add functionality, and Next.js doesn't have anything comparable. I'd recommend Gatsby to people picking between the two, but I'm not reverting my switch to Next.js any time soon.

## Gatsby

[https://gatsby-starter-blog-demo.netlify.app/](https://gatsby-starter-blog-demo.netlify.app/)

It was real easy to get started with Gatsby. I felt comfortable deploying the starter mostly it as-is, and the plugins made it real easy to add functionality. I used the [gatsby-remark-prismjs](https://www.gatsbyjs.com/plugins/gatsby-remark-prismjs/?=prismjs) plugin to add syntax highlighting to my code blocks.

The starter wasn't 100% to my liking though. To understand everything in the starter you need to know GraphQL, which I don't. I opted to ignore the query under each page and pray they didn't break.

I also really wanted types, which wasn't included out of the box. I was able to add TypeScript types to the JavaScript code easily enough, but much of the logic is in the plugins and GraphQL, so I didn't end up with much type coverage.

## Next.js

[https://next-blog-starter.now.sh/](https://next-blog-starter.now.sh/)

Next.js's starter blog needed more tweaks before I was ready to use it. The most glaring issue was that the example wouldn't start.

```
next
ready - started server on http://localhost:3000
error - ./styles/index.css (./node_modules/css-loader/dist/cjs.js??ref--5-oneOf-6-1!./node_modules/next/dist/compiled/postcss-loader/cjs.js??ref--5-oneOf-6-2!./styles/index.css)
Error: PostCSS plugin postcss-nested requires PostCSS 8.
```

The starter looks to be make for a blog with multiple contributors, meaning I had to delete a bunch of stuff, and it is missing and RSS feed. (Although it does have have [a link to a RSS feed in its head](https://github.com/vercel/next.js/blob/85bd4a9ccba6def894f01df3fa9ef2f4e2e05d99/examples/blog-starter-typescript/components/meta.tsx#L34) 🤔)

Adding code block syntax highlighting was a real hassle. Maybe I just don't know what to search for? I Eventually I ended up looking through the source code for [gatsby-remark-prismjs](https://www.gatsbyjs.com/plugins/gatsby-remark-prismjs/?=prismjs), and didn't see anything Gatsby specific. In fact, it's not Gatsby-not-specific enough that [I was able to use it with Next.js](https://github.com/maxburs/blog/blob/ae76c5e772325c513db474e93ef78251377a0825/lib/markdownToHtml.ts)! The only price I appear to be paying is a new warning on `yarn install`.

```
warning " > gatsby-remark-prismjs@3.10.0" has unmet peer dependency "gatsby@^2.0.0".
```

You think they'd take a pull request to remove the Gatsby dependency? 🤔

Out of the box Tailwind CSS is used for styling. Tailwind had been getting a lot of good press recently, so it seems like a good choice? if I didn't already have styles from the Gatsby version of my blog I likely would have kept it around.

## Pros and Cons

### Gatsby

- 👍 Out of the box the template was a good fit for my needs
- 👍 Rich plugin ecosystem makes it easy to enhance your blog with new functionality
- 👎 Requires learning GraphQL to take full advantage of its capabilities
- 👎 No out-of-the-box TypeScript option
- 🤷‍♂️ [Typography.js](https://github.com/kyleamathews/typography.js/) is used for styles out of the box

### Next.js

- 👍 Both JavaScript and TypeScript variations
- 👎 Doesn't have anything to match Gatsby's rich plugin ecosystem
- 👍 [getStaticProps](https://nextjs.org/docs/basic-features/data-fetching#getstaticprops-static-generation) makes it easy to use existing Node knowledge to add data non-javascript stuff built time
- 👍 [Tailwind CSS](https://www.tailwindapp.com/) is used for styles out of the box
- 👎 I got a build error when starting the example for the first time
