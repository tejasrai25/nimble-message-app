from peewee import *
import os
from datetime import datetime

POSTGRES_DB = os.getenv('POSTGRES_DBNAME', 'postgres')
POSTGRES_USER = os.getenv('POSTGRES_USER', 'postgres')
POSTGRES_PASSWORD = os.getenv('POSTGRES_PASSWORD', 'postgres')
POSTGRES_PORT = os.getenv('POSTGRES_PORT', '5432')


db = PostgresqlDatabase(
    POSTGRES_DB,
    user=POSTGRES_USER,
    password=POSTGRES_PASSWORD,
    host='localhost',
    port=int(POSTGRES_PORT)
)


class BaseModel(Model):
    class Meta:
        database = db


class User(BaseModel):
    username = CharField(unique=True)
    name = CharField()


class Message(BaseModel):
    sender = ForeignKeyField(User, backref='tweets')
    receiver = ForeignKeyField(User, backref='tweets')
    message = TextField()
    sent_time = DateTimeField(default=datetime.now)


if __name__ == '__main__':
    db.connect()
    db.create_tables([User, Message])
