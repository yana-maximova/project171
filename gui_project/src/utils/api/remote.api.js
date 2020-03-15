import eventBus, {
	logFromPython,
	annotationFromPython
} from "@/utils/EventBus";

class Api {
	constructor() {
		this.host = window.py_function ? location.host : location.hostname;
		this.ws = new WebSocket(`ws://${this.host}/ws`);

		this.ws.onopen = function(event) {
			console.log("[open] Соединение установлено");
		};

		this.ws.onmessage = function(event) {
			const data = JSON.parse(event.data);
			if (data.type === "annotations") {
				annotationFromPython(data);
			} else {
				logFromPython(data);
			}
		};

		this.ws.onclose = function(event) {
			if (event.wasClean) {
				console.log(
					`[close] Соединение закрыто чисто, код=${event.code} причина=${event.reason}`
				);
			} else {
				console.log("[close] Соединение прервано");
			}
		};

		this.ws.onerror = function(error) {
			console.log("[error] Ошибка сокета", error);
		};
	}

	apiFunction(functionName, args = {}) {
		const isOpened = this.ws.readyState === 1;
		if (isOpened) {
			this.ws.send(JSON.stringify({ functionName, args }));
		} else {
			eventBus.$emit("loaded");
		}
	}

	httpFunction(functionName, args = {}) {
		let result = null;
		fetch(`${this.host}/func`, {
			method: "POST",
			body: JSON.stringify({ functionName, args }),
			cache: "no-cache"
		})
			.then(response => response.json())
			.then(answer => {
				result = answer;
			});
		return result;
	}
}

export const getApi = () => {
	const api = new Api();
	return api;
};
