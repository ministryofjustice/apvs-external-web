module.exports = function (router) {
  router.get('/claim-details', function (req, res, next) {
    res.render('claim/claim-details')
    next()
  })
}
