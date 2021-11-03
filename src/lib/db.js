import genericPool from 'generic-pool'
import amqp from 'amqplib'

const {
	TADASHI_AMQP_URL,
	TADASHI_AMQP_POOL_MIN = 2,
	TADASHI_AMQP_POOL_MAX = 10,
	TADASHI_AMQP_POOL_ACQUIRE_TIMEOUT = 5000,
	TADASHI_AMQP_POOL_DESTROY_TIMEOUT = 5000,
} = process.env

function createPool(options = {}) {
	const {
		AMQP_URL = TADASHI_AMQP_URL,
		AMQP_POOL_MIN = TADASHI_AMQP_POOL_MIN,
		AMQP_POOL_MAX = TADASHI_AMQP_POOL_MAX,
		AMQP_POOL_ACQUIRE_TIMEOUT = TADASHI_AMQP_POOL_ACQUIRE_TIMEOUT,
		AMQP_POOL_DESTROY_TIMEOUT = TADASHI_AMQP_POOL_DESTROY_TIMEOUT,
	} = options

	const factory = {
		create() {
			return amqp.connect(AMQP_URL)
		},
		destroy(client) {
			client.close()
		},
	}

	const opts = {
		min: AMQP_POOL_MIN,
		max: AMQP_POOL_MAX,
		acquireTimeoutMillis: AMQP_POOL_ACQUIRE_TIMEOUT,
		destroyTimeoutMillis: AMQP_POOL_DESTROY_TIMEOUT,
	}

	const _pool = genericPool.createPool(factory, opts)
	return _pool
}

export default createPool
