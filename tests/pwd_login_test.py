import json
import unittest
import unittest.mock as mock
import os
import sys

sys.path.append(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))

import server

KEY_INPUT = "input"
KEY_EXPECTED = "expected"

class PwdLoginTest(unittest.TestCase):
    def setUp(self):
        server.app.config["SECRET_KEY"] = os.getenv("SECRET_KEY", "DEFAULT_KEY")
        self.app = server.app.test_client()

if __name__ == "__main__":
    unittest.main()