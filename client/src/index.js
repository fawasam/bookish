import React from 'react';
import ReactDOM from 'react-dom';

//imports
import App from './App';
import './index.css';
import  {Provider} from 'react-redux';
import store from "./store"
import "./bootstrap.min.css"

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
);


