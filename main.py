# import httplib2
import logging

import flask
# from flask import request
# from google.appengine.api import urlfetch

# httplib2.Http(timeout=180000)
# urlfetch.set_default_fetch_deadline(120)

app = flask.Flask(__name__)


@app.route('/')
def main():
    return flask.render_template(
        'index.html'
    )


@app.errorhandler(404)
def page_not_found(e):
    """Return a custom 404 error."""
    logging.exception('A 404 error occurred during a request.')
    return 'Sorry, Nothing at this URL.', 404


@app.errorhandler(500)
def application_error(e):
    """Return a custom 500 error."""
    logging.exception('A 500 error occurred during a request.')
    return 'Sorry, unexpected error: {}'.format(e), 500


if __name__ == "__main__":
    app.run()
