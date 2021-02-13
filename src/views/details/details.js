import './details.css';
import { render } from 'react-dom';
import React, { Component, useState, useCallback, useEffect } from 'react';
import { BrowserRouter as Router, Link, useParams } from 'react-router-dom';
import Map from '../../components/map/map.js'
import Search from '../../components/search/search'

import { connect, useSelector, useDispatch, useStore, shallowEqual } from 'react-redux';
import { bindActionCreators } from 'redux'
import { fetchCountries, updateStateAction } from '../../redux/actions';

const DetailsComponent = function(props){
  const dispatch = useDispatch()
  const {
    foundCountries,
    updatedCountries
  } = props;

  useEffect(() => {
    if(foundCountries == null || foundCountries.length == 0){
      props.fetchCountries();
    }
  }, [])

  let countryCode = useParams().graphCode;
  let selectedItem = [];
  let nextItem = [];
  let actualIndex = 0;
  let indexNext = 0;
  let indexPrevious = 0;
  const [editLabel, setLabel] = useState(false);
  const [selected, setData] = useState([]);
  foundCountries.forEach((item, i) => {
    if(item.alpha2Code == countryCode){
      selectedItem.push(item);
      actualIndex = i;
      indexNext = i + 1;
      indexPrevious = i - 1;
    }
  });

  const setSelected = () => {
    if(selected != selectedItem[0].alpha2Code){
      setLabel(false);
      setData(selectedItem[0].alpha2Code);
    }
  }

  if(selectedItem.length != 0){
    setSelected();
  }

  //Edição dos Países
  const [nameValue, setName] = useState('');
  const [capitalValue, setCapital] = useState('');
  const [nativeNameValue, setNativeName] = useState('');
  const [areaValue, setArea] = useState('');
  const [populationValue, setPopulation] = useState('');
  const [domainValue, setDomain] = useState('');
  if(nameValue == '' && selectedItem.length != 0){
    setName(selectedItem[0].translations.br);
    setCapital(selectedItem[0].capital);
    setNativeName(selectedItem[0].nativeName);
    setArea(selectedItem[0].area)
    setPopulation(selectedItem[0].population)
    setDomain(selectedItem[0].topLevelDomain)
  }

  const nameChange = event => {
    setName(event.target.value);
  }

  const capitalChange = event => {
    setCapital(event.target.value);
  }

  const nativeNameChange = event => {
    setNativeName(event.target.value);
  }

  const areaChange = event => {
    setArea(event.target.value);
  }

  const populationChange = event => {
    setPopulation(event.target.value);
  }

  const domainChange = event => {
    setDomain(event.target.value);
  }

  const updateCountry = (updateIndex) => {
    selectedItem[0].translations.br = nameValue;
    selectedItem[0].capital = capitalValue;
    selectedItem[0].nativeName = nativeNameValue;
    selectedItem[0].area = areaValue;
    selectedItem[0].population = populationValue;
    selectedItem[0].topLevelDomain = domainValue;
    setLabel(false);
    foundCountries[actualIndex].translations.br = nameValue;
    foundCountries[actualIndex].capital = capitalValue;
    foundCountries[actualIndex].nativeName = nativeNameValue;
    foundCountries[actualIndex].area = areaValue;
    foundCountries[actualIndex].population = populationValue;
    foundCountries[actualIndex].topLevelDomain = domainValue;
    dispatch(props.updateStateAction(foundCountries));
  }

  if(foundCountries == null || foundCountries.length == 0){
    return null;
  }else{
    return (
      <div>
        <div className="header">
          <ul>
            <li>
              {indexPrevious >= 0 &&
                <Link to={'/detail/' + foundCountries[indexPrevious].alpha2Code } onClick={() => setSelected() }>
                  &lt; Voltar ({foundCountries[indexPrevious].translations.br})
                </Link>
              }
            </li>
            <li>
              <Link to="/">
                Home
              </Link>
            </li>
            <li>
              {indexNext < foundCountries.length  &&
                <Link to={'/detail/' + foundCountries[indexNext].alpha2Code } onClick={() => setLabel() }>
                  Próximo ({foundCountries[indexNext].translations.br}) &gt;
                </Link>
              }
            </li>
          </ul>
          <div className="search">
            <div className="searchContainer">
              <Search
                items={foundCountries}
              />
            </div>
          </div>
        </div>
        <div className="country">
          <div className="countryName">
            {editLabel &&
              <div className="editFields">
                <div className="buttons">
                  <a className="btn cancel" onClick={() => setLabel(false) }>Cancelar edição</a>
                  <a className="btn save" onClick={() => updateCountry(actualIndex)}>Salvar edição</a>
                </div>
                <div className="editName">
                  <input
                    onChange={nameChange}
                    value={nameValue}
                  />
                </div>
                <div className="editCapital">
                  <span>Capital:</span>
                  <input
                    onChange={capitalChange}
                    value={capitalValue}
                  />
                </div>
              </div>
            }
            {!editLabel &&
              <div>
                  <a className="btn" onClick={() => setLabel(true) }>Editar dados do País</a>
                  <h1>
                    {selectedItem[0].translations.br} - {selectedItem[0].alpha2Code}
                  </h1>
                  <p>
                    <span>Capital:</span> {selectedItem[0].capital}
                  </p>
              </div>
            }
            <img src={selectedItem[0].flag} />
          </div>
          <div className="mapContainer">
            {!editLabel &&
              <div className="otherData">
                <p><span>Nome nativo: </span> {selectedItem[0].nativeName}</p>
                <p><span>Área:</span> {selectedItem[0].area}</p>
                <p><span>População: </span>{selectedItem[0].population}</p>
                <p><span>Domínio principal: </span> {selectedItem[0].topLevelDomain}</p>
                <p><span>Linguagens principais: </span></p>
                {
                  selectedItem[0].languages.map(item => (
                    <ul className="currency" key={item.iso639_1}>
                      <li><span>Nome:</span> {item.name}</li>
                      <li><span>Nome nativo:</span> {item.nativeName}</li>
                    </ul>
                  ))
                }
                <p><span>Moedas: </span></p>
                {
                  selectedItem[0].currencies.map(item => (
                    <ul className="currency" key={item.code}>
                      <li><span>Nome:</span> {item.name}</li>
                      <li><span>Código:</span> {item.code}</li>
                      <li><span>Símbolo:</span> {item.symbol}</li>
                    </ul>
                  ))
                }
              <p><span>Fronteiras:</span> {selectedItem[0].borders.map(item => (<i key={item}>{item}</i>))}</p>
              </div>
            }

            {editLabel &&
              <div className="otherData edit">
                <p>
                  <span>Nome nativo: </span>
                  <input
                    onChange={nativeNameChange}
                    value={nativeNameValue}
                  />
                </p>
                <p>
                  <span>Área:</span>
                  <input
                    onChange={areaChange}
                    value={areaValue}
                  />
                </p>
                <p>
                  <span>População: </span>
                  <input
                    onChange={populationChange}
                    value={populationValue}
                  />
                </p>
                <p>
                  <span>Domínio principal: </span>
                  <input
                    onChange={domainChange}
                    value={domainValue}
                  />
                </p>
                <p><span>Linguagens principais: </span></p>
                {
                  selectedItem[0].languages.map(item => (
                    <ul className="currency" key={item.iso639_1}>
                      <li><span>Nome:</span> {item.name}</li>
                      <li><span>Nome nativo:</span> {item.nativeName}</li>
                    </ul>
                  ))
                }
                <p><span>Moedas: </span></p>
                {
                  selectedItem[0].currencies.map(item => (
                    <ul className="currency" key={item.code}>
                      <li><span>Nome:</span> {item.name}</li>
                      <li><span>Código:</span> {item.code}</li>
                      <li><span>Símbolo:</span> {item.symbol}</li>
                    </ul>
                  ))
                }
              <p><span>Fronteiras:</span> {selectedItem[0].borders.map(item => (<i key={item}>{item}</i>))}</p>
              </div>
            }
            <div>
              <Map
                graphCode={selectedItem[0].alpha2Code}
              />
            </div>
          </div>
        </div>
      </div>
    )
  }
}

const mapStateToProps = store => ({
  foundCountries: store.Countries.countries
});

const mapDispatchToProps = dispatch =>
  bindActionCreators({ fetchCountries, updateStateAction }, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(DetailsComponent);
