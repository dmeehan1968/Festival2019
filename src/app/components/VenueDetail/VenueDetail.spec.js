import React from 'react'
import { shallow } from 'enzyme'
import { VenueDetail } from '.'
import * as designSystem from 'styles/designSystem'

describe("VenueDetail", () => {

  let wrapper

  describe("empty venue", () => {

    beforeEach(() => {
      wrapper = shallow(
        <VenueDetail />
      )
    });

    it("map", () => {
      const content = wrapper.find('Meta[title="Map"]').prop('content')
      expect(content).toBeUndefined()
    });

    it("address", () => {
      const content = wrapper.find('Meta[title="Address"]').prop('content')
      expect(content).toHaveLength(0)
    });

    it("contact telephone", () => {
      const content = wrapper.find('Meta[title="For Venue Information"]').prop('content')
      expect(content).toBeUndefined()
    });

    it("regions", () => {
      const content = wrapper.find('Meta[title="Region"]').prop('content')
      expect(content).toEqual('')
    });

    it("disabled", () => {
      const content = wrapper.find('Meta[title="Disabled"]').prop('content')
      expect(content).toEqual('Unspecified')
    });

    it("toilets", () => {
      const content = wrapper.find('Meta[title="Toilets"]').prop('content')
      expect(content).toEqual('Unspecified')
    });

    it("dogs", () => {
      const content = wrapper.find('Meta[title="Dogs"]').prop('content')
      expect(content).toEqual('Unspecified')
    });

    it("refreshments", () => {
      const content = wrapper.find('Meta[title="Refreshments"]').prop('content')
      expect(content).toBeUndefined()
    });

    it("By foot", () => {
      const content = wrapper.find('Meta[title="Directions (By Foot)"]').prop('content')
      expect(content).toBeUndefined()
    });

    it("By car", () => {
      const content = wrapper.find('Meta[title="Directions (By Car)"]').prop('content')
      expect(content).toBeUndefined()
    });

    it("By Public Transport", () => {
      const content = wrapper.find('Meta[title="Directions (By Public Transport)"]').prop('content')
      expect(content).toBeUndefined()
    });

    it("Parking", () => {
      const content = wrapper.find('Meta[title="Parking"]').prop('content')
      expect(content).toBeUndefined()
    });

    it("Further Info", () => {
      const content = wrapper.find('Meta[title="Further Info"]').prop('content')
      expect(content).toBeUndefined()
    });

  });

  describe("with venue", () => {

    const expected = {
      id: 157,
      title: 'Bathealton Village Hall',
      venuecontact_id: 74,
      addresscontact_id: 75,
      byfoot: 'By Foot test',
      bycar: 'Bathealton, opposite the Church',
      bypublictransport: 'By Public Transport test',
      refreshments: 'Tea, coffee and homemade cake.',
      parking: 'Field opposite hall.',
      steps: 'Ramp off road available if required.',
      furtherinfo: 'Further info venue',
      addresscontact: {
        id: 75,
        firstname: '',
        lastname: '',
        organisation: 'Bathealton Village Hall',
        telephone: '',
        mobile: '',
        email: '',
        website: '',
        address1: 'Bathealton Village Hall',
        address2: 'Bathealton',
        address3: '',
        town: 'Taunton',
        county: 'Somerset',
        postcode: 'TA4 2AN',
        latitude: 51.0084,
        longitude: -3.31396
      },
      venuecontact: {
        id: 74,
        firstname: 'Morag',
        lastname: 'Berthon',
        organisation: '',
        telephone: '01984 623563',
        mobile: '',
        email: 'moragberthon@hotmail.com',
        website: '',
        address1: 'Hellings Farm',
        address2: 'Bathealton',
        address3: '',
        town: 'Taunton',
        county: 'Somerset',
        postcode: 'TA4 2AP',
        latitude: 51.0179,
        longitude: -3.33882
      },
      regions: [
        {
          id: 0,
          description: 'Wiveliscombe'
        },
        {
          id: 33,
          description: 'Bathealton'
        }
      ],
      dog: {
        id: 47,
        description: 'Guide Dogs Only'
      },
      disabled: {
        id: 63,
        description: 'Disabled Access with Assistance'
      },
      toilet: {
        id: 52,
        description: 'Toilets with Disabled Facilities'
      }
    }

    beforeEach(() => {
      wrapper = shallow(
        <VenueDetail venue={expected} />
      )
    });

    describe("VenueMap", () => {

      let venueMapElement
      beforeEach(() => {
        venueMapElement = wrapper.find('Meta[title="Map"]').prop('content')
      });

      it("is a VenueMap", () => {
        expect(React.isValidElement(venueMapElement)).toBeTruthy()
        expect(venueMapElement.type.displayName).toMatch(/VenueMap/)
      });

      it("has fixed height", () => {
        expect(venueMapElement.props.height).toEqual(400)
      });

      it("has venue", () => {
        expect(venueMapElement.props.venues).toEqual([ expected ])
      });

    });

    it("address", () => {
      const props = wrapper.find('Meta[title="Address"]').props()
      expect(props.content).toEqual([
        expected.addresscontact.address1,
        expected.addresscontact.address2,
        expected.addresscontact.address3,
        expected.addresscontact.town,
        expected.addresscontact.county,
        expected.addresscontact.postcode,
      ].filter(a=>!!a).map((addr,key)=>(<React.Fragment key={key}>{addr}<br /></React.Fragment>)))
      expect(props.title).toEqual('Address')
    });

    it("contact telephone", () => {
      const content = wrapper.find('Meta[title="For Venue Information"]').prop('content')
      expect(content).toEqual(expected.telephone)
    });

    it("regions", () => {
      const content = wrapper.find('Meta[title="Region"]').prop('content')
      expect(content).toEqual(expected.regions.map(r=>r.description).join(', '))
    });

    it("disabled", () => {
      const content = wrapper.find('Meta[title="Disabled"]').prop('content')
      expect(content).toEqual(expected.disabled.description)
    });

    it("toilets", () => {
      const content = wrapper.find('Meta[title="Toilets"]').prop('content')
      expect(content).toEqual(expected.toilet.description)
    });

    it("dogs", () => {
      const content = wrapper.find('Meta[title="Dogs"]').prop('content')
      expect(content).toEqual(expected.dog.description)
    });

    it("refreshments", () => {
      const content = wrapper.find('Meta[title="Refreshments"]').prop('content')
      expect(content).toEqual(expected.refreshments)
    });

    it("By foot", () => {
      const content = wrapper.find('Meta[title="Directions (By Foot)"]').prop('content')
      expect(content).toEqual(expected.byfoot)
    });

    it("By car", () => {
      const content = wrapper.find('Meta[title="Directions (By Car)"]').prop('content')
      expect(content).toEqual(expected.bycar)
    });

    it("By Public Transport", () => {
      const content = wrapper.find('Meta[title="Directions (By Public Transport)"]').prop('content')
      expect(content).toEqual(expected.bypublictransport)
    });

    it("Parking", () => {
      const content = wrapper.find('Meta[title="Parking"]').prop('content')
      expect(content).toEqual(expected.parking)
    });

    it("Further Info", () => {
      const content = wrapper.find('Meta[title="Further Info"]').prop('content')
      expect(content).toEqual(expected.furtherinfo)
    });

  });

});
