export default ({ db, ...options }) => {
  return {
    model: db.models.tags,
    as: options.as || options.category,
    attributes: {
      exclude: [ 'tag_category_id' ],
    },
    through: {
      attributes: [],
    },
    include: [
      {
        model: db.models.tag_categories,
        attributes: [],
        where: {
          category: options.category,
        },
      },
    ],
  }
}
