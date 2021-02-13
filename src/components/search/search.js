import './search.css';
import React, { Component, useState, useCallback, useEffect } from 'react';
import { BrowserRouter as Router, Link } from 'react-router-dom';

const Search = (props) => {
  const [filteredCountries, setFilteredCountries] = useState([]);
  const [inputValue, setInputValue] = useState('');

  const inputChange = event => {
    let newArray = [];
    const result = event.target.value.toLowerCase();
    if(result != ''){
      props.items.filter((item) => {
        const countryLowerCase = item.translations.br.toLowerCase();
        if(countryLowerCase.includes(result)){
          newArray.push(item);
        }
      })
    }else{
      newArray = [];
    }
    setFilteredCountries(newArray);
    setInputValue(result);
  }

  const inputClear = () =>{
    setFilteredCountries([]);
    setInputValue('');
  }

  return(
    <div>
      <input
        className="inputSearch"
        placeholder="Pesquisar"
        onChange={inputChange}
        data-testid="input-search-country"
        value={inputValue}
      />
      {filteredCountries.length != 0 &&
        <ul className="searchResult" data-testid="input-search-result">
        {filteredCountries.map(item => (
          <Link key={item.alpha2Code} onClick={() => inputClear()} to={'/detail/' + item.alpha2Code} data-testid={`${item.alpha2Code}-btn-redirect`}>
            <li>
              {item.translations.br}
            </li>
          </Link>
          )
        )
      }
      </ul>
    }
    </div>
  )
}

export default Search;
