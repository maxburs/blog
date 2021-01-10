import style from './bio.module.css';

const author = 'Maxwell Burson';

export const Bio: React.FC = () => (
  <section className={style.bio}>
    <img
      alt="Picture of the author"
      src="/me/50.jpg"
      srcSet="/me/50.jpg 50w, /me/100.jpg 100w"
      className={style.avatar}
      width={50}
      height={50}
      sizes="50px"
    />
    <p>
      <strong>{author}</strong> writes about web development and TypeScript.
    </p>
  </section>
);
