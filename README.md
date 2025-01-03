# International System of Units Database Project

Welcome to the International System of Units Database Project! This web application allows users to search for units, suggest new units, and provides administrative functionalities for managing unit requests.

## Features

### As a User:
1. **Search for a Unit**: Explore the existing units in the database.
2. **Suggest a New Unit**: Log in to submit a suggestion for a new unit.

### As an Admin:
1. **Add New Units**: Admins can freely add new units to the database. The database consists of two collections: `derived_units` and `base_units`, stored in MongoDB for flexibility.
2. **Manage User Requests**: View all user requests and take actions such as Accept, Reject, or Delete.

## Getting Started

These instructions will help you set up a copy of the project on your local machine for development and testing purposes.

### Prerequisites

- Node.js
- PostgreSQL
- MongoDB

### Installation

1. **Clone the Repository**:
   git clone https://github.com/trudix121/International-System-of-Units-Database.git
2. **Navigate to the Project Directory**:
   cd sidatabase
3. **Install Dependencies**:
   npm install

### Configuration

1. Fill in all the information in the `example.env` file and then rename it to `.env`.
2. Run the following command to set up the PostgreSQL database:
   psql -U username -f postgre.sql

### Running the Application

To start the application, run the following command:
npm run start

## Conclusion

You are now ready to explore the International System of Units Database! Enjoy your experience, and feel free to contribute to the project.
