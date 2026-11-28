import { Meta, Title } from '@solidjs/meta';

import * as constants from '../constants';
import { Router } from './router';

// Solid's Vite plugin requires a default export.
export default function App() {
  return (
    <Router>
      {(props) => (
        <>
          {/* Defaults, which pages can override. */}
          <Title>{constants.title}</Title>
          <Meta name="description" content={constants.description} />
          <Meta
            name="keywords"
            content="blog, typescript, react, javascript, programming"
          />
          {props.children}
        </>
      )}
    </Router>
  );
}
