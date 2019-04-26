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
      expect(wrapper.find('.active').children().text()).toEqual('First')
    });

    it("renders the second item", () => {
      wrapper = shallow(
        <ControlledCarousel activeIndex={1}>
          <div>First</div>
          <div>Second</div>
        </ControlledCarousel>
      )
      expect(wrapper.find('.active').children().text()).toEqual('Second')
    });

    it("activeIndex is clamped to number of children", () => {
      wrapper = shallow(
        <ControlledCarousel activeIndex={5}>
          <div>First</div>
          <div>Second</div>
        </ControlledCarousel>
      )
      expect(wrapper.find('.active').children().text()).toEqual('Second')
    });

    it("passes container width as data attribute to child", () => {
      wrapper = shallow(
        <ControlledCarousel width={400}>
          <div></div>
        </ControlledCarousel>
      )
      expect(wrapper.find('.active').children().at(0).prop('data-carousel-width')).toEqual(400)
    });

    it("passes container height as data attribute to child", () => {
      wrapper = shallow(
        <ControlledCarousel height={400}>
          <div></div>
        </ControlledCarousel>
      )
      expect(wrapper.find('.active').children().at(0).prop('data-carousel-height')).toEqual(400)
    });

    describe("slide offsets", () => {

      it("sets slide offsets when first slide active", () => {
        wrapper = shallow(
          <ControlledCarousel height={100} width={100} columnGap={0}>
            <div>First</div>
            <div>Second</div>
            <div>Third</div>
          </ControlledCarousel>
        )
        expect(wrapper.find('Slide').at(0).prop('offsetX')).toEqual(0)
        expect(wrapper.find('Slide').at(1).prop('offsetX')).toEqual(100)
        expect(wrapper.find('Slide').at(2).prop('offsetX')).toEqual(200)
      });

      it("sets slide offsets when second slide active", () => {
        wrapper = shallow(
          <ControlledCarousel height={100} width={100} columnGap={0} activeIndex={1}>
            <div>First</div>
            <div>Second</div>
            <div>Third</div>
          </ControlledCarousel>
        )
        expect(wrapper.find('Slide').at(0).prop('offsetX')).toEqual(-100)
        expect(wrapper.find('Slide').at(1).prop('offsetX')).toEqual(0)
        expect(wrapper.find('Slide').at(2).prop('offsetX')).toEqual(100)
      });

      it("sets slide offsets when third slide active", () => {
        wrapper = shallow(
          <ControlledCarousel height={100} width={100} columnGap={0} activeIndex={2}>
            <div>First</div>
            <div>Second</div>
            <div>Third</div>
          </ControlledCarousel>
        )
        expect(wrapper.find('Slide').at(0).prop('offsetX')).toEqual(-200)
        expect(wrapper.find('Slide').at(1).prop('offsetX')).toEqual(-100)
        expect(wrapper.find('Slide').at(2).prop('offsetX')).toEqual(0)
      });

      it("sets slide offsets with column gap", () => {
        wrapper = shallow(
          <ControlledCarousel height={100} width={100} columnGap={20}>
            <div>First</div>
            <div>Second</div>
            <div>Third</div>
          </ControlledCarousel>
        )
        expect(wrapper.find('Slide').at(0).prop('offsetX')).toEqual(0)
        expect(wrapper.find('Slide').at(1).prop('offsetX')).toEqual(120)
        expect(wrapper.find('Slide').at(2).prop('offsetX')).toEqual(240)
      });

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

  describe("transition delay and speed", () => {

    xit("pending", () => {

    });
  });

});
