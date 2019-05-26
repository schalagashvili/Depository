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
import * as firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCeFFBcKOhogqpCEbGKxtqgZyJC5_ApPnM",
  authDomain: "depostore-c9fee.firebaseapp.com",
  databaseURL: "https://depostore-c9fee.firebaseio.com",
  projectId: "depostore-c9fee",
  storageBucket: "depostore-c9fee.appspot.com",
  messagingSenderId: "697388473396",
  appId: "1:697388473396:web:4aff54bd954f0ec1"
};

firebase.initializeApp(firebaseConfig);

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
