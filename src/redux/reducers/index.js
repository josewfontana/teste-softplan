import { Countries, FilterCountries, UpdatedStateReducer } from './countries'
import { combineReducers } from 'redux';

export const Reducers = combineReducers({
  Countries,
  FilterCountries,
  UpdatedStateReducer,
});
