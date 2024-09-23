import { Feed } from 'feed';
import fs from 'fs';

import constants from '../constants.json';
import { getAllPosts } from '../src/lib/api';
import { markdownToHtml } from '../src/lib/markdown-to-html';

const url = process.env.__URL ?? constants.fallbackUrl;

async function generateFeeds() {
  const copyright = fs.readFileSync(`${__dirname}/../LICENSE-posts`).toString();

  const appPosts = getAllPosts();

  const feed = new Feed({
    title: constants.title,
    id: url,
    link: url,
    language: 'en',
    favicon: `${url}/favicon/favicon.ico`,
    updated: new Date(appPosts[0].date),
    copyright,
    feedLinks: {
      json: `${url}/json`,
      atom: `${url}/atom`,
    },
    author: constants.author,
  });

  for (const post of appPosts) {
    feed.addItem({
      title: post.title,
      id: post.slug,
      link: `${url}/posts/${post.slug}`,
      description: post.excerpt,
      content: await markdownToHtml(post.content),
      date: new Date(post.date),
    });
  }

  fs.writeFile(`${__dirname}/../public/rss.xml`, feed.rss2(), (err) => {
    if (err) {
      throw err;
    }
  });
  fs.writeFile(`${__dirname}/../public/atom.xml`, feed.atom1(), (err) => {
    if (err) {
      throw err;
    }
  });
}

generateFeeds();
