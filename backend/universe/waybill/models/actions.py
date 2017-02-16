from datetime import datetime

from sqlalchemy import Column, Integer, Float, Date, ForeignKey

from . import database

from .active_directories import Waybill
from .directories import Car
from .dependencies import Individual

class ConsumptionFuel(database):
    id = Column(Integer, primary_key=True)
    origin = Column(Integer, ForeignKey('{}.{}'.format(Waybill.__tablename__, 'id')))
    driver = Column(Integer, ForeignKey('{}.{}'.format(Individual.__tablename__, 'id')))
    car = Column(Integer, ForeignKey('{}.{}'.format(Car.__tablename__, 'id')))
    consumtion_fact = Column(Float)
    consumtion_norm = Column(Float)
