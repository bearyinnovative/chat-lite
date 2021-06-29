import { useEffect } from "react";
import { Provider } from "react-redux";
import "../styles/globals.css";
import 'antd/dist/antd.css';
import { store } from "../store";

function MyApp({ Component, pageProps }) {
  useEffect(() => {
    (window as any).__store = store;
  }, []);

  return (
    <Provider store={store}>
      <Component {...pageProps} />
    </Provider>
  );
}

export default MyApp;
