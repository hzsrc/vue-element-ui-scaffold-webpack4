/* eslint-disable */

import mockClient from 'dynamic-mocker/lib/client'
import config from './../../mock/mock-config.js'

mockClient.setup(config, pathname => import('./../../mock/root' + pathname + '.js')
  .catch(e => import('./../../mock/root-old' + pathname + '.js')))
