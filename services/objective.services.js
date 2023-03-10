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
      const newObjective = await Objective.create({
        name,
        telephone,
        address,
        openingHours,
        description
      })
      callback(null, { objective: newObjective })
    } catch (err) {
      callback(err)
    }
  }
}

module.exports = ObjectiveServices
