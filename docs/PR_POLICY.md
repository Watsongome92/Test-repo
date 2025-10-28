# Pull Request Policy

## Branch naming convention
  - Uses hyphens instead of spaces for word separation.
  - Branch names must be based on components and features that need changing(<type>/<component>/<ticket-or-shot-description>) i.e
     - "feat/inventory/add-search-bar", for implementing a new feature in invetory
     - "fix/payment/calculations", for fixing bugs in payment
     - "maintenance/frontend/typo", for maintance on the frontend
  
## Review requirements:
  - All pull requests require at least 2 reviews before merging
  - Avoid large pull requests; break work into smaller, reviewable parts if possible
## Definition of Done:
  - Code builds successfully in local environment.
  - The /healthz endpoint responds with successful status
  - All tests pass i.e unit and inergration testing
  - Documentation is updated
