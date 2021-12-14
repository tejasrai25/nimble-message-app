from flask import Flask, request
import flask_praetorian
from peewee import IntegrityError
from schema import db, User

app = Flask(__name__)

# Add JWT Token plugin
guard = flask_praetorian.Praetorian()

app.config['SECRET_KEY'] = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9'
app.config['JWT_ACCESS_LIFESPAN'] = {'hours': 24}
app.config['JWT_REFRESH_LIFESPAN'] = {'days': 30}

guard.init_app(app, User)


@app.before_request
def before_request():
    db.connect()


@app.after_request
def after_request(response):
    db.close()
    return response


@app.route("/login", methods=["POST"])
def login():
    """
    Logs a user in by parsing a POST request containing user credentials and
    issuing a JWT token.
    """
    req = request.get_json(force=True)
    username = req.get("username", None)
    password = req.get("password", None)
    user = guard.authenticate(username, password)
    ret = {"access_token": guard.encode_jwt_token(user)}
    return ret, 200


@app.route("/api/users", methods=["POST"])
def register():
    req = request.get_json(force=True)
    username = req.get("username")
    password = req.get("password")
    name = req.get("name")
    try:
        user = User.create(username=username,
                           password=guard.hash_password(password),
                           name=name)
        return {'username': user.username, 'name': user.name}, 201
    except IntegrityError:
        return {'error': 'IntegrityError', 'message': 'The username is already in use'}, 400


@app.route('/')
def hello_world():
    return 'Hello, Docker!'
