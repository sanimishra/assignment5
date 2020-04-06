/* eslint-disable react/destructuring-assignment */
/* eslint "react/react-in-jsx-scope": "off" */
/* eslint "react/jsx-no-undef": "off" */
/* eslint "no-alert": "off" */
/* eslint no-restricted-globals: "off" */
import 'babel-polyfill';
import 'whatwg-fetch';
import React from 'react';
import ReactDOM from 'react-dom';

import { BrowserRouter as Router } from 'react-router-dom';
import Routes from './Routes.jsx';
const element = (
    <Router>
      <Routes />
    </Router>
  );
ReactDOM.render(element, document.getElementById('contents'));
