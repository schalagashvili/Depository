import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import { createStore, applyMiddleware, combineReducers } from 'redux'
import { apiMiddleware } from 'redux-api-middleware'
import { IntlProvider } from 'react-intl'
import { addLocaleData } from 'react-intl'
import { CookiesProvider } from 'react-cookie'
import thunk from 'redux-thunk'
import App from './app'
import * as rootReducers from './redux/reducers'
import './styles/global'
import locale_en from 'react-intl/locale-data/en'
import locale_de from 'react-intl/locale-data/de'
import messages_de from './translations/de.json'
import messages_en from './translations/en.json'

addLocaleData([...locale_en, ...locale_de])
const messages = { de: messages_de, en: messages_en }
const language = navigator.language.split(/[-_]/)[0]

const rootReducer = combineReducers({ ...rootReducers })
const createStoreWithMiddleware = applyMiddleware(apiMiddleware)(createStore)
const store = createStoreWithMiddleware(rootReducer, applyMiddleware(thunk, apiMiddleware))

ReactDOM.render(
  <CookiesProvider>
    <Provider store={store}>
      <IntlProvider locale={language} messages={messages['de']}>
        <App />
      </IntlProvider>
    </Provider>
  </CookiesProvider>,
  document.getElementById('root')
)
