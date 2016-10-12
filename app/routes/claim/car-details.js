module.exports = function (router) {
  router.get('/car-details', function (req, res, next) {
    res.render('claim/car-details')
    next()
  })

  router.post('/car-details', function (req, res, next) {
    res.redirect('train-details')
    next()
  })
}
