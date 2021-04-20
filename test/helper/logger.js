const {createLogger, config} = require('winston')
const AmqpTransport = require('../../src/amqp-transport')

const opts = {
	levels: config.syslog.levels,
	exitOnError: false
}

function creator(options) {
	return createLogger({...opts, transports: [new AmqpTransport(options)]})
}

module.exports = creator
