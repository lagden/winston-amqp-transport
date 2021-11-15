# winston-amqp-transport

[![NPM version][npm-img]][npm]
[![Node.js CI][ci-img]][ci]
[![Coverage Status][coveralls-img]][coveralls]

[npm-img]:         https://img.shields.io/npm/v/@tadashi/winston-amqp-transport.svg
[npm]:             https://www.npmjs.com/package/@tadashi/winston-amqp-transport
[ci-img]:          https://github.com/lagden/winston-amqp-transport/actions/workflows/nodejs.yml/badge.svg
[ci]:              https://github.com/lagden/winston-amqp-transport/actions/workflows/nodejs.yml
[coveralls-img]:   https://coveralls.io/repos/github/lagden/winston-amqp-transport/badge.svg?branch=main
[coveralls]:       https://coveralls.io/github/lagden/winston-amqp-transport?branch=main


Custom transport for Winston.


## Install

```
$ npm i -S @tadashi/winston-amqp-transport
```

## API

### Environment variables available

- TADASHI_AMQP_URL = 'amqp://127.0.0.1:5672'
- TADASHI_AMQP_QUEUE = 'amqp_log'


### AmqpTransport( \[options\]): TransportStream

> Type: TransportStream


#### options 

> Type: object  
> Default: {}


Name        | Type      | Default            | Description
----------- | --------- | -----------------  | ------------
AMQP_URL    | string    | TADASHI_AMQP_URL   | url connection
AMQP_QUEUE  | string    | TADASHI_AMQP_QUEUE | queue name
AMQP_LEVELS | string    | Graylog levels     | custom log level definition


## Usage

```js
import winston from 'winston'
import AmqpTransport from '@tadashi/winston-amqp-transport'

const {
  createLogger,
  config,
} = winston

const opts = {
  levels: config.syslog.levels,
  exitOnError: false,
}

const logger = createLogger({
  ...opts,
  transports: [
    new AmqpTransport({
      AMQP_URL: 'amqp://127.0.0.1:5672',
      AMQP_QUEUE: 'amqp_log'
    })
  ]
})

logger.log({
  level: 'info',
  message: 'Apenas um show'
})
```


## License

MIT © [Thiago Lagden](https://github.com/lagden)
