<div align="center">

# KafkaJS pino logger

[![NPM version][npmjs-svg]][npmjs-com]
[![javascript style guide](https://img.shields.io/badge/code_style-standard--mia-orange.svg)](https://github.com/mia-platform/eslint-config-mia)
[![Coverage Status][coverall-svg]][coverall-io]

</div>

This library provides a [pino](https://github.com/pinojs/pino) custom logger for
[KafkaJS](https://kafka.js.org/) that follows Mia-Platform
[guidelines for logs](https://docs.mia-platform.eu/docs/getting_started/monitoring-dashboard/dev_ops_guide/log)

## Getting Started

### Install

The package requires `kafkajs` to work, to list the correct version you can run:

```sh
npm info "@mia-platform/kafkajs-pino-logger@latest" peerDependencies
```

To install the package you can run:

```sh
npm install @mia-platform/kafkajs-pino-logger --save
```

## How to use it

The package exposes a log creator that you can pass to the `logCreator` option
when configuring your Kafka client.

```javascript
const { Kafka } = require('kafkajs')
const PinoLogCreator = require('@mia-platform/kafkajs-pino-logger')

const kafka = new Kafka({
  clientId: 'my-app',
  brokers: ['kafka1:9092', 'kafka2:9092'],
  logLevel: logLevel.ERROR,
  logCreator: PinoLogCreator
})
```

### Output logs

The logs will have this form:

```json
{"level":20,"time":1610718695,"pid":46244,"hostname":"test-host","logger":"kafkajs","extraKey":"Your extra","msg":"Your log message"}
```

[coverall-svg]: https://coveralls.io/repos/github/mia-platform/kafkajs-pino-logger/badge.svg?branch=main
[coverall-io]: https://coveralls.io/github/mia-platform/kafkajs-pino-logger?branch=main
[npmjs-svg]: https://img.shields.io/npm/v/@mia-platform/kafkajs-pino-logger.svg?logo=npm
[npmjs-com]: https://www.npmjs.com/package/@mia-platform/kafkajs-pino-logger
