import axios from 'axios';

const RestCountriesService = () => {
  return axios.get("https://restcountries.eu/rest/v2/all")
}

export default RestCountriesService;
