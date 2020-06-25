import React from 'react';
import { Provider } from 'react-redux';
import configureStore from './store';
import Main from './Pages/Main/Main';
import './index.scss';

const store = configureStore({});

const App = () => (
  <Provider store={store}>
    <Main />
  </Provider>
);

export default App;
