const pool = require('../config/database');

class Product {

//     Get product by id [DONE]
  static async findById(id) {
    const result = await pool.query(
      'SELECT * FROM products WHERE id = $1',
      [id]
    );
    return result.rows[0];
  }

//   Get all products[DONE]
  static async findAll() {
    const result = await pool.query('SELECT * FROM products ORDER BY id');
    return result.rows;
  }

//   Add products [DONE]
  static async create(productData) {
    const { name, price, available_qty, image_url,category } = productData;
    const result = await pool.query(
      `INSERT INTO products (name, price, available_qty, image_url,category)
       VALUES ($1, $2, $3, $4, $5) RETURNING *`,
      [name, price, available_qty, image_url, category]
    );
    return result.rows[0];
  }

//   Update products
  static async update(id, productData) {
    const { name, price, available_qty, image_url,category } = productData;
    const result = await pool.query(
      `UPDATE products
       SET name = $1, price = $2, available_qty = $3, image_url = $4,category = $5,  updated_at = CURRENT_TIMESTAMP
       WHERE id = $6 RETURNING *`,
      [name, price, available_qty, image_url, category, id]
    );
    return result.rows[0];
  }

//   DELETE PRODUCTS
  static async delete(id) {
    const result = await pool.query(
      'DELETE FROM products WHERE id = $1 RETURNING *',
      [id]
    );
    return result.rows[0];
  }

//   Update Quantity
  static async updateQuantity(id, newQuantity) {
    const result = await pool.query(
      'UPDATE products SET available_qty = $1, updated_at = CURRENT_TIMESTAMP WHERE id = $2 RETURNING *',
      [newQuantity, id]
    );
    return result.rows[0];
  }

//   Reserve Quantity [DONE]
  static async reserveQuantity(id, quantity) {
    const client = await pool.connect();

    try {
      await client.query('BEGIN');

      // Check current quantity
      const checkResult = await client.query(
        'SELECT available_qty FROM products WHERE id = $1 FOR UPDATE',
        [id]
      );

      if (checkResult.rows.length === 0) {
        throw new Error('Product not found');
      }

      const currentQty = checkResult.rows[0].available_qty;

      if (currentQty < quantity) {
        throw new Error('Insufficient quantity');
      }

      // Reserve the quantity
      const updateResult = await client.query(
        'UPDATE products SET available_qty = available_qty - $1, updated_at = CURRENT_TIMESTAMP WHERE id = $2 RETURNING *',
        [quantity, id]
      );

      await client.query('COMMIT');
      return updateResult.rows[0];
    } catch (error) {
      await client.query('ROLLBACK');
      throw error;
    } finally {
      client.release();
    }
  }
}

module.exports = Product;
