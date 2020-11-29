import os
import json
import stripe
from flask import Blueprint, request

from server import db
from server.models import Transaction, User
from server.utils import get_current_user

from server.routes.decorators import login_required, stripe_required

purchase_bp = Blueprint("purchase_bp", __name__, url_prefix="/api/purchase")

stripe.api_key = os.getenv("STRIPE_SECRET_KEY", "DEFAULT_KEY")


@purchase_bp.route("/payment-intent")
@login_required
@stripe_required
def create_payment_intent():
    user = get_current_user()

    payment_intent = stripe.PaymentIntent.create(
        amount=1000,
        currency="usd",
        payment_method_types=["card"],
        receipt_email=user.email,
    )

    return payment_intent


@purchase_bp.route("/complete")
@stripe_required
def payment_complete():
    event_data = json.loads(request.data)

    event_object = event_data["object"]
    status = event_object["status"]
    client_secret = event_object["client_secret"]
    amount = event_object["amount"]
    email = event_object["receipt_email"]

    if status != "succeeded":
        return {"error": "Payment not successful"}, 402

    if client_secret != stripe.api_key:
        return {"error": "Wrong client secret"}, 400

    user = User.query.filter_by(email=email)
    transaction = Transaction(
        uesr_id=user.id, ticket_amount=amount * 100, activity="Ticket purchase"
    )
    db.session.add(transaction)
    db.session.commit(transaction)

    return {"success": True}
