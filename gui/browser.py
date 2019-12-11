from cefpython3 import cefpython as cef
import socket

host = 'localhost'
__conn = socket.socket()
__conn.bind((host, 0))
port = __conn.getsockname()[1]
__conn.close()

class LoadHandler(object):
    def OnLoadEnd(self, browser, **_):
        pass

def prepare_browser(handler):
    cef.Initialize()
    browser = cef.CreateBrowserSync(url='http://' + host + ':' + str(port), window_title="NeuroNet")
    browser.SetClientHandler(LoadHandler())
    bindings = cef.JavascriptBindings()
    bindings.SetFunction("py_function", handler)
    browser.SetJavascriptBindings(bindings)
    return browser
