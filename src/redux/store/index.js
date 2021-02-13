import { createStore, applyMiddleware } from 'redux';
import composeWithDevTools from 'redux-devtools-extension';
import thunk from 'redux-thunk';
import logger from 'redux-logger';

import { Reducers } from '../reducers';

export const Store = createStore(Reducers,
  applyMiddleware(thunk)
);
