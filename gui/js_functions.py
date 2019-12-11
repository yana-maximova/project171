from json import dumps
from pubsub import pub

class _JsFunctions:
    def __init__(self):
        pass

    def _js_log(self, data):
         pub.sendMessage('logger', message=data)

    def error(self, error, replace=False):
        self._js_log({'type': 'error', 'message': error, 'replace': replace})

    def message(self, message, replace=False):
        self._js_log({'type': 'message', 'message': message, 'replace': replace})

    def warning(self, warning, replace=False):
        self._js_log({'type': 'warning', 'message': warning, 'replace': replace})

    def annotations(self, data):
        pub.sendMessage('annotations', message={'type': 'annotations', 'message': data})
		
js = _JsFunctions()
