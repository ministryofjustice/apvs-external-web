module.exports = function (router) {
  router.get('/transport', function (req, res, next) {
    res.render('claim/transport')
    next()
  })

  router.post('/transport', function (req, res, next) {
    res.redirect('car-details')
    next()
  })
}
