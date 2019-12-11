import Vue from 'vue'
import { logFromPython, annotationFromPython } from '@/utils/EventBus'

class Api extends WebSocket {
	functionNames = {
		TEST: 'test',
		GET_ANNOTATIONS_BLOCK: 'getAnnotationsBlock',
		SAVE_ANNOTATIONS_BLOCK: 'saveAnnotationsBlock',
		TRAINING: 'trainingNet',
		GET_WEB_SOCKET_PORT: 'getWebSocketPort'
	}

	constructor (host = `ws://${location.host}`) {
		super(`${host}/ws`)

		this.onopen = function (event) {
			console.log('[open] Соединение установлено')
		}

		this.onmessage = function (event) {
			const data = JSON.parse(event.data)
			if (data.type === 'annotations') {
				annotationFromPython(data)
			} else {
				logFromPython(data)
			}
		}

		this.onclose = function (event) {
			if (event.wasClean) {
				console.log(`[close] Соединение закрыто чисто, код=${event.code} причина=${event.reason}`)
			} else {
				console.log('[close] Соединение прервано')
			}
		}

		this.onerror = function (error) {
			console.log('[error] Ошибка сокета', error)
		}
	}

	install (Vue, options) {
		Vue.mixin({
			created () {
				const options = this.$options
				if (typeof options.api !== 'undefined') {
					this.$api = options.api
				} else if (!this.$api && this.$parent.$api) {
					this.$api = this.$parent.$api
				}
			}
		})
	}

	apiFunction (functionName, args = {}) {
		this.send(JSON.stringify({ functionName, args }))
	}

	// async apiFunction (functionName, args = {}) {
	// 	const response = await fetch(`${this.host}/func`, {
	// 		method: 'POST',
	// 		body: JSON.stringify({ functionName, args }),
	// 		cache: 'no-cache'
	// 	})
	// 	const answer = await response.json()
	// 	return answer
	// }
}

export const getApi = (host) => {
	const api = new Api(host)
	Vue.use(api)
	return api
}
