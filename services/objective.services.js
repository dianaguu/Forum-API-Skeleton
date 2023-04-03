/* eslint-disable */
const { Objective, Category, Comment, User } = requireWrapper('models')
const { localFileHandler } = requireWrapper('helpers/file.helper')
const { getOffset, getPagination } = requireWrapper('helpers/pagination.helper')
/* eslint-enable */

const attributes = ['id', 'name']

const ObjectiveServices = {
  postObjective: async (
    reqFile,
    name,
    telephone,
    address,
    openingHours,
    description,
    categoryId,
    callback
  ) => {
    try {
      if (!name) throw new Error('Objective name is required!')

      const [objective, filePath] = await Promise.all([
        Objective.findOne({ where: { name } }),
        localFileHandler(reqFile)
      ])
      if (objective) throw new Error(`${name} already exist!`)

      const createdObjective = await Objective.create({
        name,
        telephone,
        address,
        openingHours,
        description,
        image: filePath || null,
        categoryId
      })
      callback(null, { objective: createdObjective })
    } catch (err) {
      callback(err)
    }
  },
  getObjectives: async (categoryId, callback) => {
    try {
      const objectives = await Objective.findAll({
        include: [{ model: Category, attributes }],
        where: { ...categoryId ? { categoryId } : {} },
        raw: true,
        nest: true
      })
      callback(null, { objectives })
    } catch (err) {
      callback(err)
    }
  },
  getObjectivesWithPagination: async (
    user,
    categoryId,
    page, limit,
    callback
  ) => {
    try {
      const MN_MAX_CHARACTERS = 50

      // for API: lift restrictions that default limit is 9 as PAGES
      let offset = 0
      let limitAndOffset = {}
      if (limit) {
        offset = getOffset(limit, page)
        limitAndOffset = {
          limit,
          offset
        }
      }

      const [objectives, categories] = await Promise.all([
        Objective.findAndCountAll({
          include: [{ model: Category, attributes }],
          where: { ...categoryId ? { categoryId } : {} },
          ...limitAndOffset,
          raw: true,
          nest: true
        }),
        Category.findAll({ raw: true })
      ])
      const favoriteObjectivesId = user?.FavoriteObjectives.map(element => element.id)
      const likeObjectivesId = user?.LikeObjectives.map(element => element.id)
      const shortDescriptionObjectives = await objectives.rows.map((element) => ({
        ...element,
        description: element.description.substring(0, MN_MAX_CHARACTERS),
        isFavorite: favoriteObjectivesId.includes(element.id),
        isLike: likeObjectivesId.includes(element.id)
      }))
      callback(null, {
        objectives: shortDescriptionObjectives,
        categories,
        categoryId,
        pagination: limit > 0 ? getPagination(limit, page, objectives.count) : {}
      })
    } catch (err) {
      callback(err)
    }
  },
  getObjective: async (reqParamsId, callback) => {
    try {
      const objective = await Objective.findByPk(reqParamsId, {
        include: [{ model: Category, attributes }],
        raw: true,
        nest: true
      })
      if (!objective) throw new Error("Objective didn't exist!")
      callback(null, { objective })
    } catch (err) {
      callback(err)
    }
  },
  getObjectiveWithDetail: async (user, reqParamsId, callback) => {
    try {
      const objective = await Objective.findByPk(reqParamsId, {
        include: [
          { model: Category, attributes },
          { model: Comment, attributes: { exclude: ['objectiveId', 'userId'] }, include: { model: User, attributes } }]
      })
      if (!objective) throw new Error("Objective didn't exist!")

      await objective.increment('views')
      const isFavorite = user?.FavoriteObjectives.some(element => element.id === objective.id)
      const isLike = user?.LikeObjectives.some(element => element.id === objective.id)
      callback(null, { objective: objective.toJSON(), user, isFavorite, isLike })
    } catch (err) {
      callback(err)
    }
  },
  putObjective: async (
    reqParamsId,
    reqFile,
    name,
    telephone,
    address,
    openingHours,
    description,
    categoryId,
    callback
  ) => {
    try {
      if (!name) throw new Error('Objective name is required!')

      const [objective, filePath] = await Promise.all([
        Objective.findByPk(reqParamsId),
        localFileHandler(reqFile)
      ])
      if (!objective) throw new Error(`${name} does not exist!`)

      const updatedObjective = await objective.update({
        name,
        telephone,
        address,
        openingHours,
        description,
        image: filePath || objective.image,
        categoryId
      })
      callback(null, { objective: updatedObjective })
    } catch (err) {
      callback(err)
    }
  },
  deleteObjective: async (reqParamsId, callback) => {
    try {
      const objective = await Objective.findByPk(reqParamsId)
      if (!objective) {
        const err = new Error("Objective didn't exist!")
        err.status = 404
        throw err
      }
      const deletedObjective = await objective.destroy()
      callback(null, { objective: deletedObjective })
    } catch (err) {
      callback(err)
    }
  },
  getDashboard: async (reqParamsId, callback) => {
    try {
      const objective = await Objective.findByPk(reqParamsId, {
        attributes: ['id', 'name', 'views'],
        include: [
          { model: Category, attributes },
          { model: Comment, attributes: ['id'], include: { model: User, attributes } },
          { model: User, attributes, as: 'FavoriteUsers' },
          { model: User, attributes, as: 'LikeUsers' }]
      })
      if (!objective) throw new Error("Objective didn't exist!")
      callback(null, { objective: objective.toJSON() })
    } catch (err) {
      callback(err)
    }
  }
}

module.exports = ObjectiveServices
