/* eslint-disable */
const { Objective, Category } = requireWrapper('models')
const { localFileHandler } = requireWrapper('helpers/file.helper') 
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
  postObjective: (req, callback) => {
    const { name, telephone, address, openingHours, description, categoryId } = req.body
    if (!name) throw new Error('Objective name is required!')

    Promise.all([
      Objective.findOne({ where: { name } }),
      localFileHandler(req.file)
    ])
      .then(([objective, filePath]) => {
        if (objective) throw new Error(`${name} already exist!`)
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
      .then(createdObjective => callback(null, { objective: createdObjective }))
      .catch(err => callback(err))
  },
  getObjective: (req, callback) => {
    Objective.findByPk(req.params.id, {
      raw: true,
      nest: true,
      include: [Category]
    })
      .then(objective => {
        if (!objective) throw new Error("Objective didn't exist!")
        callback(null, { objective })
      })
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
  }
}

module.exports = ObjectiveServices
