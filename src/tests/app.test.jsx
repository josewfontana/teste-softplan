import React from "react";
import { testRender, fixtureSet, makeTestStore } from "./testUtils";
import { render, fireEvent, waitFor, screen, cleanup } from "@testing-library/react";
import '@testing-library/jest-dom';

import { createStore } from 'redux'
import { Provider } from 'react-redux'
import axios from 'axios';
import * as Actions from '../redux/actions';

import App from "../App";
import Search from "../components/search/search";

import Mock from './mock.json';

afterEach(cleanup);

describe("the LegoSetImage component", () => {
  it("shows the image of the current lego set and zooms on click", () => {
    const store = makeTestStore();
    store.dispatch(
      Actions.fetchCountriesSuccess({
        ...Mock,
        payload: Mock
      })
    );
    store.dispatch(Actions.fetchCountries());

    const { getByTestId } = testRender(<App />, { store, initialState: Mock });

    expect(screen.getByDisplayValue("Filtre")).toBeTruthy();
  });
});
