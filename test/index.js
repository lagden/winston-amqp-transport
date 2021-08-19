import process from 'node:process'

process.env.TADASHI_AMQP_QUEUE = 'test'
process.env.TADASHI_AMQP_URL = 'amqp://test:test@127.0.0.1:5672'

import test from 'ava'
import creator from './helper/logger.js'

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
		message: 'Apenas um show',
	})
	t.pass('ok')
})

test.serial('error', async t => {
	const error = await t.throwsAsync(_logger({
		level: 'error',
		message: 'Xii marquinhos',
	}, {
		AMQP_URL: 'amqp://127.0.0.1',
		AMQP_QUEUE: 'xii',
	}))
	t.snapshot(error.message)
	t.pass('ok')
})

/*
docker run -d \
  --name rabbit_local \
  -p 5672:5672 \
  -e RABBITMQ_ERLANG_COOKIE='secret' \
  -e RABBITMQ_DEFAULT_USER='test' \
  -e RABBITMQ_DEFAULT_PASS='test' \
  rabbitmq:3.8-alpine
*/
