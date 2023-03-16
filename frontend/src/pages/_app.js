import "@/styles/globals.css";
import { Provider } from "react-redux";
import { wrapper } from "../redux/Store";
import {Cormorant_Garamond} from '@next/font/google'

const cormorant = Cormorant_Garamond({
  subsets: ['latin'],
  variable: '--font-cormorant',
  weight: '400',
  display: 'swap',
});

export default function App({ Component, ...rest }) {
  const { store, props } = wrapper.useWrappedStore(rest);
  const { pageProps } = props;

  return (
    <Provider store={store}>
      <div className="font-graphik">
      <Component {...pageProps} />
    </div>
    </Provider>
  );
}
