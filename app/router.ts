import { createRouter, type Middleware, type MiddlewareContext } from 'remix/router'
import { staticFiles } from 'remix/middleware/static'

import controller from './actions/controller.tsx'
import { render } from './middleware/render.tsx'
import { routes } from './routes.ts'

type AppContext = MiddlewareContext<[ReturnType<typeof render>]>

declare module 'remix/router' {
  interface RouterTypes {
    context: AppContext
  }
}

export const router = createRouter<AppContext>({
  // `staticFiles` is typed against a nested fetch-router copy pinned by
  // @remix-run/static-middleware (a beta dependency skew); the runtime shape is
  // identical, so re-assert the current fetch-router's Middleware type.
  middleware: [staticFiles('./public', { index: false }) as unknown as Middleware, render()],
})

router.map(routes, controller)
