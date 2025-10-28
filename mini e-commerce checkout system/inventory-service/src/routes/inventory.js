const express = require('express');
const router = express.Router();
const Product = require('../models/product');

/**
 * @swagger
 * components:
 *   schemas:
 *     Product:
 *       type: object
 *       required:
 *         - name
 *         - price
 *         - available_qty
 *         - category
 *       properties:
 *         id:
 *           type: integer
 *           description: Auto-generated ID
 *         name:
 *           type: string
 *           description: Product name
 *         price:
 *           type: number
 *           format: float
 *           description: Product price
 *         available_qty:
 *           type: integer
 *           description: Available quantity
 *         image_url:
 *           type: string
 *           description: Product image URL
 *         category:
 *           type: string
 *           description: Product category
 *         created_at:
 *           type: string
 *           format: date-time
 *         updated_at:
 *           type: string
 *           format: date-time
 *     ProductCreate:
 *       type: object
 *       required:
 *         - name
 *         - price
 *         - available_qty
 *         - category
 *       properties:
 *         name:
 *           type: string
 *         price:
 *           type: number
 *           format: float
 *         available_qty:
 *           type: integer
 *         image_url:
 *           type: string
 *         category:
 *           type: string
 *     ProductUpdate:
 *       type: object
 *       properties:
 *         name:
 *           type: string
 *         price:
 *           type: number
 *           format: float
 *         available_qty:
 *           type: integer
 *         image_url:
 *           type: string
 *         category:
 *           type: string
 *     ReserveRequest:
 *       type: object
 *       required:
 *         - product_id
 *         - quantity
 *       properties:
 *         product_id:
 *           type: integer
 *         quantity:
 *           type: integer
 *     ReserveResponse:
 *       type: object
 *       properties:
 *         ok:
 *           type: boolean
 */

// ... existing health and get endpoints ...

/**
 * @swagger
 * /health:
 *   get:
 *     summary: Health check endpoint
 *     tags: [Health]
 *     responses:
 *       200:
 *         description: Service is healthy
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                 timestamp:
 *                   type: string
 *                 service:
 *                   type: string
 */
router.get('/health', (req, res) => {
  res.json({
    status: 'OK',
    timestamp: new Date().toISOString(),
    service: 'inventory-service'
  });
});

/**
 * @swagger
 * /inventory:
 *   get:
 *     summary: Get all products
 *     tags: [Products]
 *     responses:
 *       200:
 *         description: List of all products
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Product'
 */
