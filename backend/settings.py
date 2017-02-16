'''
Settings of the project.
'''
from os.path import dirname, abspath

from utils.settings import get_database

PROJECT_PATH = dirname(abspath(__file__))

DATABASES = {
    'main': get_database(
        provider='sqlite',
        address='accounting.db'
    )
}

HOST = {
    'address': '127.0.0.1',
    'port': 8000
}
