'use strict'

const tap = require('tap')
const { logLevel: kafkaJsLogLevels } = require('kafkajs')
const customLogger = require('../index')

tap.test('Creates the logging function', t => {
  t.test('with default level', t => {
    let loggedOutput = ''

    const originalStdout = process.stdout.write.bind(process.stdout)
    process.stdout.write = (chunk, encoding, callback) => {
      if (typeof chunk === 'string') {
        loggedOutput += chunk
      }
      return originalStdout(chunk, encoding, callback)
    }

    const logger = customLogger()
    t.strictSame(typeof logger, 'function')

    logger({
      level: kafkaJsLogLevels.DEBUG,
      log: { message: 'Test debug message' },
    })
    t.notOk(loggedOutput)

    logger({
      level: kafkaJsLogLevels.INFO,
      log: { message: 'Test info message' },
    })
    t.ok(loggedOutput)

    process.stdout.write = originalStdout
    t.end()
  })

  t.test('with given level', t => {
    let loggedOutput = ''

    const originalStdout = process.stdout.write.bind(process.stdout)
    process.stdout.write = (chunk, encoding, callback) => {
      if (typeof chunk === 'string') {
        loggedOutput += chunk
      }
      return originalStdout(chunk, encoding, callback)
    }

    const logger = customLogger(kafkaJsLogLevels.DEBUG)
    t.strictSame(typeof logger, 'function')

    logger({
      level: kafkaJsLogLevels.DEBUG,
      log: { message: 'Test debug message' },
    })
    t.ok(loggedOutput)

    process.stdout.write = originalStdout
    t.end()
  })

  t.test('with silent level', t => {
    let loggedOutput = ''

    const originalStdout = process.stdout.write.bind(process.stdout)
    process.stdout.write = (chunk, encoding, callback) => {
      if (typeof chunk === 'string') {
        loggedOutput += chunk
      }
      return originalStdout(chunk, encoding, callback)
    }

    const logger = customLogger(kafkaJsLogLevels.NOTHING)
    t.strictSame(typeof logger, 'function')

    logger({
      level: kafkaJsLogLevels.ERROR,
      log: { message: 'Test error message' },
    })
    t.notOk(loggedOutput)

    logger({
      level: kafkaJsLogLevels.WARN,
      log: { message: 'Test warn message' },
    })
    t.notOk(loggedOutput)

    logger({
      level: kafkaJsLogLevels.INFO,
      log: { message: 'Test info message' },
    })
    t.notOk(loggedOutput)

    logger({
      level: kafkaJsLogLevels.DEBUG,
      log: { message: 'Test debug message' },
    })
    t.notOk(loggedOutput)

    process.stdout.write = originalStdout
    t.end()
  })

  t.end()
})
