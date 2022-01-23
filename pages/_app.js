import React from "react";
import Layout from "../components/Layout.js"
import '../styles/globals.css'
import store from "../redux/store.js";
import { Provider } from "react-redux";
import 'bootstrap/dist/css/bootstrap.css'


function MyApp({ Component, pageProps }) {
   return (
      <Provider store={store}>
         {/* <React.StrictMode> */}
         <Layout>
            <Component {...pageProps} />
         </Layout>
         {/* </React.StrictMode> */}
      </Provider>
   );
}

export default MyApp

