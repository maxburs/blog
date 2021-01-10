import { AppProps } from 'next/app';

import 'prismjs/themes/prism-okaidia.css';

import './global.scss';

const App: React.FC<AppProps> = ({ Component, pageProps }: AppProps) => {
  return <Component {...pageProps} />;
};

export default App;
