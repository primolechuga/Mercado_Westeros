import asyncpg
from asyncpg.pool import Pool

class Database:
    def __init__(self):
        self.pool: Pool = None

    async def connect(self):
        self.pool = await asyncpg.create_pool(
            dsn="postgresql://user:password@db:5432/productos_db",
            min_size=5,
            max_size=20
        )

    async def fetch_product(self, product_id: str):
        async with self.pool.acquire() as connection:
            return await connection.fetchrow(
                "SELECT * FROM productos WHERE id = $1", 
                product_id
            )

database = Database()