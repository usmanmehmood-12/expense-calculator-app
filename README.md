#  Expense Calculator Application Backend

## Description
The Expense Calculator Application Backend is a user expense calculator application. 

### ***UPDATE: JWT authentication is implemented and routes are updated***



## Installation

```bash
$ npm install
```

## Running the app

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

### ***Backend API Endpoints:***
* Sign up user: /users
* Sign in User: /users?email=${email}&password=${password}
* GET/ Fetch User Expenses: /expenses/${userId}
* EDIT/PUT/UPDATE User Expense: /expenses/${selectedTransaction.id}
* ADD User Expenses: expenses/${userId}
* DELETE User Expenses: /expenses/${transactionId}
* Reset Password/ Send Reset Password Email: /users/reset-password

  
### ***Env:***
```bash
# Port No
PORT=8082

# MongoDB database URI 
MONGODB_CONNECTION_STRING=

# MongoDB Database Name
MONGODB_DATABASE=

# User Email to send reset emails from
EMAIL_USER=

# User Email password
EMAIL_PASSWORD=
```
