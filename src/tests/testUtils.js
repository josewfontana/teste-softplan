import React from 'react'
import { render } from '@testing-library/react'
import { Provider } from 'react-redux'
import { Store } from '../redux/store'

const TestProvider = ({
  store,
  children
}) => <Provider store={store}>{children}</Provider>

export function testRender(ui, { store, ...otherOpts }) {
  return render(<TestProvider store={store}>{ui}</TestProvider>, otherOpts)
}

export function makeTestStore(opts = {}) {
  const store = Store
  const origDispatch = store.dispatch
  store.dispatch = jest.fn(origDispatch)
  return store
}
