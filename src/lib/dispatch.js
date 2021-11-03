import {hostname} from 'node:os'
import process from 'node:process'
import hexId from '@tadashi/hex-id'

const {
	TADASHI_AMQP_QUEUE,
} = process.env

const _levels = {
	emerg: 0,
	alert: 1,
	crit: 2,
	error: 3,
	warning: 4,
	notice: 5,
	info: 6,
	debug: 7,
}

async function dispatch(data, opts, pool) {
	const {
		AMQP_QUEUE = TADASHI_AMQP_QUEUE,
	} = opts

	const correlationId = hexId()

	let _error
	let conn

	try {
		conn = await pool.acquire()
		const ch = await conn.createChannel()
		await ch.assertQueue(AMQP_QUEUE, {durable: true})

		data.correlationId = correlationId
		data.hostname = hostname()
		data.level = _levels?.[data.level]

		const bufData = Buffer.from(JSON.stringify(data), 'utf8')
		await ch.sendToQueue(AMQP_QUEUE, bufData, {
			deliveryMode: true,
			correlationId,
		})
		await ch.close()
	} catch (error) {
		_error = error
	} finally {
		if (conn) {
			pool.release(conn)
		}
	}

	if (_error) {
		throw _error
	}

	return data
}

export default dispatch
