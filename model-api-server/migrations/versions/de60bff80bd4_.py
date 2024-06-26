"""empty message

Revision ID: de60bff80bd4
Revises: 4a039cd61215
Create Date: 2024-03-17 18:01:42.510347

"""
from typing import Sequence, Union

from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision: str = 'de60bff80bd4'
down_revision: Union[str, None] = '4a039cd61215'
branch_labels: Union[str, Sequence[str], None] = None
depends_on: Union[str, Sequence[str], None] = None


def upgrade() -> None:
    # ### commands auto generated by Alembic - please adjust! ###
    op.create_unique_constraint(None, 'api_key', ['name'])
    # ### end Alembic commands ###


def downgrade() -> None:
    # ### commands auto generated by Alembic - please adjust! ###
    op.drop_constraint(None, 'api_key', type_='unique')
    # ### end Alembic commands ###
