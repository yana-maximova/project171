import sys
import socket
from gui.browser import prepare_browser, host, port, cef
from gui.server import prepare_server
import net.annotations as annotations
from net.net import trainingNet

handlers = {
    "getAnnotationsBlock": annotations.getAnnotationsBlock,
    "saveAnnotationsBlock": annotations.saveAnnotationsBlock,
    "trainingNet": trainingNet,
}

def handler(fn, data):
    answer = {}
    try:
        answer = handlers[fn](data)
    except KeyError:
        answer = {"type": "error", "data": "Функция не найдена"}
    return answer

if __name__ == '__main__':
    noArgs = True
    if len(sys.argv) > 1:
        noArgs = False

    def pyHandler():
        pass

    server = prepare_server(host, port, handler)
    server.start()

    if noArgs:
        browser = prepare_browser(pyHandler)

 #  wsServer = prepareWsServer(wsPort, wsHost)
   # wsServer.start()
	
    if noArgs:
        cef.MessageLoop()
        server.terminate()
#        wsServer.terminate()
        server.join()
 #       wsServer.join()
        del browser
        cef.Shutdown()

