import logo from './logo.svg';
import './App.css';
import React, { Component, useState, useCallback, useEffect } from 'react';
import { connect, useSelector, useDispatch, useStore, shallowEqual } from 'react-redux';
import { bindActionCreators } from 'redux';
import { fetchCountries, filterCountries } from './redux/actions';

import Card from './components/cards/card.js';
import Search from './components/search/search';

const App = function(props){
  const dispatch = useDispatch();
  const {
    foundCountries,
    filteredCountries,
    filterCountries
  } = props;

  useEffect(() => {
    if(foundCountries == null || foundCountries.length == 0){
      props.fetchCountries();
    }
    setAllCountries(foundCountries);
  }, [foundCountries]);

  useEffect(() => {
    if(filteredCountries.length != 0){
      filtered = filteredCountries;
      setAllCountries(filteredCountries);
      totalCountries = filteredCountries.length;
    }else{
      filtered = foundCountries;
      setAllCountries(foundCountries);
      totalCountries = foundCountries.length;
    }

    console.log(filteredCountries)
  }, [filteredCountries]);

  const [allCountries, setAllCountries] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [countriesPerPage, setCountriesPerPage] = useState(15);
  const [region, setRegion] = useState('');

  let totalCountries = foundCountries.length;
  let filtered = foundCountries;

  handleClick = handleClick.bind(this);

  function handleClick(event) {
    setCurrentPage(Number(event.target.id));
    setAllCountries(foundCountries);
  }

  //Filtrar Países no Menu Lateral
  function filterCountriesDOM(data){
    const foundData = [];
    const region = data;

    foundCountries.filter(item => {
      if(data != ''){
        if(region.match(item.region)){
          foundData.push(item);
        }
      }else{
        foundData.push(item);
      }
    })
    setCurrentPage(1);
    setRegion(region);
    return foundData;
  }

  //Paginação
  const indexOfLastCountry = currentPage * countriesPerPage;
  const indexOfFirstCountry = indexOfLastCountry - countriesPerPage;

  function sliceCountries(data, initialIndex, lastIndex){
    return data.slice(indexOfFirstCountry, indexOfLastCountry);
  }

  let currentCountries = sliceCountries(allCountries, indexOfFirstCountry, indexOfLastCountry);

  let pageNumbers = [];

  console.log(filtered);
  for (let i = 1; i <= Math.ceil(filteredCountries.length / countriesPerPage); i++) {
    pageNumbers.push(i);
  }

  if(foundCountries == null || foundCountries.length == 0){
    return null;
  }else{
    return (
      <div className="container" id="click-filter-result">
        <div className="menu">
        <div>
          <Search
            items={foundCountries}
          />
        </div>
          <p>Filtre os Países por região:</p>
          <ul>
            <li className={region == '' ? 'active' : ''}>
              <button onClick={() => filterCountries(filterCountriesDOM(""))}>
                Todos
              </button>
            </li>
            <li className={region == 'Africa' ? 'active' : ''}>
              <button onClick={() => filterCountries(filterCountriesDOM("Africa"))}>
                África
              </button>
            </li>
            <li className={region == 'Americas' ? 'active' : ''}>
              <button onClick={() => filterCountries(filterCountriesDOM("Americas"))}>
                Américas
              </button>
            </li>
            <li className={region == 'Asia' ? 'active' : ''}>
              <button onClick={() => filterCountries(filterCountriesDOM("Asia"))}>
                Ásia
              </button>
            </li>
            <li className={region == 'Europe' ? 'active' : ''}>
              <button onClick={() => filterCountries(filterCountriesDOM("Europe"))}>
                Europa
              </button>
            </li>
            <li className={region == 'Oceania' ? 'active' : ''}>
              <button onClick={() => filterCountries(filterCountriesDOM("Oceania"))}>
                Oceania
              </button>
            </li>
            <li className={region == 'Polar' ? 'active' : ''}>
              <button onClick={() => filterCountries(filterCountriesDOM("Polar"))}>
                Polar
              </button>
            </li>
          </ul>
        </div>
        <div>
          <h1>Lista de países do mundo <span>(Total: {allCountries.length})</span></h1>
          <div className="container-cards">
          {currentCountries.map(item => (
            <Card
              key={item.alpha2Code}
              name={item.translations.br}
              alphaCode={item.alpha2Code}
              flag={item.flag}
              capital={item.capital}
            />
          ))}
          </div>
          <div className="pagination-container">
            <p>Página <b>{currentPage}</b> de <b>{pageNumbers.length}</b></p>
            <ul>
              {pageNumbers.map(number => (
                <li
                  key={number}
                  id={number}
                  onClick={handleClick}
                  className={currentPage == number ? 'active' : ''}
                >
                  {number}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = store => ({
  foundCountries: store.Countries.countries,
  filteredCountries: store.FilterCountries.filteredCountries
});

const mapDispatchToProps = dispatch =>
  bindActionCreators({ fetchCountries, filterCountries }, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(App);
