import { createAssetServer } from 'remix/assets'

import { withPublicBasePath } from './config.ts'

const rootDir = process.cwd()
const nodeEnv = process.env.NODE_ENV ?? 'development'
const isDevelopment = nodeEnv === 'development'

export const assetServer = createAssetServer({
  basePath: withPublicBasePath('/assets'),
  rootDir,
  fileMap: {
    'app/*path': 'app/*path',
  },
  allow: ['app/assets/**'],
  sourceMaps: isDevelopment ? 'external' : undefined,
  minify: !isDevelopment,
  watch: false,
})
