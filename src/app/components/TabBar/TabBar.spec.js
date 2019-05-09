import React from 'react'
import { shallow } from 'enzyme'
import { TabBar, TabBarItem } from '.'

describe.each([
  [ 0, ],
  [ 1, 'Item 1' ],
  [ 3, 'Item 1', 'Item 2', 'Item 3' ],
])('TabBar with %i items', (count, ...items) => {
  let wrapper
  beforeEach(() => {
    wrapper = shallow(
      <TabBar>
        { items.map((item, key) => <div key={key}>{item}</div>)}
      </TabBar>
    )
  })

  it('renders the Navigation Wrapper', () => {
    expect(wrapper.find('nav')).toHaveLength(1)
  })

  it('renders the List Container', () => {
    expect(wrapper.find('ul')).toHaveLength(1)
  })

  it('has the correct content for each item', () => {
    const children = wrapper.find('li')
    expect(children).toHaveLength(items.length)
    children.forEach((child, index) => {
      expect(child.text()).toEqual(items[index])
    })
  })
})
