# API Testing Framework for User Registration and Login APIs

This project is a testing framework that verifies business requirements for the **User Registration** and **User Login** APIs using **Mocha** and **Supertest**. It includes both positive and negative test scenarios to ensure full coverage of the business rules.

## Table of Contents

- [APIs Under Test](#apis-under-test)
- [Technology Stack](#technology-stack)
- [Project Structure](#project-structure)
- [Installation](#installation)
- [Usage](#usage)
  - [Running the Application](#running-the-application)
  - [Running the Tests](#running-the-tests)
- [Test Cases](#test-cases)
  - [User Registration API](#user-registration-api)
  - [User Login API](#user-login-api)
- [Bug Reporting](#bug-reporting)
- [Contributing](#contributing)

---

## APIs Under Test

1. **User Registration API**:
   - **Endpoint**: `POST https://reqres.in/api/register`
   - **Headers**: `Content-Type: application/json`
   - **Business Rules**:
     - Only predefined emails are allowed.
     - Password must be at least 6 characters long and contain one uppercase letter, one number, and one special character.
     - Registration should fail for already registered emails.

2. **User Login API**:
   - **Endpoint**: `POST https://reqres.in/api/login`
   - **Headers**: `Content-Type: application/json`
   - **Business Rules**:
     - Only registered users can log in.
     - Password must be validated to ensure it matches the registration password.

## Technology Stack

- **Node.js**: JavaScript runtime environment.
- **Mocha**: JavaScript test framework for asynchronous testing.
- **Supertest**: HTTP assertion library for testing REST APIs.
- **Express**: Lightweight web framework to mock API endpoints for testing.

## Project Structure

```plaintext
api-testing/
├── src/
│   └── index.js            # Express server for mocking API
├── test/
│   └── app.test.js         # Test cases for Registration and Login APIs
├── package.json            # Project metadata and dependencies
└── README.md               # Project documentation (this file)

Installation
Navigate to the project directory:
cd api-testing

Install the dependencies:
npm install

Running the Application
Start the Express server by running the command:
npm start
The server will start at http://localhost:3000.

Running the Tests
To run the Mocha tests using Supertest, use the following command:
npm test

Test Cases
User Registration API
Register with a valid predefined email and valid password.
Register with an email not in the predefined list.
Register with an already registered email.
Register with a password shorter than 6 characters.
Register with a password missing an uppercase letter, number, or special character.

User Login API
Log in with valid credentials.
Attempt to log in with an unregistered email.
Attempt to log in with an incorrect password.
Attempt to log in with a password shorter than 6 characters or missing required characters.

Author: Kalpesha Pingale