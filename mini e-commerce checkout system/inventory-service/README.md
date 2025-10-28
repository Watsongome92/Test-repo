# Inventory Service API

A RESTful API service for managing product inventory with reservation capabilities, built with Express.js and documented with Swagger/OpenAPI.

## Features

- **Product Management**: Full CRUD operations for products
- **Inventory Tracking**: Monitor available quantities
- **Reservation System**: Reserve products with quantity validation
- **Health Monitoring**: Service health check endpoint
- **Input Validation**: Comprehensive request validation
- **Error Handling**: Robust error handling with appropriate HTTP status codes

## API Documentation

### Base Models

#### Product
| Field | Type | Required | Description |
|-------|------|----------|-------------|
| id | integer | Auto-generated | Product ID |
| name | string | Yes | Product name |
| price | number | Yes | Product price |
| available_qty | integer | Yes | Available quantity |
| image_url | string | No | Product image URL | 
| Category  |string   |Yes|Product category|
| created_at | string | Auto-generated | Creation timestamp |
| updated_at | string | Auto-generated | Last update timestamp |

### Endpoints


#### Health Check
- `GET /health` - Service health status

#### Product Management
- `GET /inventory` - Get all products
- `GET /inventory/:id` - Get product by ID
- `POST /inventory` - Create new product
- `PUT /inventory/:id` - Update product (full update)
- `PATCH /inventory/:id` - Partially update product
- `DELETE /inventory/:id` - Delete product

#### Inventory Operations
- `POST /inventory/reserve` - Reserve product quantity


## Health Check

### `GET /health`

Checks the health of the inventory service.

#### Responses:
- **200 OK**
  - **Content:**
    ```json
    {
      "status": "OK",
      "timestamp": "2025-10-19T00:00:00Z",
      "service": "inventory-service"
    }
    ```

## Products Endpoints

### `GET /inventory`

Gets a list of all products in the inventory.

#### Responses:
- **200 OK**
  - **Content:**
    ```json
    [
      {
        "id": 1,
        "name": "Product Name",
        "price": 10.99,
        "available_qty": 100,
        "image_url": "http://example.com/image.jpg",
        "category": "food item",
        "created_at": "2025-10-19T00:00:00Z",
        "updated_at": "2025-10-19T00:00:00Z"
      }
    ]
    ```

### `GET /inventory/{id}`

Gets details of a specific product by its ID.

#### Parameters:
- `id`: The product ID (integer).

#### Responses:
- **200 OK**
  - **Content:**
    ```json
    {
      "id": 1,
      "name": "Product Name",
      "price": 10.99,
      "available_qty": 100,
      "image_url": "http://example.com/image.jpg",
      "category": "food item",
      "created_at": "2025-10-19T00:00:00Z",
      "updated_at": "2025-10-19T00:00:00Z"
    }
    ```
- **404 Not Found**
  - **Content:**
    ```json
    {
      "error": "Product not found"
    }
    ```

### `POST /inventory`

Creates a new product.

#### Request Body:
```json
{
  "name": "Product Name",
  "price": 10.99,
  "available_qty": 100,
  "image_url": "http://example.com/image.jpg",
  "category": "food item"
}
