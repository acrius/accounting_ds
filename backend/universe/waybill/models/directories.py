from sqlalchemy import Column, Integer, String, ForeignKey
from sqlalchemy.orm import relationship

from . import database


class CarType(database):
    __tablename__ = 'cartypes'

    id = Column(Integer, primary_key=True)
    name = Column(String)


class Car(database):
    __tablename__ = 'cars'

    id = Column(Integer, primary_key=True)
    name = Column(String(200))
    car_type_id = Column(ForeignKey('{}.{}'.format(CarType.__tablename__, 'id')))
    car_type = relationship('CarType')
    registration_number = Column(String(40))
    consumption_norm_distance = Column(Integer)
    consumption_norm_hours = Column(Integer)
