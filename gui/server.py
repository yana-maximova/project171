from multiprocessing import Process
import os
import tornado.ioloop
import tornado.web
import tornado.websocket
import json
from pubsub import pub

path = os.path.dirname(os.path.realpath(__file__))

class MainHandler(tornado.web.RequestHandler):
    def get(self):
        self.write("NeuroNet")

class FuncHandler(tornado.web.RequestHandler):
    handler = None

    def post(self):
        data = json.loads(self.request.body)
        answer = FuncHandler.handler(data['functionName'], data['args'])
        response = json.dumps(answer)
        self.set_header("Access-Control-Allow-Origin", "*")
        self.write(response)

		
class WSHandler(tornado.websocket.WebSocketHandler):
    connection = None
   
    def open(self):
        WSHandler.connection = self
      
    def on_message(self, message):
        data = json.loads(message)
        answer = FuncHandler.handler(data['functionName'], data['args'])
        self.write_message({'data': answer})
 
    def on_close(self):
        pass
		
    @staticmethod
    def sendLog(message):
        WSHandler.connection.write_message(message)
 
    @staticmethod
    def sendAnnotation(message):
        WSHandler.connection.write_message(message)

    def check_origin(self, origin):
        return True
		
pub.subscribe(WSHandler.sendLog, 'logger')
pub.subscribe(WSHandler.sendAnnotation, 'annotations')
	
		
def start_server(host, port, handler):
    print (f'Start server at {host}, {port}')
    FuncHandler.handler = handler
    app = tornado.web.Application([
        #(r"/", MainHandler),
		(r"/func", FuncHandler),
		(r'/ws', WSHandler),
        (r'/(.*)', tornado.web.StaticFileHandler, {'path':os.path.join(path, 'static'), 'default_filename': "index.html"}),
    ])
    http_server = tornado.httpserver.HTTPServer(app)
    http_server.listen(port, host)
    tornado.ioloop.IOLoop.current().start()

def prepare_server(host, port, handler):
    return Process(target=start_server, args=(host, port, handler))


