# pylint: disable=ungrouped-imports
# pylint: disable=unused-import
# pylint: disable=invalid-name

import unittest
import os
import sys
import unittest.mock as mock
from alchemy_mock.mocking import AlchemyMagicMock
from server import create_app, db

from config import Config

sys.path.append(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))

from server.routes.coinflip import coinflip


class CoinflipTest(unittest.TestCase):
    def setUp(self):
        config = Config()
        config.SQLALCHEMY_DATABASE_URI = "sqlite:///:memory:"
        self.app = create_app(config)
        with self.app.app_context():
            db.drop_all()
            db.create_all()
            db.session.commit()

    def test_success_coinflip(self):
        with self.app.test_request_context():
            with mock.patch("flask.request", data={"bet": 50, "side": "Heads"}):
                with mock.patch("server.db.session.add", AlchemyMagicMock()):
                    response = coinflip()
                    self.assertIs(type(response), tuple)


if __name__ == "__main__":
    unittest.main()
