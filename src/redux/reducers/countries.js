import { FETCH_REQUEST_COUNTRIES, FETCH_SUCCESS_COUNTRIES, FETCH_FAILURE_COUNTRIES, FILTER_COUNTRIES_ARRAY, EDIT_COUNTRY } from '../actions/actionTypes';

const initialState = {
  loading: false,
  countries: [],
  error: ''
};

export const Countries = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_REQUEST_COUNTRIES:
      return {
        ... state,
        loading: true
      }
      break;
    case FETCH_SUCCESS_COUNTRIES:
      return {
        loading: false,
        countries: action.payload,
        error: '',
      }
      break;
    case FETCH_FAILURE_COUNTRIES:
      return {
        loading: false,
        countries: [],
        error: action.payload
      }
      break;
    default: {
      return state
    };
  }
};

const initialStateFiltered = {
  filteredCountries: []
};

export const FilterCountries = (state = initialStateFiltered, action) => {
  switch (action.type) {
    case FILTER_COUNTRIES_ARRAY:
    console.log(action);
      return {
        ...state,
        filteredCountries: action.filteredCountries
      };
    default:
      return state;
  }
};

export const UpdatedStateReducer = (state = initialState, action) => {
  switch (action.type) {
    case EDIT_COUNTRY:
      return {
        ...state,
        countries: action.updatedCountries
      };
    default:
      return state;
  }
};
