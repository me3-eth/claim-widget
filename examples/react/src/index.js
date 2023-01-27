import React from 'react';
import ReactDOM from 'react-dom';
import { HashRouter } from 'react-router-dom';

import 'reset-css';
import 'normalize.css';
import App from './App';

const { worker } = require('./mocks/browser')
worker.start()

ReactDOM.render(
  <HashRouter>
    <App />
  </HashRouter>,
  document.getElementById('root')
);
