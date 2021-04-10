/* eslint-disable */

import mockClient from 'dynamic-mocker/lib/client.js'

var config = require('./mock-config.js')

mockClient.setup(config, {
  '/api/getInfo': require('./root/api/getInfo.js'),
  '/api/getMenu': require('./root/api/getMenu.js'),
  '/api/test_api': require('./root/api/test_api.js'),
  '/api/test_data': require('./root/api/test_data.js'),
  '/buyProducts': require('./root/buyProducts.js'),
  '/getProducts': require('./root/getProducts.js')
})
