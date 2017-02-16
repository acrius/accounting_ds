from datetime import datetime

from sqlalchemy import Column, String, Integer, Float, DateTime, Boolean, ForeignKey
from sqlalchemy.orm import relationship

from . import database
from .directories import Car

from .dependencies import Individual

class Waybill(database):
    __tablename__ = 'waybills'

    id = Column(Integer, primary_key=True)
    date = Column(DateTime, default=datetime.utcnow)
    driver_id = Column(Integer, ForeignKey('{}.{}'.format(Individual.__tablename__, 'id')))
    driver = relationship('Individual')
    car_id = Column(Integer, ForeignKey('{}.{}'.format(Car.__tablename__, 'id')))
    car = relationship('Car')
    consumption_fact = Column(Float)
    consumption_norm = Column(Float)
    mileage_begin = Column(Float)
    mileage_end = Column(Float)
    mileage = Column(Float)
    departure_time = Column(DateTime)
    return_time = Column(DateTime)
    run_time = Column(Integer)

    _activate = Column(Boolean, default=False)

    def activate(self):
        self._activate = True

    def deactivate(self):
        self._activate = False
