import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import { createStore, applyMiddleware, combineReducers } from 'redux'
import { apiMiddleware } from 'redux-api-middleware'
import { IntlProviderWrapper } from './localization'
import { CookiesProvider } from 'react-cookie'
import thunk from 'redux-thunk'
import App from './app'
import * as rootReducers from './redux/reducers'
import './styles/global'
import ReactGA from 'react-ga'

ReactGA.initialize('UA-140787688-1')
ReactGA.pageview(window.location.pathname + window.location.search)

const rootReducer = combineReducers({ ...rootReducers })
const createStoreWithMiddleware = applyMiddleware(apiMiddleware)(createStore)
const store = createStoreWithMiddleware(rootReducer, applyMiddleware(thunk, apiMiddleware))

ReactDOM.render(
  <CookiesProvider>
    <Provider store={store}>
      <IntlProviderWrapper>
        <App />
      </IntlProviderWrapper>
    </Provider>
  </CookiesProvider>,
  document.getElementById('root')
)
