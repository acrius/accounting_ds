from universe.main.models.directories import Individual
from universe.waybill.models.directories import Car, CarType
from universe.waybill.models.active_directories import Waybill

directories = {
    'Individual': Individual,
    'Car': Car,
    'CarType': CarType,
}

active_directories = {
    'Waybill': Waybill
}

model_types = {
    'directories': directories,
    'active_directories': active_directories
}
