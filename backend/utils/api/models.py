from collections import Iterable
from datetime import datetime

from sqlalchemy import or_
from sqlalchemy.orm import sessionmaker
from sqlalchemy.inspection import inspect
from universe import models

def serialize_model_to_dict(model):
    return {key: value for key, value in model.__dict__.items() if not key.startswith('_')}

def serialize_to_dict(action):
    def wrapper(*args):
        results = action(*args)
        if isinstance(results, Iterable):
            return [serialize_model_to_dict(result) for result in results]
        else:
            return serialize_model_to_dict(results)
    return wrapper

def get_session_for_model(model):
    Session = sessionmaker(bind=model.metadata.bind)
    return Session()

@serialize_to_dict
def get_model_data(model_type, model_name, args=None):
    model = models.model_types[model_type][model_name]
    session = get_session_for_model(model)
    if args:
        and_filter = []
        for key, values in args.items():
            and_filter.append(model.__dict__[key].in_(values))
        print(and_filter)
        query = session.query(model).filter(*and_filter)
    else:
        query = session.query(model)
    return query

def get_value_for_field(field, value):
    result_value = None
    if field.type.python_type == str:
        result_value = str(value)
    elif field.type.python_type == int:
        result_value = int(value)
    elif field.type.python_type == float:
        result_value = float(value)
    elif field.type.python_type == datetime:
        result_value = datetime(value).isoformat()

    return result_value

def deserialize_data(model, data):
    return {key: get_value_for_field(model.__dict__[key], value) for key, value in data.items()}

def get_object_of_model(session, model, data):
    primary_key = inspect(model).primary_key[0].name
    return session.query(model).filter(model.__dict__[primary_key] == data[primary_key]).first() if data.get(primary_key) else None

def update_model_data(model_type, model_name, data):
    model = models.model_types[model_type][model_name]
    session = get_session_for_model(model)
    model_object = get_object_of_model(session,  model, data)
    if model_object:
        for key, value in data.items():
            print('After {}: {}'.format(key, model_object.__dict__[key]))
            setattr(model_object, key, get_value_for_field(model.__dict__[key], data[key]))
            print('Before {}: {}'.format(key, model_object.__dict__[key]))
    else:
        session.add(model(**deserialize_data(model, data)))
    session.commit()
