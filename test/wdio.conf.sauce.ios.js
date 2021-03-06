const wdioConfHelper = require('./helpers/wdio-conf-helper')

exports.config = wdioConfHelper({
  services: ['sauce'],
  user: process.env.SAUCE_USERNAME,
  key: process.env.SAUCE_ACCESS_KEY,
  baseUrl: process.env.SAUCE_BASEURL || 'http://localhost:3000',
  sauceConnect: true,
  capabilities: [{
    maxInstances: 1,
    platformName: 'iOS',
    platformVersion: '9.1',
    browserName: 'Safari',
    deviceName: 'iPhone 6s Simulator',
    deviceOrientation: 'portrait'
  }]
})
