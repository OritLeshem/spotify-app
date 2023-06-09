import React from 'react';
import ReactDOM from 'react-dom/client';
import { RootCmp } from './root-cmp';
import { Provider } from 'react-redux'
import { store } from './store/store'


import reportWebVitals from './reportWebVitals';
import { BrowserRouter as Router } from 'react-router-dom';
import './assets/styles/main.scss'
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Provider store={store}>

    <Router>
      <RootCmp />
    </Router>
  </Provider>

);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
