import Vue from "vue";

function decode(value) {
	if (typeof value === "undefined") return;
	return value.replace(/\\u(....)/gi, function(m, v) {
		return String.fromCharCode(parseInt(v, 16));
	});
}

const eventBus = new Vue();

const logFromPython = ({ type, message, replace }) => {
	eventBus.$emit("logFromPython", { type, message: decode(message), replace });
};

const annotationFromPython = ({ type, message }) => {
	eventBus.$emit("annotations", message);
};

export { logFromPython, annotationFromPython };

export default eventBus;
