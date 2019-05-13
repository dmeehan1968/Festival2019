import React from 'react'
import { mount } from 'enzyme'
import { EventPage } from '.'
import * as designSystem from 'styles/designSystem'
import { ThemeProvider } from 'styled-components'

describe("EventPage", () => {

  let wrapper

  describe("empty event", () => {

    beforeEach(() => {
      wrapper = mount(
        <ThemeProvider theme={designSystem}>
          <EventPage event={{}} />
        </ThemeProvider>
      )
    });

    it("shows No Title", () => {
      expect(wrapper.find('section h1').text()).toEqual('No Title')
    });

    it("shows no carousel", () => {
      expect(wrapper.find('Carousel')).toHaveLength(0)
    });

    it("shows no status", () => {
      expect(wrapper.find('Meta[title="Status"]').children()).toHaveLength(0)
    });

    it("shows no subtitle", () => {
      expect(wrapper.find('Meta[title="Subtitle"]').children()).toHaveLength(0)
    });

    it("shows no short description", () => {
      expect(wrapper.find('Meta[title="About the Event"]').children()).toHaveLength(0)
    });

    it("shows no event type", () => {
      expect(wrapper.find('Meta[title="Event Type"]').children()).toHaveLength(0)
    });

    it("shows no disciplines", () => {
      expect(wrapper.find('Meta[title="Disciplines"]').children()).toHaveLength(0)
    });

    it("shows no telephone", () => {
      expect(wrapper.find('Meta[title="Telephone"]').children()).toHaveLength(0)
    });

    it("shows no email", () => {
      expect(wrapper.find('Meta[title="Email"]').children()).toHaveLength(0)
    });

    it("shows no web", () => {
      expect(wrapper.find('Meta[title="Web"]').children()).toHaveLength(0)
    });

    it("shows no booking contact", () => {
      expect(wrapper.find('Meta[title="Booking Contact"]').children()).toHaveLength(0)
    });

    it("shows no booking info", () => {
      expect(wrapper.find('Meta[title="Booking Info"]').children()).toHaveLength(0)
    });

    it("shows no age info", () => {
      expect(wrapper.find('Meta[title="Age Info"]').children()).toHaveLength(0)
    });

    it("shows no opening times", () => {
      expect(wrapper.find('Meta[title="Opening Times"] dd').text()).toEqual('No Opening Times Specified')
    });

    it("shows no further info", () => {
      expect(wrapper.find('Meta[title="Further Info"]').children()).toHaveLength(0)
    });

    it("shows no long description", () => {
      expect(wrapper.find('Meta[title="Long Description"]').children()).toHaveLength(0)
    });

    it("shows no venue info", () => {
      expect(wrapper.find('VenueDetailWrapper p').text()).toEqual('No Venue Information')
    });



  });

});
// {
//    id: 318,
//    title: 'Aga Karolinska',
//    subtitle: '',
//    shortdesc: 'Having moved to Somerset and being inspired by the surrounding countryside,  I started painting, drawing and printmaking again, after many years’ lapse. My work contains a variety of subjects, including landscape, animals portraits, figurative images.',
//    longdesc: null,
//    contact_id: 74,
//    bookingcontact_id: null,
//    furtherinfo: null,
//    charginginfo: null,
//    ageinfo: null,
//    venue_id: 157,
//    preferred_image_id: 1028,
//    venue: {
//      id: 157,
//      title: 'Bathealton Village Hall',
//      venuecontact_id: 74,
//      addresscontact_id: 75,
//      byfoot: '',
//      bycar: 'Bathealton, opposite the Church',
//      bypublictransport: '',
//      refreshments: 'Tea, coffee and homemade cake.',
//      parking: 'Field opposite hall.',
//      steps: 'Ramp off road available if required.',
//      furtherinfo: null,
//      addresscontact: {
//        id: 75,
//        firstname: '',
//        lastname: '',
//        organisation: 'Bathealton Village Hall',
//        telephone: '',
//        mobile: '',
//        email: '',
//        website: '',
//        address1: 'Bathealton Village Hall',
//        address2: 'Bathealton',
//        address3: '',
//        town: 'Taunton',
//        county: 'Somerset',
//        postcode: 'TA4 2AN',
//        latitude: 51.0084,
//        longitude: -3.31396
//      },
//      venuecontact: {
//        id: 74,
//        firstname: 'Morag',
//        lastname: 'Berthon',
//        organisation: '',
//        telephone: '01984 623563',
//        mobile: '',
//        email: 'moragberthon@hotmail.com',
//        website: '',
//        address1: 'Hellings Farm',
//        address2: 'Bathealton',
//        address3: '',
//        town: 'Taunton',
//        county: 'Somerset',
//        postcode: 'TA4 2AP',
//        latitude: 51.0179,
//        longitude: -3.33882
//      },
//      regions: [
//        {
//          id: 33,
//          description: 'Bathealton'
//        }
//      ],
//      dog: {
//        id: 47,
//        description: 'Guide Dogs Only'
//      },
//      disabled: {
//        id: 63,
//        description: 'Disabled Access with Assistance'
//      },
//      toilet: {
//        id: 52,
//        description: 'Toilets with Disabled Facilities'
//      }
//    },
//    contact: {
//      id: 74,
//      firstname: 'Morag',
//      lastname: 'Berthon',
//      organisation: '',
//      telephone: '01984 623563',
//      mobile: '',
//      email: 'moragberthon@hotmail.com',
//      website: '',
//      address1: 'Hellings Farm',
//      address2: 'Bathealton',
//      address3: '',
//      town: 'Taunton',
//      county: 'Somerset',
//      postcode: 'TA4 2AP',
//      latitude: 51.0179,
//      longitude: -3.33882
//    },
//    bookingcontact: null,
//    preferred_image: {
//      id: 1028,
//      filename: '/App/Assets/Images/Content/Events/aga-karolinska.jpg',
//      author: 'Aga Karolinska',
//      title: '',
//      height: 2844,
//      width: 3799
//    },
//    images: [
//      {
//        id: 1028,
//        filename: '/App/Assets/Images/Content/Events/aga-karolinska.jpg',
//        author: 'Aga Karolinska',
//        title: '',
//        height: 2844,
//        width: 3799
//      }
//    ],
//    disciplines: [
//      {
//        id: 11,
//        description: 'Painting/Drawing/Illustration'
//      },
//      {
//        id: 19,
//        description: 'Photography/Film/New Media'
//      }
//    ],
//    eventstatus: [],
//    eventtypes: [
//      {
//        id: 28,
//        description: 'Exhibition'
//      }
//    ],
//    opening_times: [
//      {
//        id: 2668,
//        start: '2017-09-09T11:00:00.000Z',
//        end: '2017-09-09T17:00:00.000Z',
//        event_id: 318
//      },
//      {
//        id: 2669,
//        start: '2017-09-10T11:00:00.000Z',
//        end: '2017-09-10T17:00:00.000Z',
//        event_id: 318
//      },
//      {
//        id: 2670,
//        start: '2017-09-11T11:00:00.000Z',
//        end: '2017-09-11T17:00:00.000Z',
//        event_id: 318
//      },
//      {
//        id: 2671,
//        start: '2017-09-12T11:00:00.000Z',
//        end: '2017-09-12T17:00:00.000Z',
//        event_id: 318
//      },
//      {
//        id: 2672,
//        start: '2017-09-13T11:00:00.000Z',
//        end: '2017-09-13T17:00:00.000Z',
//        event_id: 318
//      },
//      {
//        id: 2673,
//        start: '2017-09-14T11:00:00.000Z',
//        end: '2017-09-14T17:00:00.000Z',
//        event_id: 318
//      },
//      {
//        id: 2674,
//        start: '2017-09-15T11:00:00.000Z',
//        end: '2017-09-15T17:00:00.000Z',
//        event_id: 318
//      },
//      {
//        id: 2675,
//        start: '2017-09-16T11:00:00.000Z',
//        end: '2017-09-16T17:00:00.000Z',
//        event_id: 318
//      },
//      {
//        id: 2676,
//        start: '2017-09-17T11:00:00.000Z',
//        end: '2017-09-17T17:00:00.000Z',
//        event_id: 318
//      }
//    ]
//  }
