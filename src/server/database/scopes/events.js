import includeTags from './includeTags'

export default db => {

  db.models.events.addScope('defaultScope', {
    include: [
      {
        association: 'venue',
        attributes: {
          exclude: [ 'dog_id', 'toilet_id', 'disabled_id' ],
        },
        include: [
          'addresscontact',
          'venuecontact',
          includeTags({ db, category: 'region', as: 'regions' }),
          {
            association: 'dog',
            attributes: {
              exclude: [ 'tag_category_id' ]
            }
          },
          {
            association: 'disabled',
            attributes: {
              exclude: [ 'tag_category_id' ]
            }
          },
          {
            association: 'toilet',
            attributes: {
              exclude: [ 'tag_category_id' ]
            }
          },
        ],
      },
      'contact',
      'bookingcontact',
      'preferred_image',
      {
        association: 'images',
        through: {
          attributes: [],
        },
      },
      includeTags({ db, category: 'discipline', as: 'disciplines' }),
      includeTags({ db, category: 'eventstatus' }),
      includeTags({ db, category: 'eventtype', as: 'eventtypes' }),
      db.models.opening_times,
    ],
    order: [ 'title' ]
  }, {
    override: true
  })

  db.models.events.addScope('eventlist', {
    attributes: [ 'id', 'title', 'subtitle', 'shortdesc' ],
    include: [
      'preferred_image',
      {
        model: db.models.venues,
        include: [ 'regions' ],
      },
      includeTags({ db, category: 'discipline', as: 'disciplines' }),
      db.models.opening_times,
    ],
    order: [ 'title' ],
  })

  db.models.events.addScope('sitemap', {
    attributes: [ 'id' ],
    include: [
      {
        association: 'event_notes',
        attributes: [ 'created' ],
        through: {
          attributes: [],
        },
      },
    ],
    order: [ 'id' ],
  })
}
