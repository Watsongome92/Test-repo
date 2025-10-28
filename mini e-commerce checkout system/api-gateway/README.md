# API Gateway (Nginx)

This container runs Nginx as the API gateway and static file server for the React app.

Key points:
- Serves the React build from `/usr/share/nginx/html`.
- Proxies API requests to internal services:
  - `/api/orders/` -> order-service:5001
  - `/api/inventory/` -> inventory-service:3000
  - `/api/payment/` -> payment-service:5000

When running with Docker Compose the frontend build directory is mounted into the container.
