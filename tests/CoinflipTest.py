import unittest
import os
import sys
import unittest.mock as mock
from alchemy_mock.mocking import AlchemyMagicMock
sys.path.append(os.path.abspath(os.path.join("./server/routes/")))
import coinflip

class CoinflipTest(unittest.TestCase):
    def test_success_coinflip(self):
        with mock.patch("db", AlchemyMagicMock()):
            response = coinflip.coinflip()
            self.assertIs(type(response), dict)

if __name__ == "__main__":
    unittest.main()
