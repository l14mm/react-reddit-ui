import React from "react";
import { Provider } from "react-redux";
import configureStore from "./configureStore";
import Root from "./Containers/Root";

export const loadState = (stateName: string) => {
  try {
    const serializedState = localStorage.getItem(stateName);
    if (serializedState === null) {
      return undefined;
    }
    return JSON.parse(serializedState);
  } catch (err) {
    return undefined;
  }
};

const store = configureStore({
  authenticate: JSON.parse(localStorage.getItem("authenticate") || "{}")
});

// persist authenticate data
store.subscribe(() => {
  localStorage.setItem(
    "authenticate",
    JSON.stringify(store.getState().authenticate)
  );
});

export default function App() {
  return (
    <Provider store={store}>
      <Root />
    </Provider>
  );
}
