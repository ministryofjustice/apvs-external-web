module.exports = function (router) {
  router.get('/file-upload', function (req, res, next) {
    res.render('file-upload')
    next()
  })

  router.post('/file-upload', function (req, res, next) {
    res.redirect('visit-type')
    next()
  })
}
