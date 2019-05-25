import React from 'react'
import { shallow } from 'enzyme'
import DateTime from './DateTime'
import { DateTime as DT } from 'luxon'

describe('DateTime', () => {

  const sample = '2019-09-07 12:15:00'
  const date = DT.fromSQL(sample, { zone: 'Europe/London'})

  let wrapper
  beforeEach(() => wrapper = shallow(<DateTime date={date} format="yyyy-MM-dd HH:mm:ss" />))

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
