import React from 'react'
import { shallow } from 'enzyme'
import Auth from './Auth'

describe('First React component test with Enzyme', () => {
  it('renders without crashing', () => {
    const wrapper = shallow(<Auth />)
    expect(wrapper).toMatchSnapshot()
  })
})
