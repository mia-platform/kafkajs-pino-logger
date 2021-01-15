/* eslint-disable no-unused-vars,default-case */
'use strict'

const { logLevel: kafkaJsLogLevels } = require('kafkajs')
const pino = require('pino')

function defaultRedactionRules() {
  return {
    paths: ['email', 'password', 'username', '[*].email', '[*].password', '[*].username'],
    censor: '[REDACTED]',
  }
}

function timestampFunction() {
  return `,"time":${Math.round(Date.now() / 1000.0)}`
}

function toPinoLogLevel(kafkaLogLevel) {
  switch (kafkaLogLevel) {
  case kafkaJsLogLevels.ERROR:
    return 'error'
  case kafkaJsLogLevels.WARN:
    return 'warn'
  case kafkaJsLogLevels.DEBUG:
    return 'debug'
  case kafkaJsLogLevels.NOTHING:
    return 'silent'
  case kafkaJsLogLevels.INFO:
  default:
    return 'info'
  }
}

module.exports = function PinoLogCreator(logLevel) {
  const logger = pino({
    level: toPinoLogLevel(logLevel),
    redact: defaultRedactionRules(),
    timestamp: timestampFunction,
  })

  return ({ level, log }) => {
    const pinoLevel = toPinoLogLevel(level)
    const { message, timestamp, ...extras } = log
    logger[pinoLevel](extras, message)
  }
}
