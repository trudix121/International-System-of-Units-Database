const { Pool } = require('pg');
const bcrypt = require('bcrypt');
const express = require('express'); // Changed 'e' to 'express' for clarity
require('dotenv').config({path:'../.env'})

const pool = new Pool({
  connectionString: process.env.POSTGRE_QUERY
})

async function createNewUser(email, password, role, username) {
  try {
    const userCheckQuery = 'SELECT * FROM users WHERE email = $1 OR username = $2';
    const userAlreadyExists = await pool.query(userCheckQuery, [email, username]);

    if (userAlreadyExists.rows.length > 0) {
      return { success: false, reason: 'Email or Username already exists' };
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const insertUserQuery = 'INSERT INTO users (email, password, role, username) VALUES ($1, $2, $3, $4)';
    await pool.query(insertUserQuery, [email, hashedPassword, role, username]);

    return { success: true };
  } catch (err) {
    console.error('Failed to create new user account:', err);
    return { success: false, error: err.message };
  }
}

async function updateUser(username, param, data) {
  try {
    const userExistQuery = 'SELECT * FROM users WHERE username = $1';
    const userExists = await pool.query(userExistQuery, [username]);

    if (userExists.rows.length === 0) {
      return { success: false, error: 'User does not exist' };
    }

    const updateUserQuery = `UPDATE users SET ${param} = $1 WHERE username = $2`;
    await pool.query(updateUserQuery, [data, username]);

    return { success: true };
  } catch (err) {
    console.error('Failed to update user:', err);
    return { success: false, error: err.message };
  }
}

async function run() {
 // const result = await updateUser('trudix', 'email', 'ac121@gmail.com');
}

run();

module.exports = {
    createNewUser,
    updateUser,
    pool
};
