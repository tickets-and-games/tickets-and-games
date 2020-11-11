import unittest
import os
import sys
import unittest.mock as mock
from alchemy_mock.mocking import AlchemyMagicMock
sys.path.append(os.path.abspath(os.path.join("./server/routes/")))
import leaderboard

KEY_INPUT = "input"
KEY_EXPECTED = "expected"


class LeaderboardTest(unittest.TestCase):
    def test_success_leaderboard(self):
        with mock.patch("db", AlchemyMagicMock()):
            response = leaderboard.get_leader_board()
            self.assertIs(type(response), dict)

if __name__ == "__main__":
    unittest.main()
