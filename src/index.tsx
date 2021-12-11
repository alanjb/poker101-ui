import React from 'react';
import ReactDOM from 'react-dom';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter } from "react-router-dom";
import AppContainer from "./app/components/AppContainer";
import 'bootstrap/dist/css/bootstrap.min.css';
import './app/styles/main.scss';

ReactDOM.render(
    <BrowserRouter >
      <AppContainer/>
    </BrowserRouter>,
    document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();