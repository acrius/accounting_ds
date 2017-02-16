from sqlalchemy import create_engine
from sqlalchemy.ext.declarative import declarative_base


def make_engine(attributes):
    if attributes['provider'] == 'sqlite':
        engine = create_engine('{provider}:///{address}'.format(**attributes))
    return engine

def get_database(**attributes):
    engine = make_engine(attributes)
    Base = declarative_base(bind=engine)
    return Base
