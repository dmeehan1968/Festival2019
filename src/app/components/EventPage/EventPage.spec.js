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
          <EventPage />
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
      expect(wrapper.find('Meta[title="Status"]').prop('content')).toEqual('')
    });

    it("shows no subtitle", () => {
      expect(wrapper.find('Meta[title="Subtitle"]').prop('content')).toBeUndefined()
    });

    it("shows no short description", () => {
      expect(wrapper.find('Meta[title="About the Event"]').prop('content')).toBeUndefined()
    });

    it("shows no event type", () => {
      expect(wrapper.find('Meta[title="Event Type"]').prop('content')).toEqual('')
    });

    it("shows no disciplines", () => {
      expect(wrapper.find('Meta[title="Disciplines"]').prop('content')).toEqual('')
    });

    it("shows no telephone", () => {
      expect(wrapper.find('Meta[title="Telephone"]').prop('content')).toBeUndefined()
    });

    it("shows no email", () => {
      expect(wrapper.find('Meta[title="Email"]').prop('content')).toBeUndefined()
    });

    it("shows no web", () => {
      expect(wrapper.find('Meta[title="Web"]').prop('content')).toBeUndefined()
    });

    it("shows no booking contact", () => {
      expect(wrapper.find('Meta[title="Booking Contact"]').prop('content')).toBeUndefined()
    });

    it("shows no booking info", () => {
      expect(wrapper.find('Meta[title="Booking Info"]').prop('content')).toBeUndefined()
    });

    it("shows no age info", () => {
      expect(wrapper.find('Meta[title="Age Info"]').prop('content')).toBeUndefined()
    });

    it("shows no opening times", () => {
      expect(wrapper.find('Meta[title="Opening Times"] dd').text()).toEqual('No Opening Times Specified')
    });

    it("shows no further info", () => {
      expect(wrapper.find('Meta[title="Further Info"]').prop('content')).toBeUndefined()
    });

    it("shows no long description", () => {
      expect(wrapper.find('Meta[title="Long Description"]').prop('content')).toBeUndefined()
    });

    it("shows no venue info", () => {
      expect(wrapper.find('VenueDetailWrapper p').text()).toEqual('No Venue Information')
    });

  });

  describe("with event", () => {

    const dates = [
      { id: 48, date: '2017-09-09' },
      { id: 49, date: '2017-09-10' },
      { id: 50, date: '2017-09-11' },
      { id: 51, date: '2017-09-12' },
      { id: 52, date: '2017-09-13' },
      { id: 53, date: '2017-09-14' },
      { id: 54, date: '2017-09-15' },
      { id: 55, date: '2017-09-16' },
      { id: 56, date: '2017-09-17' },
    ]
    const expected = {
       id: 318,
       title: 'Aga Karolinska',
       subtitle: 'Test subtitle',
       shortdesc: 'Having moved to Somerset and being inspired by the surrounding countryside,  I started painting, drawing and printmaking again, after many years’ lapse. My work contains a variety of subjects, including landscape, animals portraits, figurative images.',
       longdesc: 'Long Description test',
       contact_id: 74,
       bookingcontact_id: null,
       furtherinfo: 'Further Info test',
       charginginfo: 'Charging Info test',
       ageinfo: 'Age Info test',
       venue_id: 157,
       preferred_image_id: 1028,
       venue: {
         id: 157,
         title: 'Bathealton Village Hall',
         venuecontact_id: 74,
         addresscontact_id: 75,
         byfoot: '',
         bycar: 'Bathealton, opposite the Church',
         bypublictransport: '',
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
       },
       contact: {
         id: 74,
         firstname: 'Morag',
         lastname: 'Berthon',
         organisation: '',
         telephone: '01984 623563',
         mobile: '',
         email: 'moragberthon@hotmail.com',
         website: 'http://example.com',
         address1: 'Hellings Farm',
         address2: 'Bathealton',
         address3: '',
         town: 'Taunton',
         county: 'Somerset',
         postcode: 'TA4 2AP',
         latitude: 51.0179,
         longitude: -3.33882
       },
       bookingcontact: {
         id: 74,
         firstname: 'Morag',
         lastname: 'Berthon',
         organisation: '',
         telephone: '01984 623563',
         mobile: '',
         email: 'moragberthon@hotmail.com',
         website: 'http://example.com',
         address1: 'Hellings Farm',
         address2: 'Bathealton',
         address3: '',
         town: 'Taunton',
         county: 'Somerset',
         postcode: 'TA4 2AP',
         latitude: 51.0179,
         longitude: -3.33882
       },
       preferred_image: {
         id: 1028,
         filename: '/App/Assets/Images/Content/Events/aga-karolinska.jpg',
         author: 'Aga Karolinska',
         title: '',
         height: 2844,
         width: 3799
       },
       images: [
         {
           id: 1028,
           filename: '/App/Assets/Images/Content/Events/aga-karolinska.jpg',
           author: 'Aga Karolinska',
           title: '',
           height: 2844,
           width: 3799
         }
       ],
       disciplines: [
         {
           id: 11,
           description: 'Painting/Drawing/Illustration'
         },
         {
           id: 19,
           description: 'Photography/Film/New Media'
         }
       ],
       eventstatus: [
         {
           id: 0,
           description: 'Test Status 1'
         },
         {
           id: 1,
           description: 'Test Status 2'
         },
       ],
       eventtypes: [
         {
           id: 28,
           description: 'Exhibition'
         },
         {
           id: 0,
           description: 'Other Type'
         }
       ],
       opening_times: [
         {
           id: 2668,
           start: '2017-09-09T11:00:00.000Z',
           end: '2017-09-09T17:00:00.000Z',
           event_id: 318
         },
         {
           id: 2669,
           start: '2017-09-10T11:00:00.000Z',
           end: '2017-09-10T17:00:00.000Z',
           event_id: 318
         },
         {
           id: 2670,
           start: '2017-09-11T11:00:00.000Z',
           end: '2017-09-11T17:00:00.000Z',
           event_id: 318
         },
         {
           id: 2671,
           start: '2017-09-12T11:00:00.000Z',
           end: '2017-09-12T17:00:00.000Z',
           event_id: 318
         },
         {
           id: 2672,
           start: '2017-09-13T11:00:00.000Z',
           end: '2017-09-13T17:00:00.000Z',
           event_id: 318
         },
         {
           id: 2673,
           start: '2017-09-14T11:00:00.000Z',
           end: '2017-09-14T17:00:00.000Z',
           event_id: 318
         },
         {
           id: 2674,
           start: '2017-09-15T11:00:00.000Z',
           end: '2017-09-15T17:00:00.000Z',
           event_id: 318
         },
         {
           id: 2675,
           start: '2017-09-16T11:00:00.000Z',
           end: '2017-09-16T17:00:00.000Z',
           event_id: 318
         },
         {
           id: 2676,
           start: '2017-09-17T11:00:00.000Z',
           end: '2017-09-17T17:00:00.000Z',
           event_id: 318
         }
       ]
     }

    beforeEach(() => {
     wrapper = mount(
       <ThemeProvider theme={designSystem}>
         <EventPage event={expected} dates={dates} />
       </ThemeProvider>
     )
    });

    describe("EventDetailWrapper", () => {

      beforeEach(() => {
        wrapper = wrapper.find('EventDetailWrapper')
      });

      it("exists", () => {
        expect(wrapper).toHaveLength(1)
      });

      it("has title", () => {
        expect(wrapper.find('section h1').text()).toEqual(expected.title)
      });

      it("has images", () => {
        expect(wrapper.find('Carousel CarouselImage')).toHaveLength(expected.images.length)
      });

      it("has event status", () => {
        expect(wrapper.find('Meta[title="Status"]').prop('content')).toEqual(expected.eventstatus.map(s=>s.description).join(', '))
      });

      it("has subtitle", () => {
        expect(wrapper.find('Meta[title="Subtitle"]').prop('content')).toEqual(expected.subtitle)
      });

      it("has short description", () => {
        expect(wrapper.find('Meta[title="About the Event"]').prop('content')).toEqual(expected.shortdesc)
      });

      it("has event types", () => {
        expect(wrapper.find('Meta[title="Event Type"]').prop('content')).toEqual(expected.eventtypes.map(s=>s.description).join(', '))
      });

      it("has disciplines", () => {
        expect(wrapper.find('Meta[title="Disciplines"]').prop('content')).toEqual(expected.disciplines.map(s=>s.description).join(', '))
      });

      it("has telephone", () => {
        expect(wrapper.find('Meta[title="Telephone"]').prop('content')).toEqual(expected.contact.telephone)
      });

      it("has email", () => {
        expect(wrapper.find('Meta[title="Email"]').prop('content')).toEqual(expected.contact.email)
      });

      it("has website", () => {
        expect(wrapper.find('Meta[title="Web"]').prop('content')).toEqual(expected.contact.website)
      });

      it("has booking contact", () => {
        expect(wrapper.find('Meta[title="Booking Contact"] BookingContact').prop('contact')).toEqual(expected.bookingcontact)
      });

      it("has booking info", () => {
        expect(wrapper.find('Meta[title="Booking Info"]').prop('content')).toEqual(expected.charginginfo)
      });

      it("has opening times", () => {
        expect(wrapper.find('Meta[title="Opening Times"] OpeningTimes').props())
          .toEqual({
            dates,
            times: expected.opening_times
          })
      });

      it("has further info", () => {
        expect(wrapper.find('Meta[title="Further Info"]').prop('content')).toEqual(expected.furtherinfo)
      });

      it("has long description", () => {
        expect(wrapper.find('Meta[title="Long Description"]').prop('content')).toEqual(expected.longdesc)
      });

    });

    describe("VenueDetailWrapper", () => {

      beforeEach(() => {
        wrapper = wrapper.find('VenueDetailWrapper')
      });

      it("has VenueDetail", () => {
        expect(wrapper.find('VenueDetail').prop('venue'))
          .toEqual(expected.venue)
      });
    });
  });
});
