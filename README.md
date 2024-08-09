# PennyWise

PennyWise is an expense tracker web app that helps you manage your finance effieciently. With features like authentication, detailed charts, and an overview of your expenses and incomes, PennyWise makes budgeting easy and intuitive. The credentials given by users are only for the purpose of securing and authenticating the data, It is not used of other purpose.

## Features

- **Authentication**: Securely log in and manage your account.
- **Expense Tracking**: Keep track of your daily, weekly and monthly expenses.
- **Income Tracking**: Record and categorize your incomes.
- **Charts and Overviews**: Visualize your financial data with charts and summaries.
- **Categorization**: Categorize your expenses and incomes for better insights.
- **Responsive Design**: Use PennyWise seamlessly on any device.

## Tech Stack

- **Frontend**: SvelteKit
- **Backend**: NodeJS, BunJS
- **Database**: SQLite

## Installation

1. Clone the repository:

```bash
$ git clone https://github.com/raj-p26/expense-tracker.git
$ cd expense-tracker
```

2. Install dependencies:

```bash
$ npm install # or bun install
```

3. Database Setup:
   Create a database file and add the `schema.sql` in it to have basic schema up and running. Replace `YOUR_DB` with your database name.

```bash
$ sqlite3 YOUR_DB < schema.sql
```

4. Setup Environment Variables:
   Add the name of your db in `.env` file

```plaintext
DB_NAME=<YOUR-DB-NAME>
```

4. Run the development server:

```bash
$ npm run dev # or bun run dev
```

5. Open your browser and navigate to `http://localhost:3000`

## Usage

1. **Signup/Log In**: Create an account or log in to your existing account.
2. **Add Expenses**: Navigate to the "Add Expense" page to record your expenses.
3. **Add Incomes**: Navigate to the "Add Incomes" page to record your incomes.
4. **View Charts**: Navigate to the "Overview" page to see detailed charts of your expenses and incomes.
5. **Filter**: Filter your expenses and incomes based on Category.

## License

This project is licensed under Apache License 2.0. See the [LICENSE](LICENSE) file for more details.
