import React from 'react'
import { mount } from 'enzyme'
import { NavBar } from './index'

describe("NavBar", () => {

  let wrapper
  const expectedClassName = 'test'
  const expectedTitle = 'Hello World'
  beforeEach(() => {
    wrapper = mount(<NavBar className={expectedClassName} title={expectedTitle} />)
  });

  it("renders the wrapper", () => {
    expect(wrapper.childAt(0).type()).toEqual('div')
  });

  it("passes className to wrapper", () => {
    expect(wrapper.childAt(0).prop('className')).toEqual(expectedClassName)
  });

  it("renders a left action", () => {
    expect(wrapper.find('NavBarLeftAction')).toHaveLength(1)
  });

  it("renders a title", () => {
    expect(wrapper.find('NavBarTitle')).toHaveLength(1)
  });

  it("renders the title as passed", () => {
    expect(wrapper.find('NavBarTitle').text()).toEqual(expectedTitle)
  });

  it("renders a right action", () => {
    expect(wrapper.find('NavBarRightAction')).toHaveLength(1)
  });
});
