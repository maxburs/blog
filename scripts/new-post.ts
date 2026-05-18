import fs from 'node:fs/promises';
import path from 'node:path';

function template({ date }: { date: string }) {
  return `---
title: 
date: ${date}
excerpt: 
tags: 
---

##

`;
}

async function main() {
  const name = process.argv[2];
  const date = new Date().toISOString().slice(0, 10);
  const data = template({ date });
  await fs.writeFile(
    path.join(import.meta.dirname, '../_posts', `${date} ${name}.md`),
    data,
  );
}

main();
