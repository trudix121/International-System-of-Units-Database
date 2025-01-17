CREATE DATABASE si

CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    password VARCHAR(255) NOT NULL,
    username VARCHAR(255),
    email VARCHAR(255) NOT NULL,
    role VARCHAR(255),
    requests INTEGER DEFAULT 0,
    created_at TIMESTAMP WITHOUT TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITHOUT TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE admin (
    username VARCHAR(255),
    password VARCHAR(255)
);
CREATE TABLE api_keys (
        id SERIAL PRIMARY KEY,
        username VARCHAR(255),
        key VARCHAR(255)
)