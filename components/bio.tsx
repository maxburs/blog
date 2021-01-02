import Image from 'next/image';

import style from './bio.module.css';

const author = 'Maxwell Burson';

export const Bio: React.FC = () => (
  <section className={style.bio}>
    <Image
      alt="Picture of the author"
      src="/me.jpg"
      className={style.avatar}
      width={50}
      height={50}
    />
    <p>
      <strong>{author}</strong> writes about web development and TypeScript.
    </p>
  </section>
);
