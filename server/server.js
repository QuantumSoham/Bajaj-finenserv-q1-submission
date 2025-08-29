const express = require("express");
const cors = require("cors");
require("dotenv").config();

const app = express();
app.use(cors());
app.use(express.json());

//Reading from environment
const FULL_NAME = (process.env.FULL_NAME || "ezio_auditore").toLowerCase();
const DOB = process.env.DOB || "10101715"; // ddmmyyyy
const EMAIL = process.env.EMAIL || "ezio@firanze.com";
const ROLL_NUMBER = process.env.ROLL_NUMBER || "AC21715";

const userId = `${FULL_NAME}_${DOB}`;
const digitsOnly = /^\d+$/;
const lettersOnly = /^[A-Za-z]+$/;

app.post("/bfhl", (req, res) => {
  try {
    const body = req.body || {};
    const data = body.data;

    // Validate
    if (!Array.isArray(data)) {
      return res.status(400).json({
        is_success: false,
        user_id: userId,
        email: EMAIL,
        roll_number: ROLL_NUMBER,
        odd_numbers: [],
        even_numbers: [],
        alphabets: [],
        special_characters: [],
        sum: "0",
        concat_string: "",
        message: "Invalid request: 'data' must be an array of strings."
      });
    }

    const even_numbers = [];
    const odd_numbers = [];
    const alphabets = [];
    const special_characters = [];
    let sum = 0;

    // Collect letters from anywhere for concat_string
    const lettersForConcat = [];

    for (const raw of data) {
      const s = String(raw);

      // Gather letters from all tokens
      const letters = s.match(/[A-Za-z]/g);
      if (letters) lettersForConcat.push(...letters);

      if (digitsOnly.test(s)) {
        const n = parseInt(s, 10);
        sum += n;
        (n % 2 === 0 ? even_numbers : odd_numbers).push(s); // keep as strings
      } else if (lettersOnly.test(s)) {
        alphabets.push(s.toUpperCase());
      } else {
        special_characters.push(s);
      }
    }

    // Reverse all letters and apply alternating caps: Upper, lower, Upper, ...
    const reversed = lettersForConcat.reverse();
    const concat_string = reversed
      .map((ch, i) => (i % 2 === 0 ? ch.toUpperCase() : ch.toLowerCase()))
      .join("");

    return res.status(200).json({
      is_success: true,
      user_id: userId,
      email: EMAIL,
      roll_number: ROLL_NUMBER,
      odd_numbers,
      even_numbers,
      alphabets,
      special_characters,
      sum: String(sum),    // sum must be a string
      concat_string
    });
  } catch (err) {
    // error handling
    return res.status(500).json({
      is_success: false,
      user_id: userId,
      email: EMAIL,
      roll_number: ROLL_NUMBER,
      odd_numbers: [],
      even_numbers: [],
      alphabets: [],
      special_characters: [],
      sum: "0",
      concat_string: "",
      message: "Internal server error"
    });
  }
});

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`BFHL API running on port ${port}`));
