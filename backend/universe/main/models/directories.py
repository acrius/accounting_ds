from sqlalchemy import Column, Integer, String

from . import database

class Individual(database):
    __tablename__ = 'individuals'

    id = Column(Integer, primary_key=True)
    name = Column(String(length=200))
    driver_license = Column(String(length=40))
