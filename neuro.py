import sys
import socket
from optparse import OptionParser
from gui.browser import prepare_browser, host, port, cef
from gui.server import prepare_server
import net.annotations as annotations
from net.net import trainingNet

handlers = {
    "getBlocks": annotations.getBlocks,
    "saveBlocks": annotations.saveBlocks,
    "trainingNet": trainingNet,
    "createLettersFromBlocks": annotations.createLettersFromBlocks
}

def handler(fn, data):
    answer = {}
    try:
        answer = handlers[fn](data)
    except KeyError:
        answer = {"type": "error", "data": "Функция не найдена"}
    return answer

if __name__ == '__main__':
    parser = OptionParser()
    parser.add_option("-s", "--server", dest="isServer", action="store_true", help="Start programm in server mode.", default=False)
    (options, args) = parser.parse_args()
    isServer = options.isServer
    if isServer:
        port = "80"

    def pyHandler():
        pass

    server = prepare_server(host, port, handler)
    server.start()

    if not isServer:
        browser = prepare_browser(pyHandler)
    #if not isServer:
        cef.MessageLoop()
        server.terminate()
        server.join()
        del browser
        cef.Shutdown()

