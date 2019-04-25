import React from 'react'
import { shallow } from 'enzyme'
import ControlledCarousel from './ControlledCarousel'

describe("ControlledCarousel", () => {

  let wrapper

  it("should exist", () => {
    expect(shallow(<ControlledCarousel />)).toEqual(expect.anything())
  });

  it("passes inline styles to wrapper", () => {
    wrapper = shallow(<ControlledCarousel style={{ backgroundColor: 'red' }} />)
    expect(wrapper.find('Wrapper').prop('style')).toHaveProperty('backgroundColor', 'red')
  });

  describe("no content", () => {

    it("renders a placeholder", () => {
      wrapper = shallow(<ControlledCarousel />)
      expect(wrapper.text()).toMatch(/no content/)
    });

  });

  describe("with content", () => {

    it("renders the first item", () => {
      wrapper = shallow(
        <ControlledCarousel>
          <div>First</div>
          <div>Second</div>
        </ControlledCarousel>
      )
      expect(wrapper.children().filter('div').text()).toEqual('First')
    });

    it("renders the first item", () => {
      wrapper = shallow(
        <ControlledCarousel activeIndex={1}>
          <div>First</div>
          <div>Second</div>
        </ControlledCarousel>
      )
      expect(wrapper.children().filter('div').text()).toEqual('Second')
    });

    it("activeIndex is clamped to number of children", () => {
      wrapper = shallow(
        <ControlledCarousel activeIndex={5}>
          <div>First</div>
          <div>Second</div>
        </ControlledCarousel>
      )
      expect(wrapper.children().filter('div').text()).toEqual('Second')
    });

    it("passes container width as data attribute to child", () => {
      wrapper = shallow(
        <ControlledCarousel width={400}>
          <div></div>
        </ControlledCarousel>
      )
      expect(wrapper.children().filter('div').prop('data-carousel-width')).toEqual(400)
    });

    it("passes container height as data attribute to child", () => {
      wrapper = shallow(
        <ControlledCarousel height={400}>
          <div></div>
        </ControlledCarousel>
      )
      expect(wrapper.children().filter('div').prop('data-carousel-height')).toEqual(400)
    });
  });

  describe("server side rendering", () => {

    it("renders all children in noscript container", () => {

      wrapper = shallow(
        <ControlledCarousel height={400}>
          <div>1</div>
          <div>2</div>
        </ControlledCarousel>
      )
      expect(wrapper.find('noscript').children()).toHaveLength(2)

    });
  });

  describe("lazy loading", () => {

    xit("pending", () => {

    });
  });

});
