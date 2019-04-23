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

    it("should display a no slide placeholder", () => {
      expect(wrapper.find('.placeholder')).toHaveLength(1)

    });

  });

  xit("should display a slide", () => {

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
});
