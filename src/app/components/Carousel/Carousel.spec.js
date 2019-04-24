import React from 'react'
import { shallow } from 'enzyme'
import Carousel, { Navigation } from '.'

describe("Carousel", () => {

  let wrapper

  describe("when there are no slides", () => {

    beforeEach(() => {
      wrapper = shallow(<Carousel />)
    });

    it("exists", () => {
      expect(wrapper).toEqual(expect.anything())
    });

    it("should display a no content placeholder", () => {
      expect(wrapper.find('.placeholder').text()).toMatch(/content to display/)
    });

    it("passes child count to Navigation", () => {
      expect(wrapper.find('Navigation').prop('count')).toEqual(0)
    });
  });

  describe("when there is one slide", () => {

    beforeEach(() => {
      wrapper = shallow(
        <Carousel>
          <div className="slide">Slide 1</div>
        </Carousel>
      )
      console.log(wrapper.debug());
    });

    it("should not display a content placeholder", () => {
      expect(wrapper.find('.placeholder')).toHaveLength(0)
    });

    it("should display a slide", () => {
      expect(wrapper.find('.slide')).toHaveLength(1)
    });

    it("passes child count to Navigation", () => {
      expect(wrapper.find('Navigation').prop('count')).toEqual(1)
    });
  });

  xit("should display the slide maximised to the height of the container", () => {

  });

  xit("should have a next slide button", () => {

  });

  xit("should have a previous slide button", () => {

  });

  xit("should transition to next slide after delay", () => {

  });

  xit("should transition to first slide after last slide", () => {

  });

  xit("should have slide indicators", () => {

  });
});

describe("Navigation", () => {

  let wrapper

  it("should not render when no count", () => {
    wrapper = shallow(<Navigation count={0} />)
    expect(wrapper.type()).toBeNull()
  });

  it("should not render when count is 1", () => {
    wrapper = shallow(<Navigation count={1} />)
    expect(wrapper.type()).toBeNull()
  });

});
