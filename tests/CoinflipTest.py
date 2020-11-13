# pylint: disable=ungrouped-imports
# pylint: disable=unused-import
# pylint: disable=invalid-name

import unittest
import os
import sys
import unittest.mock as mock
from alchemy_mock.mocking import AlchemyMagicMock
from server import app, db

sys.path.append(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))

from server.routes.coinflip import coinflip


class CoinflipTest(unittest.TestCase):
    def test_success_coinflip(self):
        with app.test_request_context():
            with mock.patch("flask.request", data={"bet": 50, "side": "Heads"}):
                with mock.patch("server.db.session.add", AlchemyMagicMock()):
                    response = coinflip()
                    self.assertIs(type(response), tuple)


if __name__ == "__main__":
    unittest.main()
