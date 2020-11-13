# pylint: disable=ungrouped-imports
# pylint: disable=unused-import
# pylint: disable=invalid-name
# pylint: disable=unused-argument
import unittest
import os
import sys
import unittest.mock as mock
from alchemy_mock.mocking import UnifiedAlchemyMagicMock

sys.path.append(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))

from server.routes.leaderboard import get_leader_board

db_session = UnifiedAlchemyMagicMock()


def returnMockData(*args, **kwargs):
    mocked_query_user = mock.Mock()
    mocked_query_user.outerjoin().group_by().order_by().all.return_value = [
        ("Jack", 180),
        ("James", 80),
        ("Sally", 50),
    ]
    return mocked_query_user


class LeaderboardTest(unittest.TestCase):
    def test_success_leaderboard(self):
        with mock.patch("server.db.session.query", returnMockData):
            response = get_leader_board()
            self.assertIs(type(response), dict)


if __name__ == "__main__":
    unittest.main()
