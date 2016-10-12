module.exports = function (router) {
  router.get('/visit-type', function (req, res, next) {
    res.render('claim/visit-type')
    next()
  })

  router.post('/visit-type', function (req, res, next) {
    res.redirect('your-journey')
    next()
  })
}
