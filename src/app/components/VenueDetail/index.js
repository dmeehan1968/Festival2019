import React from 'react'
import Meta from 'app/components/Meta'
import VenueMap from 'app/components/VenueMap'

const renderAddressContact = ({
  venue,
  eventTitle,
}) => {

  if (!venue.addresscontact) return null

  return (
    <>
      <Meta
        title="Map"
        content={<VenueMap height={400} venues={[venue]} />}
      />
      <Meta title="Address" content={[
        venue.addresscontact.address1,
        venue.addresscontact.address2,
        venue.addresscontact.address3,
        venue.addresscontact.town,
        venue.addresscontact.county,
        venue.addresscontact.postcode,
        ].filter(addr => !!addr).map((addr, i) => <React.Fragment key={i}>{addr}<br /></React.Fragment>)} />
    </>
  )
}

export default ({
  venue = {},
  eventTitle,
}) => {
  const unspecified = { description: 'Unspecified' }
  return (
    <dl>
      {renderAddressContact({ venue: venue, eventTitle }) || <p>No Address Contact</p> }
      <Meta title="For Venue Information" content={venue.telephone} />
      <Meta title="Region" content={venue.regions.map(r => r.description).join(', ')} />
      <Meta title="Disabled" content={(venue.disabled || unspecified).description} />
      <Meta title="Toilets" content={(venue.toilet || unspecified).description} />
      <Meta title="Dogs" content={(venue.dog || unspecified).description } />
      <Meta title="Refreshments" content={venue.refreshments} />
      <Meta title="Directions (By Foot)" content={venue.byfoot} />
      <Meta title="Directions (By Car)" content={venue.bycar} />
      <Meta title="Directions (By Public Transport)" content={venue.bypublictransport} />
      <Meta title="Parking" content={venue.parking} />
      <Meta title="Further Info" content={venue.furtherinfo} />
    </dl>
  )
}