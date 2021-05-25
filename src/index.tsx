import React from 'react';
import ReactDOM from 'react-dom';
import reportWebVitals from './tests/reportWebVitals';
import Root from './root';

reportWebVitals();

ReactDOM.render(
  <React.StrictMode>
    <Root />
  </React.StrictMode>,
  document.getElementById('root')
);

export default Root;
