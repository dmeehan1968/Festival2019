import React from 'react'
import Meta from 'app/components/Meta'
import VenueMap from 'app/components/VenueMap'

const renderAddressContact = ({
  venue,
}) => {

  if (!venue.addresscontact) return null

  return (
    <>
      <Meta
        title="Map"
        content={venue.addresscontact.latitude && venue.addresscontact.longitude && <VenueMap height={400} venues={[venue]} />}
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

export const VenueDetail = ({
  venue = {},
}) => {
  const unspecified = { description: 'Unspecified' }
  venue = {
    ...venue,
    addresscontact: venue.addresscontact || {},
    regions: venue.regions || [],
    disabled: venue.disabled || unspecified,
    toilet: venue.toilet || unspecified,
    dog: venue.dog || unspecified,
  }

  return (
    <dl>
      {renderAddressContact({ venue: venue }) || <p>No Address Contact</p> }
      <Meta title="For Venue Information" content={venue.telephone} />
      <Meta title="Region" content={venue.regions.map(r => r.description).join(', ')} />
      <Meta title="Disabled" content={venue.disabled.description} />
      <Meta title="Toilets" content={venue.toilet.description} />
      <Meta title="Dogs" content={venue.dog.description } />
      <Meta title="Refreshments" content={venue.refreshments} />
      <Meta title="Directions (By Foot)" content={venue.byfoot} />
      <Meta title="Directions (By Car)" content={venue.bycar} />
      <Meta title="Directions (By Public Transport)" content={venue.bypublictransport} />
      <Meta title="Parking" content={venue.parking} />
      <Meta title="Further Info" content={venue.furtherinfo} />
    </dl>
  )
}

export default VenueDetail
