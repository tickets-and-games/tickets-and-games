# pylint: disable=ungrouped-imports
# pylint: disable=unused-import
# pylint: disable=invalid-name
# pylint: disable=unused-argument
import json
import os
import sys

sys.path.append(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))

from server.routes.leaderboard import get_leader_board
from server import db
from server.utils.database_test import DatabaseTest
from server.models import User, Transaction, Item, Store

KEY_BLUE = "blue"
KEY_USER2 = "User2"
KEY_TRANSACTIONS = "transactions"
KEY_COLOR = "color"
KEY_NAME = "name"

class LeaderboardTest(DatabaseTest):
    def setUp(self):
        super().setUp()
        user1 = User (
            id = 1,
            oauth_id = "Unit test",
            name = "User1",
            username = "User1",
            email = "user1@gmail.com",
            is_public = True,
            image_url = "user1_url"
        )
        user2 = User (
            id = 2,
            oauth_id = "Unit test",
            name = "User2",
            username = "User2",
            email = "user2@gmail.com",
            is_public = True,
            image_url = "user2_url"
        )
        trans1 = Transaction (
            user_id=1,
            ticket_amount=500,
            activity="Transaction Test",
        )
        trans2 = Transaction (
            user_id=2,
            ticket_amount=1000,
            activity="Transaction Test",
        )
        item1 = Item (
            item_type = 2,
            item_group = 101,
            user_id = 1,
            count = 1,
            active = True
        )
        store1 = Store (
            id = 2,
            name = "blue text",
            item_group = 101,
            price = 500,
            limit = 1
        )
        with self.app.app_context():
            db.session.add(user1)
            db.session.add(user2)
            db.session.add(trans1)
            db.session.add(trans2)
            db.session.add(item1)
            db.session.add(store1)
            db.session.commit()
    def test_success_leaderboard(self):
        with self.app.app_context():
            res = self.client.get('/api/leaderboard')
            result = json.loads(res.data.decode("utf-8"))
            self.assertEqual(KEY_BLUE, result[KEY_TRANSACTIONS][1][KEY_COLOR])
            self.assertEqual(KEY_USER2, result[KEY_TRANSACTIONS][0][KEY_NAME])
