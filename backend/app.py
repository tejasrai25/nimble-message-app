from flask import Flask, request, jsonify
import flask_praetorian
from peewee import IntegrityError
from schema import db, User, Message

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


@app.route('/login', methods=['POST'])
def login():
    '''
    Logs a user in by parsing a POST request containing user credentials and
    issuing a JWT token.
    '''
    req = request.get_json(force=True)
    username = req.get('username', None)
    password = req.get('password', None)
    user = guard.authenticate(username, password)
    ret = {'access_token': guard.encode_jwt_token(user)}
    return ret, 200


@app.route('/api/users', methods=['POST'])
def register():
    '''
    Create a new user
    '''
    req = request.get_json(force=True)
    username = req.get('username')
    password = req.get('password')
    name = req.get('name')
    try:
        user = User.create(username=username,
                           password=guard.hash_password(password),
                           name=name)
        return {'id': user.id, 'username': user.username, 'name': user.name}, 201
    except IntegrityError:
        return {'error': 'IntegrityError', 'message': 'The username is already in use'}, 400


@app.route('/api/users', methods=['GET'])
@flask_praetorian.auth_required
def fetch_users():
    '''
    Fetch all users except the current user
    '''
    current_user = flask_praetorian.current_user().username
    users = [{'id': user.id, 'username': user.username, 'name': user.name}
             for user in User.select() if user.username != current_user]
    return jsonify(users), 200


@app.route('/api/messages', methods=['POST'])
@flask_praetorian.auth_required
def store_message():
    '''
    Store message between current user and receiver
    '''
    req = request.get_json(force=True)
    message = req.get('message')
    receiver = User.lookup(req.get('receiver'))
    current_user = flask_praetorian.current_user()
    if not message or not receiver:
        return {'error': 'ValueError', 'message': 'body must contain message and a valid username as receiver'}, 400
    if receiver.username == current_user.username:
        return {'error': 'ValueError', 'message': 'user cannot send message to themselves'}, 400

    message = Message.create(
        message=message,
        sender=current_user,
        receiver=receiver,
    )

    return {
        'id': message.id,
        'message': message.message,
        'sender': message.sender.username,
        'receiver': message.receiver.username,
        'sentTime': message.sent_time.isoformat()
    }, 201


@app.route('/api/messages', methods=['GET'])
@flask_praetorian.auth_required
def fetch_messages():
    '''
    Fetch all messages between current user and another specified user
    '''
    current_user = flask_praetorian.current_user()
    other_user = User.lookup(request.args.get('user'))

    if not other_user:
        return {'error': 'ValueError', 'message': 'user parameter is required and must be a valid username'}, 400
    Sender = User.alias()
    Receiver = User.alias()
    messages = [
        {
            'id': message.id,
            'message': message.message,
            'sender': message.sender.username,
            'receiver': message.receiver.username,
            'sentTime': message.sent_time.isoformat()
        } for message in Message.select()
        .join(Sender, on=Message.sender)
        .where(Sender.username.in_([current_user.username, other_user.username]))
        .switch(Message)
        .join(Receiver, on=Message.receiver)
        .where(Receiver.username.in_([current_user.username, other_user.username]))
        .order_by(Message.sent_time.asc())
    ]
    return jsonify(messages), 200
