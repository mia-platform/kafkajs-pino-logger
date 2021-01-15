'use strict'

const tap = require('tap')
const { Kafka, logLevel: kafkaJsLogLevels } = require('kafkajs')
const customLogger = require('../index')

tap.test('Kafka client with custom logger', t => {
  const initKafkaClient = logLevel => {
    return new Kafka({
      clientId: 'test',
      logLevel,
      logCreator: customLogger,
    })
  }

  const parseOutput = output => JSON.parse(output.replace('\n', ''))

  t.test('correctly logs error', t => {
    let loggedOutput = ''

    const originalStdout = process.stdout.write.bind(process.stdout)
    process.stdout.write = (chunk, encoding, callback) => {
      if (typeof chunk === 'string') {
        loggedOutput += chunk
      }
      return originalStdout(chunk, encoding, callback)
    }

    initKafkaClient(kafkaJsLogLevels.DEBUG)
      .logger()
      .error('Test error log', { foo: 'bar' })

    const parsedOutput = parseOutput(loggedOutput)
    t.strictSame(parsedOutput.level, 50)
    t.ok(parsedOutput.time)
    t.ok(parsedOutput.pid)
    t.ok(parsedOutput.hostname)
    t.strictSame(parsedOutput.foo, 'bar')
    t.strictSame(parsedOutput.msg, 'Test error log')

    process.stdout.write = originalStdout
    t.end()
  })

  t.test('correctly logs warning', t => {
    let loggedOutput = ''

    const originalStdout = process.stdout.write.bind(process.stdout)
    process.stdout.write = (chunk, encoding, callback) => {
      if (typeof chunk === 'string') {
        loggedOutput += chunk
      }
      return originalStdout(chunk, encoding, callback)
    }

    initKafkaClient(kafkaJsLogLevels.DEBUG)
      .logger()
      .warn('Test warn log', { foo: 'bar' })

    const parsedOutput = parseOutput(loggedOutput)
    t.strictSame(parsedOutput.level, 40)
    t.ok(parsedOutput.time)
    t.ok(parsedOutput.pid)
    t.ok(parsedOutput.hostname)
    t.strictSame(parsedOutput.foo, 'bar')
    t.strictSame(parsedOutput.msg, 'Test warn log')

    process.stdout.write = originalStdout
    t.end()
  })

  t.test('correctly logs info', t => {
    let loggedOutput = ''

    const originalStdout = process.stdout.write.bind(process.stdout)
    process.stdout.write = (chunk, encoding, callback) => {
      if (typeof chunk === 'string') {
        loggedOutput += chunk
      }
      return originalStdout(chunk, encoding, callback)
    }

    initKafkaClient(kafkaJsLogLevels.DEBUG)
      .logger()
      .info('Test info log', { foo: 'bar' })

    const parsedOutput = parseOutput(loggedOutput)
    t.strictSame(parsedOutput.level, 30)
    t.ok(parsedOutput.time)
    t.ok(parsedOutput.pid)
    t.ok(parsedOutput.hostname)
    t.strictSame(parsedOutput.foo, 'bar')
    t.strictSame(parsedOutput.msg, 'Test info log')

    process.stdout.write = originalStdout
    t.end()
  })

  t.test('correctly logs debug', t => {
    let loggedOutput = ''

    const originalStdout = process.stdout.write.bind(process.stdout)
    process.stdout.write = (chunk, encoding, callback) => {
      if (typeof chunk === 'string') {
        loggedOutput += chunk
      }
      return originalStdout(chunk, encoding, callback)
    }

    initKafkaClient(kafkaJsLogLevels.DEBUG)
      .logger()
      .debug('Test debug log', { foo: 'bar' })

    const parsedOutput = parseOutput(loggedOutput)
    t.strictSame(parsedOutput.level, 20)
    t.ok(parsedOutput.time)
    t.ok(parsedOutput.pid)
    t.ok(parsedOutput.hostname)
    t.strictSame(parsedOutput.foo, 'bar')
    t.strictSame(parsedOutput.msg, 'Test debug log')

    process.stdout.write = originalStdout
    t.end()
  })

  t.end()
})
