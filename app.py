import os

from flask_migrate import Migrate
from server import app, db


migrate = Migrate(app, db, render_as_batch=True)

if __name__ == "__main__":
    app.run(
        host=os.getenv("IP", "0.0.0.0"),
        port=int(os.getenv("PORT", 80)),
        debug=os.getenv("DEBUG", False),
    )
