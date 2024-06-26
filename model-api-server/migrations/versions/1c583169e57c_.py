"""empty message

Revision ID: 1c583169e57c
Revises: de60bff80bd4
Create Date: 2024-03-24 13:04:21.565259

"""
from typing import Sequence, Union

from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision: str = '1c583169e57c'
down_revision: Union[str, None] = 'de60bff80bd4'
branch_labels: Union[str, Sequence[str], None] = None
depends_on: Union[str, Sequence[str], None] = None


def upgrade() -> None:
    # ### commands auto generated by Alembic - please adjust! ###
    op.create_table('history',
    sa.Column('id', sa.Integer(), autoincrement=True, nullable=False),
    sa.Column('model', sa.String(length=100), nullable=False),
    sa.Column('user_message', sa.Text(), nullable=False),
    sa.Column('system_message', sa.Text(), nullable=True),
    sa.Column('max_tokens', sa.Integer(), nullable=True),
    sa.Column('top_p', sa.Float(), nullable=True),
    sa.Column('frequency_penalty', sa.Float(), nullable=True),
    sa.Column('presence_penalty', sa.Float(), nullable=True),
    sa.Column('temperature', sa.Float(), nullable=True),
    sa.Column('create_date', sa.DateTime(), nullable=False),
    sa.Column('response_model', sa.Text(), nullable=True),
    sa.Column('completion_tokens', sa.Integer(), nullable=True),
    sa.Column('prompt_tokens', sa.Integer(), nullable=True),
    sa.Column('total_tokens', sa.Integer(), nullable=True),
    sa.Column('input_tokens', sa.Integer(), nullable=True),
    sa.Column('output_tokens', sa.Integer(), nullable=True),
    sa.PrimaryKeyConstraint('id')
    )
    # ### end Alembic commands ###


def downgrade() -> None:
    # ### commands auto generated by Alembic - please adjust! ###
    op.drop_table('history')
    # ### end Alembic commands ###
