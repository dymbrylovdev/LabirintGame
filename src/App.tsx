import React from 'react';
import {Provider} from "react-redux";
import {store} from "./store/store";
import Container from "./components/board/Container";
import Navigate from "./components/navigate/Navigate";

function App() {
  return (
      <Provider store={store}>
          <Container/>
          <Navigate/>
      </Provider>
  );
}

export default App;
