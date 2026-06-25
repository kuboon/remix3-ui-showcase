import { get, route } from 'remix/routes'

import { homePath, withPublicBasePath } from './config.ts'

export const routes = route({
  assets: get(withPublicBasePath('/assets/*path')),
  home: homePath,
})
