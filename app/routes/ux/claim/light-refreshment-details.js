module.exports = function (router) {
  router.get('/light-refreshment-details', function (req, res) {
    return res.render('ux/claim/light-refreshment-details')
  })

  router.post('/light-refreshment-details', function (req, res) {
    return res.redirect('claim-summary')
  })
}
