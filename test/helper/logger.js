import winston from 'winston'
import AmqpTransport from '../../src/amqp-transport.js'

const {
	createLogger,
	config,
} = winston

const opts = {
	levels: config.syslog.levels,
	exitOnError: false,
}

function creator(options) {
	return createLogger({...opts, transports: [new AmqpTransport(options)]})
}

export default creator
