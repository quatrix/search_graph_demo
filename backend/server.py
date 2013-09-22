import tornado.web
import tornado.auth
import tornado.gen
import json
import motor
import networkx as nx
import StringIO

class HisotryCollectorHandler(tornado.web.RequestHandler):
    @tornado.web.asynchronous
    @tornado.gen.coroutine
    def post(self):
        db = self.settings['db']
        data = json.loads(self.request.body)

        #print "*"*80
        #print json.dumps(data, indent=4)

        yield db.messages.insert(data)


class Visit(object):
    def __init__(self, visit_record):
        history_result= visit_record["history_result"]
        visit = visit_record["visit"]

        self.title = history_result["title"]
        self.id = visit["visitId"]
        self.ref = visit["referringVisitId"]

class HistoryViewHandler(tornado.web.RequestHandler):
    @tornado.web.asynchronous
    @tornado.gen.coroutine
    def get(self):
        G=nx.Graph()

        db = self.settings['db']
        cursor = db.messages.find().sort([('_id', -1)])
        while (yield cursor.fetch_next):
            visit = Visit(cursor.next_object())
            G.add_node(visit.id, label=visit.title)
            G.add_edge(visit.id, visit.ref)

        output = StringIO.StringIO()

        nx.write_gexf(G, output)
        self.write(output.getvalue())
        self.finish()

db = motor.MotorClient().open_sync().search_ext

application = tornado.web.Application(
    [
        (r"/static/(.*)", tornado.web.StaticFileHandler, { "path": "." }),
        (r"/data", HistoryViewHandler), 
        (r"/collector", HisotryCollectorHandler), 
    ], 
    db=db,
    debug=True,
)

if __name__ == "__main__":
    application.listen(80)
    tornado.ioloop.IOLoop.instance().start()
