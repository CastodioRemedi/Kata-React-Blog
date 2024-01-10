import React from 'react'
import ReactDOM from 'react-dom/client'
import { createStore } from 'redux'
import { Provider } from 'react-redux'
import { composeWithDevTools } from 'redux-devtools-extension'

import App from './components/app'
import { rootReducer } from './redux/rootReducer'

import './index.scss'

const store = createStore(rootReducer, composeWithDevTools())

const root = ReactDOM.createRoot(document.getElementById('root'))
root.render(
  <Provider store={store}>
    <App />
  </Provider>
)
