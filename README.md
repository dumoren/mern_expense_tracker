# MERN Expense Tracker

A full-stack expense tracking application built with the MERN stack (MongoDB, Express.js, React.js, Node.js) that helps users manage their finances effectively.

## Features

- **User Authentication**
  - Secure registration and login
  - JWT-based authentication
  - Protected routes

- **Expense Management**
  - Add, view, and delete expenses
  - Categorize expenses
  - Track expense history
  - Export expenses to Excel

- **Income Tracking**
  - Add, view, and delete income sources
  - Track income history
  - Export income data to Excel

- **Budget Planning**
  - Create and manage budgets
  - Track budget progress
  - Associate expenses with budgets
  - Visual budget tracking

- **Financial Planner**
  - AI-powered financial insights
  - 50/30/20 budget rule calculator
  - Personalized financial recommendations
  - Expense analysis by category

- **Dashboard**
  - Overview of financial health
  - Recent transactions
  - Monthly income and expense summaries
  - Visual data representation

## Tech Stack

- **Frontend**
  - React.js
  - Redux for state management
  - Tailwind CSS for styling
  - Axios for API calls
  - React Router for navigation

- **Backend**
  - Node.js
  - Express.js
  - MongoDB
  - Mongoose for database modeling
  - JWT for authentication
  - OpenAI API for financial insights

## Prerequisites

- Node.js (v14 or higher)
- MongoDB
- OpenAI API key (for financial insights feature)

## Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/mern_expense_tracker.git
   cd mern_expense_tracker
   ```

2. Install backend dependencies:
   ```bash
   cd backend
   npm install
   ```

3. Install frontend dependencies:
   ```bash
   cd ../frontend/expense-tracker
   npm install
   ```

4. Create environment variables:
   - Backend (.env):
     ```
     MONGO_URI=your_mongodb_connection_string
     JWT_SECRET=your_jwt_secret
     PORT=8000
     OPENAI_API_KEY=your_openai_api_key
     ```
   - Frontend (.env):
     ```
     REACT_APP_API_URL=http://localhost:8000
     ```

## Running the Application

1. Start the backend server:
   ```bash
   cd backend
   npm start
   ```

2. Start the frontend development server:
   ```bash
   cd frontend/expense-tracker
   npm start
   ```

3. Access the application at `http://localhost:3000`

## Project Structure

```
mern_expense_tracker/
├── backend/
│   ├── config/
│   ├── controllers/
│   ├── middleware/
│   ├── models/
│   ├── routes/
│   └── server.js
└── frontend/
    └── expense-tracker/
        ├── public/
        └── src/
            ├── components/
            ├── pages/
            ├── redux/
            ├── utils/
            └── App.js
```

## API Endpoints

- **Auth**
  - POST /api/v1/auth/register
  - POST /api/v1/auth/login
  - GET /api/v1/auth/user

- **Income**
  - POST /api/v1/income/add
  - GET /api/v1/income/get
  - DELETE /api/v1/income/:id
  - GET /api/v1/income/downloadexcel

- **Expense**
  - POST /api/v1/expense/add
  - GET /api/v1/expense/get
  - DELETE /api/v1/expense/:id
  - GET /api/v1/expense/downloadexcel

- **Budget**
  - POST /api/v1/budget/create
  - GET /api/v1/budget/get
  - GET /api/v1/budget/:id
  - PUT /api/v1/budget/:id
  - DELETE /api/v1/budget/:id

- **Financial Planner**
  - POST /api/v1/financial-planner/analyze

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Acknowledgments

- OpenAI API for providing financial insights
- MongoDB for database services
- The MERN stack community for resources and support 