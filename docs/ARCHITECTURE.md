# ARCHITECTURE OVERVIEW

This mini e-commerce system allows a user to browse the products, make an order, make a simulated payment and recieve a confirmation notification.
It is splitted into five componets: Frontend, Orders Service, Inventory Service, Payment Service and Gateway(Nginx).

## 1. CONTEXT DIAGRAM

                                    +----------------+
                                    |  User Browser  |
                                    +----------------+
                                            |
                                            v
                                    +-----------------+
                                    |  Frontend (SPA) |
                                    +-----------------+
                                            |
                                            v
                                   +------------------+
                                   |  Gateway(Nginx)  |
                                   +------------------+
                                  /         |          \
                + ---------------+    +------------+    +-------------+
                | Order  Service |   | Inventory   |    | Payment     |
                | (Orchestrates) |    | (Postgres) |    | (Simulator) |
                +----------------+    +------------+    +-------------+


## 2. API STUBS

  - **Orders Service**
    
    * POST/api/orders -> {product_id, quantity}

	* GET/api/orders/{order_id} -> {order_id, status}

   - **Inventory Service**

     * POST/api/products/{product_id} -> {product_id, product_name, price, stock}
    
     * GET/api/products/{product_id} -> {product_id, product_name, price, stock}
    
   - **Payment Service**

     * POST/api/payments -> {payment_id, status}
       
     * GET/api/payments -> {order_id, total_amount}
       
## 3. Component Responsibilities 
-	a. Front End Service :  The responsibility of the front end is to provide an interface for which the user will interact with the product.
-	b. Gateway Service : Serves as the Frontend's single point of entry, directing queries to the relevant backend services (Orders, Inventory, Payment). 
-	c. Payment Service : Simulates the order payment process and sends a confirmation when the transaction is successful or not. 
-	d. Inventory Service : The responsibility of this component is to use database to store and manage product availability and stock levels. 
-	e. Order Service : Works with the Inventory and Payment services to coordinate the order placing process.


## 4. Data Models 
- **products** (id, name, price, available_qty)
- **orders** (id, created_at, status)
