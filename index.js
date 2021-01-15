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
  case kafkaJsLogLevels.INFO:
    return 'info'
  case kafkaJsLogLevels.DEBUG:
    return 'debug'
  case kafkaJsLogLevels.NOTHING:
    return 'silent'
  }
}

module.exports = function PinoLogCreator(logLevel) {
  const logger = pino({
    level: toPinoLogLevel((!logLevel && logLevel !== 0) ? kafkaJsLogLevels.INFO : logLevel),
    redact: defaultRedactionRules(),
    timestamp: timestampFunction,
  })

  return ({ level, log }) => {
    const pinoLevel = toPinoLogLevel(level)
    const { message, timestamp, logger: kafkaLogger, ...extras } = log
    logger[pinoLevel](extras, message)
  }
}
