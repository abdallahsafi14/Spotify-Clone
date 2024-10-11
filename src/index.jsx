import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter as Router } from 'react-router-dom';
import App from './App';
import './index.css';
import { StateProvider } from './utils/StateProvider';
import reducer ,{ initialState } from './utils/reducer';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>

      <Router>
        <StateProvider initialState={initialState} reducer={reducer}>
        <App />
        </StateProvider>
      </Router>
  </React.StrictMode>,
);
