"""Relationship to CarType

Revision ID: 8cbc20b2d8cf
Revises: 31e5199abae7
Create Date: 2017-02-15 16:06:21.538863

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = '8cbc20b2d8cf'
down_revision = '31e5199abae7'
branch_labels = None
depends_on = None


def upgrade():
    with op.batch_alter_table('cars', schema=None) as batch_op:
        batch_op.alter_column('car_type', new_column_name='car_type_id')

def downgrade():
    with op.batch_alter_table('cars', schema=None) as batch_op:
        batch_op.alter_column('car_type_id', new_column_name='car_type')
