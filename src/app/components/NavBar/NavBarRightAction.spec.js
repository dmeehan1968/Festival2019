import React from 'react'
import { shallow } from 'enzyme'
import { NavBarRightAction } from './NavBarRightAction'

describe("NavBarRightAction", () => {

  let wrapper

  beforeEach(() => {
    wrapper = shallow(<NavBarRightAction />)
  });

  it("renders the id", () => {
    expect(wrapper.find('#nav-bar-right-action')).toHaveLength(1)
  });
});
