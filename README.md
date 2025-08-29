# BFHL API

## Submitted by Soham Chatterjee

## Overview

The BFHL API provides a `/bfhl` endpoint that accepts a POST request to process a given set of data. The API analyzes the input and returns structured information about its composition, including identification of characters, numbers, and special characters.

---

## Endpoint

### `POST /bfhl`

#### Request

- **Headers:**`Content-Type: application/json`
- **Body:**JSON object with a single key:

  - `data` (Array of Strings): Each element can be a character or string.

**Example:**

```json
{
  "data": ["M", "2", "!", "7", "hello"]
}
```

---

#### Response

JSON object containing:

- `is_success` (Boolean): Indicates if the request was processed successfully.
- `user_id` (String): Unique identifier for the user.
- `email` (String): User's email.
- `roll_number` (String): User's roll number.
- `odd_numbers` (Array of Strings): Odd numbers found in the input.
- `even_numbers` (Array of Strings): Even numbers found in the input.
- `alphabets` (Array of Strings): Alphabetic strings found in the input.
- `special_characters` (Array of Strings): Special characters found in the input.
- `sum` (String): Sum of numeric values found in the input.
- `concat_string` (String): Concatenated string of all letters, reversed and with alternating caps.

**Example:**

```json
{
  "is_success": true,
  "user_id": "ezio_auditore_10101715",
  "email": "ezio@firanze.com",
  "roll_number": "AC21715",
  "odd_numbers": ["7"],
  "even_numbers": ["2"],
  "alphabets": ["HELLO"],
  "special_characters": ["!"],
  "sum": "9",
  "concat_string": "OLLEhM"
}
```

---

## Notes

- Ensure the `Content-Type` header is set to `application/json`.
- All numeric values in `odd_numbers`, `even_numbers`, and `sum` are strings.
- The `user_id`, `email`, and `roll_number` are set via environment variables or default values.
- The `concat_string` is formed by reversing all letters found in the input and applying alternating capitalization.

---

## Running Locally

1. Install dependencies:
   ```
   npm install
   ```
2. Start the server:
   ```
   node server/server.js
   ```
3. The API will run on port `3000` by default.

---

## License

MIT
