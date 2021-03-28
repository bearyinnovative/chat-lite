import { useEffect } from "react";
import { Provider } from "react-redux";
import "../styles/globals.css";
import { store } from "../store";

function MyApp({ Component, pageProps }) {
  useEffect(() => {
    window.__store = store;
  }, []);

  return (
    <Provider store={store}>
      <Component {...pageProps} />;
    </Provider>
  );
}

export default MyApp;
