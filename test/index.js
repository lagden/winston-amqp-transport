import test from 'ava'
import creator from './helper/logger.js'
import createPool from '../src/lib/db.js'

function _logger(data, opts) {
	return new Promise((resolve, reject) => {
		const logger = creator(opts)
		logger
			.on('error', reject)
			.on('finish', resolve)
			.log(data)
			.end()
	})
}

test.serial('logger', async t => {
	await _logger({
		level: 'info',
		message: 'Apenas um show 1',
	})
	await _logger({
		level: 'info',
		message: 'Apenas um show 2',
	})
	await _logger({
		level: 'info',
		message: 'Apenas um show 3',
	})
	await _logger({
		level: 'info',
		message: 'Apenas um show 4',
	})
	t.pass('ok')
})

test.serial('error', async t => {
	const error = await t.throwsAsync(_logger({
		level: 'error',
		message: 'Xii marquinhos',
	}, {
		AMQP_URL: 'amqp://test:passwd@127.0.0.1',
		AMQP_QUEUE: 'xii',
	}))
	t.snapshot(error.message)
	t.pass('ok')
})

test.serial('pool', async t => {
	const pool = createPool()
	const conn = await pool.acquire()
	pool.destroy(conn)
	t.pass('ok')
})

/*
docker run -d \
  --name rabbit_local \
  -p 5672:5672 \
  rabbitmq:3.9-alpine
*/
