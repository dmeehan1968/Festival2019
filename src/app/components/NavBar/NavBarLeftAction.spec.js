import React from 'react'
import { shallow } from 'enzyme'
import { NavBarLeftAction } from './NavBarLeftAction'

describe("NavBarLeftAction", () => {

  let wrapper

  beforeEach(() => {
    wrapper = shallow(<NavBarLeftAction />)
  });

  it("renders the id", () => {
    expect(wrapper.find('#nav-bar-left-action')).toHaveLength(1)
  });
});
