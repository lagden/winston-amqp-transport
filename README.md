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

- TADASHI_AMQP_URL
- TADASHI_AMQP_QUEUE
- TADASHI_AMQP_POOL_MIN = 2
- TADASHI_AMQP_POOL_MAX = 10
- TADASHI_AMQP_POOL_ACQUIRE_TIMEOUT = 5000
- TADASHI_AMQP_POOL_DESTROY_TIMEOUT = 5000


### AmqpTransport( \[options\]): TransportStream

> Type: TransportStream


#### options 

> Type: object  
> Default: {}


Name                      | Type      | Default                           | Description
-----------               | --------- | -----------------                 | ------------
AMQP_URL                  | string    | TADASHI_AMQP_URL                  | amqp url connection
AMQP_QUEUE                | string    | TADASHI_AMQP_QUEUE                | amqp queue name
AMQP_POOL_MIN             | number    | TADASHI_AMQP_POOL_MIN             | minimum number of resources to keep in pool
AMQP_POOL_MAX             | number    | TADASHI_AMQP_POOL_MAX             | maximum number of resources
AMQP_POOL_ACQUIRE_TIMEOUT | number    | TADASHI_AMQP_POOL_ACQUIRE_TIMEOUT | max milliseconds an acquire call will wait for a resource
AMQP_POOL_DESTROY_TIMEOUT | number    | TADASHI_AMQP_POOL_DESTROY_TIMEOUT | max milliseconds a destroy call will wait for a resource


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
      AMQP_QUEUE: 'graylog'
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
