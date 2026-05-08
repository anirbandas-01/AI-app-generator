Dynamic App Generator
A powerful full-stack application that enables users to create and manage dynamic, configuration-driven applications at runtime. Build forms, tables, and data management systems without writing code.
Show Image
Show Image
Show Image
🌟 Features

🔧 Runtime Configuration - Create applications dynamically using JSON-based field configurations
📝 Dynamic Forms - Auto-generated forms based on your configuration
📊 Dynamic Tables - Automatic table rendering with configured fields
📤 CSV Import - Bulk data upload with field validation
🔐 Authentication - Secure user registration and login with JWT
🎨 Modern UI - Clean, responsive interface built with Tailwind CSS
⚡ Real-time Updates - Instant feedback and data synchronization

🏗️ Architecture
Tech Stack
Frontend:

React 19.2.5
React Router DOM 7.15.0
Tailwind CSS 4.2.4
Axios 1.16.0
PapaParse 5.5.3
Vite 8.0.10
Backend:

Node.js with Express 5.2.1
Supabase (PostgreSQL)
JSON Web Tokens (JWT)
bcryptjs for password hashing
CORS enabled

📋 Prerequisites

Node.js >= 20.0.0
npm or yarn
Supabase account and project

🚀 Getting Started
1. Clone the Repository
bashgit clone https://github.com/yourusername/dynamic-app-generator.git
cd dynamic-app-generator
2. Backend Setup
3. bashcd backend
npm install
Create a .env file in the backend directory:
envPORT=8000
SUPABASE_URL=your_supabase_project_url
SUPABASE_ANON_KEY=your_supabase_anon_key
JWT_SECRET=your_jwt_secret_key
3. Database Setup
Create the following tables in your Supabase project:
users table:
sqlCREATE TABLE users (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  email TEXT UNIQUE NOT NULL,
  password TEXT NOT NULL,
  created_at TIMESTAMP DEFAULT NOW()
);
apps table:
sqlCREATE TABLE apps (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  config JSONB NOT NULL,
  csv_uploads INTEGER DEFAULT 0,
  created_at TIMESTAMP DEFAULT NOW()
);
app_data table:
  CREATE TABLE app_data (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  app_id TEXT REFERENCES apps(id) ON DELETE CASCADE,
  data JSONB NOT NULL,
  created_at TIMESTAMP DEFAULT NOW()
);
4. Frontend Setup
bashcd ../frontend
npm install
Create a .env file in the frontend directory:
envVITE_API_URL=http://localhost:8000
5. Run the Application
Terminal 1 - Backend:
bashcd backend
npm run dev
Terminal 2 - Frontend:
cd frontend
npm run dev
The application will be available at http://localhost:5173
📖 Usage
Creating a Dynamic App

Register/Login - Create an account or login to existing account
Create New App - Click "Create App" and configure your fields:

Add field name (e.g., "Email", "Name", "Age")
Select field type (text, number, email, date, password)
Add multiple fields as needed


Generate App - Click "Generate Application" to create your dynamic app

Managing Data
Manual Entry:

Use the dynamic form to add individual records
Form fields are automatically generated based on your configuration

CSV Import:

Upload CSV files with matching column headers
System validates fields before import
Supports bulk data insertion
View Records:

Dynamic table displays all records
Columns automatically match your field configuration

🔑 API Endpoints
Authentication

POST /auth/register - Register new user
POST /auth/login - Login user

Apps

POST /apps - Create new app
GET /apps - Get all user apps
GET /apps/:id - Get specific app
DELETE /apps/:id - Delete app

Data

POST /data/:appId - Add single record
GET /data/:appId - Get all records
POST /data/bulk/:appId - Bulk CSV import

📁 Project Structure
      dynamic-app-generator/
├── backend/
│   ├── controller/
│   │   ├── appController.js
│   │   ├── authController.js
│   │   └── dataController.js
│   ├── middleware/
│   │   └── authMiddleware.js
│   ├── routes/
│   │   ├── appRoutes.js
│   │   ├── authRoutes.js
│   │   └── dataRoutes.js
│   ├── utils/
│   │   └── validateFields.js
│   ├── db.js
│   ├── index.js
│   └── package.json
│
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   │   ├── CSVUpload.jsx
│   │   │   ├── DynamicForm.jsx
│   │   │   ├── DynamicTable.jsx
│   │   │   ├── Navbar.jsx
│   │   │   └── ProtectedRoute.jsx
│   │   ├── pages/
│   │   │   ├── CreateApp.jsx
│   │   │   ├── Dashboard.jsx
│   │   │   ├── DynamicApp.jsx
│   │   │   ├── Login.jsx
│   │   │   └── Register.jsx
│   │   ├── services/
│   │   │   └── api.js
│   │   ├── App.jsx
│   │   ├── main.jsx
│   │   └── index.css
│   ├── index.html
│   ├── vite.config.js
│   └── package.json
│
└── README.md 
Screenshots
Dashboard
Beautiful overview of all your dynamic applications with statistics.
App Creator
Intuitive interface to configure fields and generate applications.
Dynamic Application
Runtime-generated forms, tables, and CSV import functionality.
🔒 Security Features

JWT-based authentication
Password hashing with bcrypt
Protected routes on frontend
Server-side validation
SQL injection prevention via Supabase
CORS configuration

🤝 Contributing
Contributions are welcome! Please feel free to submit a Pull Request. 
Fork the project
Create your feature branch (git checkout -b feature/AmazingFeature)
Commit your changes (git commit -m 'Add some AmazingFeature')
Push to the branch (git push origin feature/AmazingFeature)
Open a Pull Request

📝 License
This project is licensed under the MIT License - see the LICENSE file for details.
👨‍💻 Author
Your Name

GitHub: @yourusername
LinkedIn: Your LinkedIn

🙏 Acknowledgments

React Team for the amazing framework
Supabase for the backend infrastructure
Tailwind CSS for the styling system
All contributors and supporters

📮 Support
For support, email your-email@example.com or open an issue in the GitHub repository. 
Made with ❤️ by Anirban Das

