"""
`appengine_config.py` is automatically loaded when Google App Engine
starts a new instance of your application. This runs before any
WSGI applications specified in app.yaml are loaded.
"""

import os
import sys

from google.appengine.ext import vendor

# Workaround to avoid loading msvcrt on local deployment server
# This will probably be fixed eventually in click
# https://github.com/gae-init/gae-init/pull/527
# https://github.com/pallets/click/issues/594
on_appengine = os.environ.get('SERVER_SOFTWARE','').startswith('Development')
if on_appengine and os.name == 'nt':
    os.name = None
    sys.platform = ''

# Third-party libraries are stored in "lib", vendoring will make
# sure that they are importable by the application.
vendor.add('lib')
