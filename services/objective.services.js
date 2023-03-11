/* eslint-disable */
const { Objective } = requireWrapper('models')
/* eslint-enable */

const ObjectiveServices = {
  getObjectives: (req, callback) => {
    Objective.findAll({ raw: true })
      .then(objectives => callback(null, { objectives }))
      .catch(err => callback(err))
  },
  postObjective: async (req, callback) => {
    try {
      const { name, telephone, address, openingHours, description } = req.body
      if (!name) throw new Error('Objective name is required!')
      const objective = await Objective.findOne({ where: { name } })
      if (objective) throw new Error('Objective already exists!')
      const createdObjective = await Objective.create({
        name,
        telephone,
        address,
        openingHours,
        description
      })
      callback(null, { objective: createdObjective })
    } catch (err) {
      callback(err)
    }
  },
  putObjective: async (req, callback) => {
    try {
      const { name, telephone, address, openingHours, description } = req.body
      if (!name) throw new Error('Objective name is required!')
      const objective = await Objective.findOne({ where: { name } })
      if (!objective) throw new Error(`${name} does not exist!`)
      // if (id !== objective.id) throw new Error(`id ${id} of req.body and id ${objective.id} queried form database are not match!`)
      const updatedObjective = await objective.update({
        name,
        telephone,
        address,
        openingHours,
        description
      })
      callback(null, { objective: updatedObjective })
    } catch (err) {
      callback(err)
    }
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
