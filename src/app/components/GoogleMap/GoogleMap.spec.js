import React from 'react'
import { shallow, mount } from 'enzyme'
import GoogleMap from '.'
import assert from 'assert'

describe("GoogleMap", () => {

  let wrapper

  it("exists", () => {
    expect(GoogleMap).toBeDefined()
  });

  it("throws exception when no api key is provided", () => {
    expect.hasAssertions()
    expect(() => shallow(<GoogleMap />)).toThrow()
  });

  describe("server side", () => {

    beforeEach(() => {
      wrapper = shallow(<GoogleMap apiParams={{ key: 'xxx'}} />)
    });

    describe("render", () => {

      beforeEach(() => {
        wrapper = wrapper.find('GoogleMapRender')
      });

      it("has a render component", () => {
        expect(wrapper).toHaveLength(1)
      });

      it("passes no elements", () => {
        expect(wrapper.prop('elements')).toEqual([])
      });

      it("has default height of 100%", () => {
        expect(wrapper.prop('height')).toEqual('100%')
      });

      it("has mapId of 'map'", () => {
        expect(wrapper.prop('mapId')).toEqual('map')
      });
    });
  });

  describe("client side", () => {
    beforeEach(() => {
      wrapper = shallow(<GoogleMap apiParams={{ key: 'xxx' }} />)
      console.log(wrapper.debug());
    });

    xit("renders", () => {

    });
  });
});
