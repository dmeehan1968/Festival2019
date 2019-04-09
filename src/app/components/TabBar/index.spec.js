import React from 'react'
import { shallow } from 'enzyme'
import TabBar from '.'
import { NavWrapper, ListContainer, ListItem } from './styles'

import { enzymeFind } from 'styled-components/test-utils'

describe.each([
  [ 0, ],
  [ 1, 'Item 1' ],
  [ 3, 'Item 1', 'Item 2', 'Item 3' ],
])('TabBar with %i items', (count, ...items) => {
  let wrapper
  beforeEach(() => wrapper = shallow(
    <TabBar>
      { items.map((item, key) => <div key={key}>{item}</div>)}
    </TabBar>
  ))

  it('renders the Navigation Wrapper', () => {
    expect(wrapper.find(NavWrapper)).toHaveLength(1)
  })

  it('renders the List Container', () => {
    expect(wrapper.find(ListContainer)).toHaveLength(1)
  })

  it('renders the List Items', () => {
    expect(wrapper.find(ListItem)).toHaveLength(items.length)
  })

  it('has the correct content for each item', () => {
    wrapper.find(ListItem).children().forEach((child, index) => {
      expect(child.text()).toEqual(items[index])
    })
  })
})
