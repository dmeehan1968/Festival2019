import React from 'react'
import { shallow } from 'enzyme'
import DateTime from './DateTime'
import moment from 'moment'

describe('DateTime', () => {

  const sample = '2019-04-07 12:15:00'
  let wrapper
  beforeEach(() => wrapper = shallow(<DateTime date={moment(sample)} format="YYYY-MM-DD HH:mm:ss" />))

  it('should render a span', () => {
    expect(wrapper.find('span').length).toEqual(1)
  })

  it('should use datetime class', () => {
    expect(wrapper.find('span.datetime').length).toEqual(1)
  })

  it('should render formatted date', () => {
    expect(wrapper.find('span').text()).toEqual(sample)
  })

});
