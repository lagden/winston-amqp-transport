# winston-amqp-transport

[![NPM version][npm-img]][npm]
[![Node.js CI][ci-img]][ci]
[![Coverage Status][coveralls-img]][coveralls]

[![XO code style][xo-img]][xo]

[npm-img]:         https://img.shields.io/npm/v/@tadashi/winston-amqp-transport.svg
[npm]:             https://www.npmjs.com/package/@tadashi/winston-amqp-transport
[ci-img]:          https://github.com/lagden/winston-amqp-transport/workflows/Node.js%20CI/badge.svg
[ci]:              https://github.com/lagden/winston-amqp-transport/actions?query=workflow%3A%22Node.js+CI%22
[coveralls-img]:   https://coveralls.io/repos/github/lagden/winston-amqp-transport/badge.svg?branch=main
[coveralls]:       https://coveralls.io/github/lagden/winston-amqp-transport?branch=main
[xo-img]:          https://img.shields.io/badge/code_style-XO-5ed9c7.svg
[xo]:              https://github.com/sindresorhus/xo


Custom transport for Winston.


## Install

```
$ npm i -S @tadashi/winston-amqp-transport
```

## API

### Environment variables available

- TADASHI_AMQP_URL
- TADASHI_AMQP_QUEUE


### AmqpTransport( \[options\]): TransportStream

> Type: TransportStream


#### options 

> Type: object  
> Default: {}


Name        | Type      | Default            | Description
----------- | --------- | -----------------  | ------------
AMQP_URL    | string    | TADASHI_AMQP_URL   | amqp url connection
AMQP_QUEUE  | string    | TADASHI_AMQP_QUEUE | amqp queue name


## Usage

```js
'use strict'

const {createLogger, config} = require('winston')
const AmqpTransport = require('@tadashi/winston-amqp-transport')

const opts = {
  levels: config.syslog.levels,
  exitOnError: false
}

const logger = createLogger({...opts, transports: [new AmqpTransport({
  AMQP_URL: 'amqp://test:test@127.0.0.1:5672',
  AMQP_QUEUE: 'graylog'
})]})

logger.log({
  level: 'info',
  message: 'Apenas um show'
})
```


## License

MIT © [Thiago Lagden](https://github.com/lagden)
