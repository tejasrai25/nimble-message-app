from peewee import *
import os
from datetime import datetime

POSTGRES_DB = os.getenv('POSTGRES_DBNAME', 'postgres')
POSTGRES_USER = os.getenv('POSTGRES_USER', 'postgres')
POSTGRES_PASSWORD = os.getenv('POSTGRES_PASSWORD', 'postgres')
POSTGRES_HOST = os.getenv('POSTGRES_HOST', 'localhost')
POSTGRES_PORT = os.getenv('POSTGRES_PORT', '5432')


db = PostgresqlDatabase(
    POSTGRES_DB,
    user=POSTGRES_USER,
    password=POSTGRES_PASSWORD,
    host=POSTGRES_HOST,
    port=int(POSTGRES_PORT)
)


class BaseModel(Model):
    class Meta:
        database = db


class User(BaseModel):
    username = CharField(unique=True)
    name = CharField()
    password = CharField()

    @property
    def identity(self):
        """
        *Required Attribute or Property*

        flask-praetorian requires that the user class has an ``identity`` instance
        attribute or property that provides the unique id of the user instance
        """
        return self.id

    @property
    def rolenames(self):
        """
        *Required Attribute or Property*

        flask-praetorian requires that the user class has a ``rolenames`` instance
        attribute or property that provides a list of strings that describe the roles
        attached to the user instance
        """
        return []

    @staticmethod
    def lookup(username):
        """
        *Required Method*

        flask-praetorian requires that the user class implements a ``lookup()``
        class method that takes a single ``username`` argument and returns a user
        instance if there is one that matches or ``None`` if there is not.
        """
        return User.get_or_none(User.username == username)

    @classmethod
    def identify(cls, id):
        """
        *Required Method*

        flask-praetorian requires that the user class implements an ``identify()``
        class method that takes a single ``id`` argument and returns user instance if
        there is one that matches or ``None`` if there is not.
        """
        try:
            return User.get_by_id(id)
        except DoesNotExist:
            return None

    def is_valid(self):
        return True


class Message(BaseModel):
    sender = ForeignKeyField(User, backref='tweets')
    receiver = ForeignKeyField(User, backref='tweets')
    message = TextField()
    sent_time = DateTimeField(default=datetime.now)


if __name__ == '__main__':
    db.connect()
    db.drop_tables([User, Message])
    db.create_tables([User, Message])
