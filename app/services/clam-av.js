const config = require('../../config')
var Promise = require('bluebird').Promise
const NodeClam = require('clamscan')

var clam
try {
  clam = new NodeClam().init({
    remove_infected: config.CLAM_REMOVE_INFECTED,
    quarantine_infected: false,
    clamdscan: {
      path: config.CLAM_AV_PATH,
      config_file: config.CLAM_AV_CONF_PATH
    }
  })
} catch (error) {
  // Suppress clamscan error if disabled
  if (config.ENABLE_MALWARE_SCANNING !== 'true' &&
      !error.message.includes('No valid & active virus scanning binaries are active and available!')) {
    throw error
  }
}

module.exports.scan = function (filePath) {
  if (config.ENABLE_MALWARE_SCANNING === 'true') {
    clam.then(clamscan => {
      clamscan.is_infected(filePath, (error, file, isInfected, viruses) => {
        if (error) throw error
        return Promise.resolve(isInfected)
      })
    })
  } else {
    return Promise.resolve(false)
  }
}
