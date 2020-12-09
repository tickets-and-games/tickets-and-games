import stripe

import unittest.mock as mock

from server import db
from server.utils.database_test import DatabaseTest
from server.utils import get_user_balance, get_user_by_id, get_current_user
from server.models import User, Transaction


def create_payment_intent_mock(amount, currency, receipt_email, metadata):
    return {
        "amount": amount,
        "amount_capturable": 0,
        "amount_received": 0,
        "application": None,
        "application_fee_amount": None,
        "canceled_at": None,
        "cancellation_reason": None,
        "capture_method": "automatic",
        "charges": {},
        "client_secret": "pi_1HwHLQAEuYim4mUyH4PySGAO_secret_mL7cOL5rCOGMK8WweHpvn1Bhz",
        "confirmation_method": "automatic",
        "created": 1111111111,
        "currency": currency,
        "customer": None,
        "description": None,
        "id": "pi_1HwHLQAEuYim4mUyH4PySGAO",
        "invoice": None,
        "last_payment_error": None,
        "livemode": False,
        "metadata": metadata,
        "next_action": None,
        "object": "payment_intent",
        "on_behalf_of": None,
        "payment_method": None,
        "payment_method_options": {
            "card": {
                "installments": None,
                "network": None,
                "request_three_d_secure": "automatic",
            }
        },
        "payment_method_types": ["card"],
        "receipt_email": receipt_email,
        "review": None,
        "setup_future_usage": None,
        "shipping": None,
        "source": None,
        "statement_descriptor": None,
        "statement_descriptor_suffix": None,
        "status": "requires_payment_method",
        "transfer_data": None,
        "transfer_group": None,
    }


def webhook_data(amount, email):
    return {
        "data": {
            "object": {
                "amount": amount,
                "receipt_email": email,
            }
        }
    }


def raise_error(error):
    raise error


class TicketTransferTest(DatabaseTest):
    def setUp(self):
        super().setUp()
        self.user_id = 1
        user = User(id=self.user_id, name="User", email="user@example.com")

        with self.app.app_context():
            db.session.add(user)
            db.session.commit()

    def test_shop_list(self):
        with self.app.app_context():
            with self.client.session_transaction() as sess:
                sess["user_id"] = self.user_id

            shop_list = self.client.get("/api/purchase/list").json

            self.assertIn("items", shop_list)

    def test_payment_intent(self):
        with self.app.app_context():
            with self.client.session_transaction() as sess:
                sess["user_id"] = self.user_id

            user = get_user_by_id(self.user_id)
            with mock.patch("os.getenv", lambda x, _: "true"):
                with mock.patch(
                    "stripe.PaymentIntent.create", create_payment_intent_mock
                ):
                    payment_intent = self.client.post(
                        "/api/purchase/payment-intent",
                        headers={"STRIPE_SIGNATURE": ""},
                        json={"item_index": 0},
                    ).json

                    self.assertEqual(payment_intent["receipt_email"], user.email)

    def test_payment_webhook(self):
        with self.app.app_context():
            with self.client.session_transaction() as sess:
                sess["user_id"] = self.user_id

            user = get_user_by_id(self.user_id)
            with mock.patch("os.getenv", lambda x, _: "STRIPE_KEY"):
                with mock.patch(
                    "stripe.Webhook.construct_event", lambda _a, _b, _c: True
                ):
                    response = self.client.post(
                        "/api/purchase/complete", json=webhook_data(9999, user.email)
                    ).json

                    self.assertTrue(response["success"])

                    self.assertEqual(get_user_balance(user.id), 2_500_000)

    def test_payment_webhook_fail(self):
        with self.app.app_context():
            with self.client.session_transaction() as sess:
                sess["user_id"] = self.user_id

            user = get_user_by_id(self.user_id)

            with mock.patch("os.getenv", lambda x, _: "STRIPE_KEY"):
                with mock.patch(
                    "stripe.Webhook.construct_event",
                    lambda _a, _b, _c: raise_error(ValueError()),
                ):
                    response = self.client.post(
                        "/api/purchase/complete", json=webhook_data(9999, user.email)
                    )

                    self.assertEqual(response.status_code, 400)

                    self.assertEqual(get_user_balance(user.id), 0)

                with mock.patch(
                    "stripe.Webhook.construct_event",
                    lambda _a, _b, _c: raise_error(
                        stripe.error.SignatureVerificationError("", "")
                    ),
                ):
                    response = self.client.post(
                        "/api/purchase/complete", json=webhook_data(9999, user.email)
                    )

                    self.assertEqual(response.status_code, 400)

                    self.assertEqual(get_user_balance(user.id), 0)
