import os
from multiprocessing import Process
from typing import List
import signal
import zmq
import sys

from schema import User


def process_request(request):
    options = {
        'login_user': login_user,
        'register_user': register_user,
        'get_contacts': get_contacts,
        'get_chat_history': get_chat_history,
    }
    return options[request['type']](**request['params'])


def login_user(username, password):
    print(f'login: {username} {password}')


def register_user():
    pass


def get_contacts():
    pass


def get_chat_history():
    pass


def server(port):
    try:
        context = zmq.Context()
        socket = context.socket(zmq.REP)
        socket.bind(f'tcp://*:{port}')
        print(f'Starting Server at [{port}]')
        while True:
            #  Wait for next request from client
            request = socket.recv_json()
            print(f'[{port}] Received reqest: {request}')

            # process request and create response
            response = process_request(request)
            #  Send reply back to client
            socket.send_json(response)
            print(f'[{port}] Sent response: {response}')
    finally:
        context.destroy(0)


if __name__ == '__main__':
    server_ports = os.getenv('SERVER_PORTS', '5555').split(',')
    processes: List[Process] = []
    try:
        # start server process for each port
        for port in server_ports:
            process = Process(target=server, args=(port,))
            process.start()
            processes.append(process)
        while True:
            pass
    except KeyboardInterrupt:
        print('Shutting down Servers')
        # close all processes to shutdown
        for process in processes:
            process.terminate()
