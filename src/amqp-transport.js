import Transport from 'winston-transport'
import dispatch from './lib/dispatch.js'
import * as debug from './lib/debug.js'

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
				callback(error)
			})
	}
}

export default AmqpTransport
