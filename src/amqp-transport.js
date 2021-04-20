'use strict'

const Transport = require('winston-transport')
const dispatch = require('./lib/dispatch')
const debug = require('./lib/debug')

class AmqpTransport extends Transport {
	constructor(options = {}) {
		super(options)

		this.options = options
	}

	log(data, callback) {
		dispatch(data, this.options)
			.then(_data => {
				debug.log('dispatch | then', _data)
				this.emit('logged', _data)
				callback(undefined, 'logged')
			})
			.catch(error => {
				debug.error('dispatch | catch', error.message)
				this.emit('error', error)
				callback(error, undefined)
			})
	}
}

module.exports = AmqpTransport
