import React from 'react'

export default ({
  venue,
}) => {
  return (
    <div>
      <h1>{venue.title}</h1>
      <div>
        {
          [
            venue.addresscontact.address1,
            venue.addresscontact.address2,
            venue.addresscontact.address3,
            venue.addresscontact.town,
            venue.addresscontact.county,
            venue.addresscontact.postcode,
          ].filter(addr => !!addr).map((addr, key) => (<React.Fragment key={key}>{addr}<br /></React.Fragment>))
        }
      </div>
    </div>
  )
}
