# MERN Expense Tracker

A full-stack expense tracking application built with the MERN stack (MongoDB, Express.js, React.js, Node.js) that helps users manage their finances effectively.

## Features


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
   npm run dev
   ```

2. Start the frontend development server:
   ```bash
   cd frontend/expense-tracker
   npm run dev
   ```

3. Access the application at `http://localhost:5173`