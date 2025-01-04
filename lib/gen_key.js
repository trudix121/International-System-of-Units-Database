const crypto = require('crypto');
const { pool } = require('../db/postdb');

async function generate_key(req, res, next) {
    try {
        // Generate a random key
        const key = crypto.randomBytes(25).toString('hex');
        const username = req.user.username

        // Check if the user exists
        const userResult = await pool.query('SELECT * FROM users WHERE username=$1', [username]);

        if (userResult.rows.length === 0) {
            return res.status(404).send('User not found');
        }

        // Check if an API key already exists for the user
        const keyResult = await pool.query('SELECT * FROM api_keys WHERE username=$1', [username]);

        if (keyResult.rows.length > 0) {
            return res.send(`You already have a generated key: ${keyResult.rows[0].key}`);
            n
        } else {
            // Insert new API key
            await pool.query('INSERT INTO api_keys (username, key) VALUES ($1, $2)', [username, key]);
            return res.send(`Your key has been generated: ${key}`);
            
        }
    } catch (error) {
        console.error('Error generating key:', error);
        return res.status(500).send('Internal Server Error');
    }
}

module.exports = generate_key;
