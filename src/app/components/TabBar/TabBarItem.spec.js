import React from 'react'
import { shallow } from 'enzyme'
import { TabBar, TabBarItem } from '.'

describe("TabBarItem", () => {

  let wrapper
  const expectedIcon = <img />
  const expectedLabel = 'label text'

  beforeEach(() => {
    wrapper = shallow(<TabBarItem icon={expectedIcon} label={expectedLabel} />)
  });

  it("renders the icon", () => {
    expect(wrapper.find(expectedIcon.type)).toHaveLength(1)
  });

  it("renders the label", () => {
    expect(wrapper.text()).toEqual(expectedLabel)
  });

});
