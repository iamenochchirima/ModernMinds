import "@/styles/globals.css";
import { Provider } from "react-redux";
import { wrapper } from "../redux/Store";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function App({ Component, ...rest }) {
  const { store, props } = wrapper.useWrappedStore(rest);
  const { pageProps } = props;

  return (
    <Provider store={store}>
      <div className="font-graphik">
      <ToastContainer />
      <Component {...pageProps} />
    </div>
    </Provider>
  );
}
