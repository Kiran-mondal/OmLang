## 2024-08-24 - DoS Prevention via Input Validation in Database Storage
**Vulnerability:** The API endpoint for saving user code snippets (`/api/save-code`) lacked adequate validation on the `title` and `code` parameters. Specifically, there were no length checks or robust type enforcements, rendering it vulnerable to Denial of Service (DoS) attacks via oversized payloads or potential database overflow on `VARCHAR(255)` fields.
**Learning:** Even simple storage endpoints require strict data limits. A lack of limits can quickly crash a backend server or overwhelm a database connection.
**Prevention:** Always implement maximum payload length validation and type checking (e.g. `typeof code !== 'string'`, `length > 50000`) before data reaches the database layer.
