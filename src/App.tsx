import React from "react";
import { Provider } from "react-redux";
import configureStore from "./configureStore";
import Root from "./Containers/Root";

const store = configureStore();

export default function App() {
  return (
    <Provider store={store}>
      <Root />
    </Provider>
  );
}
