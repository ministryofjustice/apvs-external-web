$('#document').change(function () {
  var document = $('#document').val().replace(/\\/g, '/').replace(/.*\//, '')
  if (document) {
    $('#alternative').hide()
    $('#document-name').html(document)
  }
})
