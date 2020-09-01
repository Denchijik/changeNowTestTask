import React from 'react';
import { createStore } from "redux";
import { Provider } from 'react-redux';
import './styles.css';
import Wrapper from '../Wrapper';
import rootReducer from "../../store/rootReducer";

const store = createStore(rootReducer);

function App() {
  return (
    <Provider store={store}>
      <div className="App">
        <header className="App-header">
          <Wrapper/>
        </header>
      </div>
    </Provider>
  );
}

export default App;
