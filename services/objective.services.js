/* eslint-disable */
const { Objective, Category, Comment, User } = requireWrapper('models')
const { localFileHandler } = requireWrapper('helpers/file.helper')
const { getOffset, getPagination } = requireWrapper('helpers/pagination.helper')
/* eslint-enable */

const ObjectiveServices = {
  getObjectives: (req, callback) => {
    Objective.findAll({
      raw: true,
      nest: true,
      include: [Category]
    })
      .then(objectives => callback(null, { objectives }))
      .catch(err => callback(err))
  },
  getObjectivesWithCategoryId: (categoryId, callback) => {
    Objective.findAll({
      raw: true,
      nest: true,
      include: [Category],
      where: { ...categoryId ? { categoryId } : {} }
    })
      .then(objectives => callback(null, { objectives }))
      .catch(err => callback(err))
  },
  getObjectivesWithCategoryIdAndPagination: async (categoryId, page, limit, callback) => {
    try {
      const offset = getOffset(limit, page)
      const [objectives, categories] = await Promise.all([
        Objective.findAndCountAll({
          raw: true,
          nest: true,
          include: [Category],
          where: { ...categoryId ? { categoryId } : {} },
          limit,
          offset
        }),
        Category.findAll({ raw: true })
      ])
      const shortDescriptionObjectives = await objectives.rows.map((element) => ({
        ...element,
        description: element.description.substring(0, 50)
      }))
      callback(null, {
        objectives: shortDescriptionObjectives,
        categories,
        categoryId,
        pagination: getPagination(limit, page, objectives.count)
      })
    } catch (err) {
      callback(err)
    }
  },
  getObjective: (req, callback) => {
    Objective.findByPk(req.params.id, {
      include: [Category]
    })
      .then(objective => {
        if (!objective) throw new Error("Objective didn't exist!")
        return objective.increment('views')
      })
      .then(objective => callback(null, { objective: objective.toJSON() }))
      .catch(err => callback(err))
  },
  getObjectiveWithComments: (id, callback) => {
    Objective.findByPk(id, {
      include: [Category,
        { model: Comment, include: User }]
    })
      .then(objective => {
        if (!objective) throw new Error("Objective didn't exist!")
        return objective.increment('views')
      })
      .then(objective => callback(null, { objective: objective.toJSON() }))
      .catch(err => callback(err))
  },
  postObjective: (req, callback) => {
    const { name, telephone, address, openingHours, description, categoryId } = req.body
    if (!name) throw new Error('Objective name is required!')

    Promise.all([
      Objective.findOne({ where: { name } }),
      localFileHandler(req.file)
    ])
      .then(([objective, filePath]) => {
        if (objective) throw new Error(`${name} already exist!`)
        Objective.create({
          name,
          telephone,
          address,
          openingHours,
          description,
          image: filePath || null,
          categoryId
        })
      })
      .then(createdObjective => callback(null, { objective: createdObjective }))
      .catch(err => callback(err))
  },
  putObjective: (req, callback) => {
    const { name, telephone, address, openingHours, description, categoryId } = req.body
    if (!name) throw new Error('Objective name is required!')

    Promise.all([
      Objective.findByPk(req.params.id),
      localFileHandler(req.file)
    ])
      .then(([objective, filePath]) => {
        if (!objective) throw new Error(`${name} does not exist!`)
        // if (id !== objective.id) throw new Error(`id ${id} of req.body and id ${objective.id} queried form database are not match!`)
        objective.update({
          name,
          telephone,
          address,
          openingHours,
          description,
          image: filePath || null,
          categoryId
        })
      })
      .then(updatedObjective => callback(null, { objective: updatedObjective }))
      .catch(err => callback(err))
  },
  deleteObjective: (req, callback) => {
    return Objective.findByPk(req.params.id)
      .then(objective => {
        if (!objective) {
          const err = new Error("Objective didn't exist!")
          err.status = 404
          throw err
        }
        return objective.destroy()
      })
      .then(deletedObjective => callback(null, { objective: deletedObjective }))
      .catch(err => callback(err))
  },
  getDashboard: (req, callback) => {
    return Objective.findByPk(req.params.id, {
      include: [Category,
        { model: Comment, include: User }
      ]
    })
      .then(objective => {
        if (!objective) throw new Error("Objective didn't exist!")
        callback(null, { objective: objective.toJSON() })
      })
      .catch(err => callback(err))
  }
}

module.exports = ObjectiveServices
