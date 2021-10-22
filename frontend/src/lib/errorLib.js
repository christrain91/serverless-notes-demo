import * as Sentry from '@sentry/react'
import { Integrations } from "@sentry/tracing"

const isLocal = process.env.NODE_ENV === 'development'

export function initSentry () {
  if (isLocal) return

  Sentry.init({
    dsn: "https://04b0502c30c940e58376d313e008a3ee@o1048432.ingest.sentry.io/6028560",
    integrations: [new Integrations.BrowserTracing()],

    // Set tracesSampleRate to 1.0 to capture 100%
    // of transactions for performance monitoring.
    // We recommend adjusting this value in production
    tracesSampleRate: 1.0,
  });
}

export function logError (error, errorInfo = null) {
  if (isLocal) return

  Sentry.withScope((scope) => {
    if (errorInfo) {
      scope.setExtras(errorInfo)
    }
    Sentry.captureException(error)
  })
}



export function onError (error) {
  let message = error.toString()
  let errorInfo = {}

  if (!(error instanceof Error) && error.message) {
    message = error.message
    errorInfo = error
    error = new Error(message)
  } else if (error.config && error.config.url) {
    errorInfo.url = error.config.url
  }

  logError(error, errorInfo)
  alert(message)
}