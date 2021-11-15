import {hostname} from 'node:os'
import process from 'node:process'
import amqp from 'amqplib'
import hexId from '@tadashi/hex-id'
import levels from './level.js'

const {
	TADASHI_AMQP_URL = 'amqp://127.0.0.1:5672',
	TADASHI_AMQP_QUEUE = 'amqp_log',
} = process.env

async function dispatch(data, opts) {
	const {
		AMQP_URL = TADASHI_AMQP_URL,
		AMQP_QUEUE = TADASHI_AMQP_QUEUE,
		AMQP_LEVELS = levels,
	} = opts

	const correlationId = hexId()
	let error
	let conn

	try {
		conn = await amqp.connect(AMQP_URL)
		const ch = await conn.createChannel()
		await ch.assertQueue(AMQP_QUEUE, {durable: true})

		data.correlationId = correlationId
		data.hostname = hostname()
		data.level = AMQP_LEVELS?.[data.level]

		const bufData = Buffer.from(JSON.stringify(data), 'utf8')
		await ch.sendToQueue(AMQP_QUEUE, bufData, {
			deliveryMode: true,
			correlationId,
		})
		await ch.close()
	} catch (error_) {
		error = error_
	} finally {
		if (conn) {
			conn.close()
		}
	}

	if (error) {
		throw error
	}

	return data
}

export default dispatch
