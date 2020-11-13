import flask
from server import app


@app.route("/", defaults={"filename": "index.html"})
@app.route("/<path:filename>")
def get_client(filename):
    return flask.send_from_directory(app.template_folder, filename)


@app.errorhandler(404)
def page_not_found(_e):
    return flask.send_from_directory(app.template_folder, "index.html")
