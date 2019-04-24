import React from 'react'
import { shallow } from 'enzyme'
import Carousel from '.'

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

    it("should not have navigation buttons", () => {
      expect(wrapper.find('nav')).toHaveLength(0)
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

    it("should not have navigation buttons", () => {
      expect(wrapper.find('nav')).toHaveLength(0)
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
