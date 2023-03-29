/* eslint-disable */
const analysisServices = requireWrapper('services/analysis.services')
/* eslint-enable */

const analysisController = {
  preprocess: (req, res, next) => {
    const reqAnalysisData = req.analysisData
    const reqQueryKey = req.query.key
    analysisServices.preprocess(reqAnalysisData, reqQueryKey, (err, data) => err ? next(err) : res.json({ status: 'success', data }))
  }
}

module.exports = analysisController
