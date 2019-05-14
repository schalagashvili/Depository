import React from 'react'
import { IntlProvider, addLocaleData } from 'react-intl'
import locale_en from 'react-intl/locale-data/en'
import locale_de from 'react-intl/locale-data/de'
import messages_de from './translations/de.json'
import messages_en from './translations/en.json'
import { connect } from 'react-redux'
import { withCookies } from 'react-cookie'

addLocaleData([...locale_en, ...locale_de])
const locale = navigator.language.split(/[-_]/)[0]
const messages = { de: messages_de, en: messages_en }

class IntlProviderComponent extends React.Component {
  render() {
    const { children, language } = this.props
    const messagesLang = language || this.props.cookies.get('language') || 'en'

    return (
      <IntlProvider locale={locale} messages={messages[messagesLang]}>
        {children}
      </IntlProvider>
    )
  }
}

const mapStateToProps = state => {
  return {
    language: state.language.data
  }
}

const localizer = connect(mapStateToProps)(IntlProviderComponent)

export const IntlProviderWrapper = withCookies(localizer)
