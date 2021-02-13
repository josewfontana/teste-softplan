import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Switch, Route} from 'react-router-dom'
import { Provider } from 'react-redux';
import { Store } from './redux/store'


import './index.css';
import reportWebVitals from './reportWebVitals';

import App from './App';
import Details from './views/details/details.js';

ReactDOM.render(
  <Provider store={Store}>
    <Router>
      <Switch>
        <Route exact path="/" component={App} />
        <Route extact path="/detail/:graphCode" component={Details} />
      </Switch>
    </Router>
  </Provider>
  ,  document.getElementById('root')
);

reportWebVitals();
