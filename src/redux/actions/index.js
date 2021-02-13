import {
    FETCH_REQUEST_COUNTRIES,
    FETCH_SUCCESS_COUNTRIES,
    FETCH_FAILURE_COUNTRIES,
    FILTER_COUNTRIES_ARRAY,
    EDIT_COUNTRY
} from './actionTypes';

import RestCountriesService from '../../services/countries';

export const fetchCountriesRequest = () => ({
  type: FETCH_REQUEST_COUNTRIES
});

export const fetchCountriesSuccess = countries => ({
  type: FETCH_SUCCESS_COUNTRIES,
  payload: countries
});

export const fetchCountriesFailure = error => ({
  type: FETCH_FAILURE_COUNTRIES,
  payload: error
});

export const fetchCountries = () => {
  return (dispatch) => {
    dispatch(fetchCountriesRequest)
    RestCountriesService()
      .then(response => {
        const countries = response.data;
        dispatch(fetchCountriesSuccess(countries));
      })
      .catch(error => {
        const errorMessage = error.message;
        dispatch(fetchCountriesFailure(errorMessage));
      })
  }
}

export const filterCountries = value => ({
  type: FILTER_COUNTRIES_ARRAY,
  filteredCountries: value
});

export const updateStateAction = value => ({
  type: EDIT_COUNTRY,
  updatedCountries: value
});