router.get('/inventory', async (req, res) => {
  try {
    const products = await Product.findAll();
    res.json(products);
  } catch (error) {
    console.error('Error fetching products:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

/**
 * @swagger
 * /inventory/{id}:
 *   get:
 *     summary: Get product details by ID
 *     tags: [Products]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: Product ID
 *     responses:
 *       200:
 *         description: Product details
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Product'
 *       404:
 *         description: Product not found
 */
router.get('/inventory/:id', async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);

    if (!product) {
      return res.status(404).json({ error: 'Product not found' });
    }

    res.json(product);
  } catch (error) {
    console.error('Error fetching product:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

/**
 * @swagger
 * /inventory:
 *   post:
 *     summary: Create a new product
 *     tags: [Products]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/ProductCreate'
 *     responses:
 *       201:
 *         description: Product created successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Product'
 *       400:
 *         description: Invalid input data
 */
router.post('/inventory', async (req, res) => {
  try {
    const { name, price, available_qty, image_url, category } = req.body;

    // Validation
    if (!name || !price || available_qty === undefined) {
      return res.status(400).json({
        error: 'Name, price, and available_qty are required'
      });
    }

    if (price < 0 || available_qty < 0) {
      return res.status(400).json({
        error: 'Price and available_qty must be non-negative'
      });
    }

    const product = await Product.create({
      name,
      price: parseFloat(price),
      available_qty: parseInt(available_qty),
      image_url: image_url || null,
      category: category || null
    });

    res.status(201).json(product);
  } catch (error) {
    console.error('Error creating product:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

/**
 * @swagger
 * /inventory/{id}:
 *   put:
 *     summary: Update a product
 *     tags: [Products]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: Product ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/ProductUpdate'
 *     responses:
 *       200:
 *         description: Product updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Product'
 *       400:
 *         description: Invalid input data
 *       404:
 *         description: Product not found
 */
router.put('/inventory/:id', async (req, res) => {
  try {
    const { name, price, available_qty, image_url, category } = req.body;

    // Check if product exists
    const existingProduct = await Product.findById(req.params.id);
    if (!existingProduct) {
      return res.status(404).json({ error: 'Product not found' });
    }

    // Validation
    if (price !== undefined && price < 0) {
      return res.status(400).json({ error: 'Price must be non-negative' });
    }

    if (available_qty !== undefined && available_qty < 0) {
      return res.status(400).json({ error: 'Available quantity must be non-negative' });
    }

    const product = await Product.update(req.params.id, {
      name: name || existingProduct.name,
      price: price !== undefined ? parseFloat(price) : existingProduct.price,
      available_qty: available_qty !== undefined ? parseInt(available_qty) : existingProduct.available_qty,
      image_url: image_url !== undefined ? image_url : existingProduct.image_url,
      category: category !== undefined ? category: existingProduct.category
    });

    res.json(product);
  } catch (error) {
    console.error('Error updating product:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

/**
 * @swagger
 * /inventory/{id}:
 *   patch:
 *     summary: Partially update a product
 *     tags: [Products]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: Product ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/ProductUpdate'
 *     responses:
 *       200:
 *         description: Product updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Product'
 *       400:
 *         description: Invalid input data
 *       404:
 *         description: Product not found
 */
router.patch('/inventory/:id', async (req, res) => {
  try {
    const { name, price, available_qty, image_url,category } = req.body;

    // Check if product exists
    const existingProduct = await Product.findById(req.params.id);
    if (!existingProduct) {
      return res.status(404).json({ error: 'Product not found' });
    }

    // Validation for provided fields only
    if (price !== undefined && price < 0) {
      return res.status(400).json({ error: 'Price must be non-negative' });
    }

    if (available_qty !== undefined && available_qty < 0) {
      return res.status(400).json({ error: 'Available quantity must be non-negative' });
    }

    const product = await Product.update(req.params.id, {
      name: name || existingProduct.name,
      price: price !== undefined ? parseFloat(price) : existingProduct.price,
      available_qty: available_qty !== undefined ? parseInt(available_qty) : existingProduct.available_qty,
      image_url: image_url !== undefined ? image_url : existingProduct.image_url,
      category: category !== undefined ? category : existingProduct.category
    });

    res.json(product);
  } catch (error) {
    console.error('Error updating product:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

/**
 * @swagger
 * /inventory/{id}:
 *   delete:
 *     summary: Delete a product
 *     tags: [Products]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: Product ID
 *     responses:
 *       200:
 *         description: Product deleted successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                 product:
 *                   $ref: '#/components/schemas/Product'
 *       404:
 *         description: Product not found
 */
router.delete('/inventory/:id', async (req, res) => {
  try {
    const product = await Product.delete(req.params.id);

    if (!product) {
      return res.status(404).json({ error: 'Product not found' });
    }

    res.json({
      message: 'Product deleted successfully',
      product
    });
  } catch (error) {
    console.error('Error deleting product:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

/**
 * @swagger
 * /inventory/reserve:
 *   post:
 *     summary: Reserve product quantity
 *     tags: [Inventory]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/ReserveRequest'
 *     responses:
 *       200:
 *         description: Quantity reserved successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ReserveResponse'
 *       400:
 *         description: Insufficient quantity or invalid request
 *       404:
 *         description: Product not found
 */
router.post('/inventory/reserve', async (req, res) => {
  try {
    const { product_id, quantity } = req.body;

    if (!product_id || !quantity || quantity <= 0) {
      return res.status(400).json({ error: 'Invalid product_id or quantity' });
    }

    const updatedProduct = await Product.reserveQuantity(product_id, quantity);

    res.json({ ok: true, product: updatedProduct });
  } catch (error) {
    console.error('Error reserving product:', error);

    if (error.message === 'Product not found') {
      return res.status(404).json({ error: 'Product not found' });
    }

    if (error.message === 'Insufficient quantity') {
      return res.status(400).json({ error: 'Insufficient quantity' });
    }

    res.status(500).json({ error: 'Internal server error' });
  }
});

module.exports = router;
