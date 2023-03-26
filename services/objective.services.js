/* eslint-disable */
const { Objective, Category, Comment, User } = requireWrapper('models')
const { localFileHandler } = requireWrapper('helpers/file.helper')
const { getOffset, getPagination } = requireWrapper('helpers/pagination.helper')
/* eslint-enable */

const ObjectiveServices = {
  getObjectives: (categoryId, callback) => {
    Objective.findAll({
      raw: true,
      nest: true,
      include: [Category],
      where: { ...categoryId ? { categoryId } : {} }
    })
      .then(objectives => callback(null, { objectives }))
      .catch(err => callback(err))
  },
  getObjectivesWithPagination: async (user, categoryId, page, limit, callback) => {
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

      const favoriteObjectivesId = user && user.FavoriteObjectives.map(element => element.id)
      const likeObjectivesId = user && user.LikeObjectives.map(element => element.id)
      const shortDescriptionObjectives = await objectives.rows.map((element) => ({
        ...element,
        description: element.description.substring(0, 50),
        isFavorite: favoriteObjectivesId.includes(element.id),
        isLike: likeObjectivesId.includes(element.id)
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
  getObjectiveWithComments: (user, id, callback) => {
    Objective.findByPk(id, {
      include: [Category,
        { model: Comment, include: User },
        { model: User, as: 'FavoriteUsers' },
        { model: User, as: 'LikeUsers' }]
    })
      .then(objective => {
        if (!objective) throw new Error("Objective didn't exist!")
        return objective.increment('views')
      })
      .then(objective => {
        const isFavorite = objective.FavoriteUsers.some(element => element.id === user.id)
        const isLike = objective.LikeUsers.some(element => element.id === user.id)
        callback(null, { objective: objective.toJSON(), isFavorite, isLike })
      })
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
        { model: Comment, include: User },
        { model: User, as: 'FavoriteUsers' },
        { model: User, as: 'LikeUsers' }]
    })
      .then(objective => {
        if (!objective) throw new Error("Objective didn't exist!")
        callback(null, { objective: objective.toJSON() })
      })
      .catch(err => callback(err))
  },
  getTopTen: async (reqUser, callback) => {
    try {
      const objectives = await Objective.findAll({
        include: { model: User, as: 'FavoriteUsers' }
      })
      const preprocessedObjectives = await objectives.map((objective) => ({
        ...objective.toJSON(),
        description: objective.description.substring(0, 50),
        favoriteCount: objective.FavoriteUsers.length,
        isFavorite: reqUser?.FavoriteObjectives.map(favoriteObjectives =>
          favoriteObjectives.id).includes(objective.id)
      }))
        .sort((a, b) => b.favoriteCount - a.favoriteCount)
        .slice(0, 10)
      callback(null, { objectives: preprocessedObjectives })
    } catch (err) {
      callback(err)
    }
  },
  getFeed: async (req, callback) => {
    try {
      const [objectives, comments] = await Promise.all([
        Objective.findAll({
          limit: 10,
          order: [['createdAt', 'DESC']],
          include: [Category],
          raw: true,
          nest: true
        }),
        Comment.findAll({
          limit: 10,
          order: [['createdAt', 'DESC']],
          include: [User, Objective],
          raw: true,
          nest: true
        })
      ])
      callback(null, { objectives, comments })
    } catch (err) {
      callback(err)
    }
  }
}

module.exports = ObjectiveServices
