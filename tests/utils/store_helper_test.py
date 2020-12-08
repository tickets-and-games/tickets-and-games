import json
import os
import sys

sys.path.append(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))

from server import db
from server.models import Store
from server.utils.database_test import DatabaseTest
from server.utils.store_helper import populate_store

class GetColorNameTest(DatabaseTest):
    def setUp(self):
        super().setUp()
        self.result = 5
    
    def test_store_helper_test(self):
        with self.app.app_context():
            populate_store()
            self.assertEqual(len(db.session.query(Store).all()),self.result)
