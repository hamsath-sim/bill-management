# Project Structure & File Guide

## Complete File Organization

```
Bill-Management-System/
│
├── 📄 Frontend Files
│   ├── login.html              ← Login & Registration page
│   ├── dashboard.html          ← Main dashboard (after login)
│   └── index.html              ← Original bill management page
│
├── 🔧 Backend Setup Files
│   ├── package.json            ← Node.js dependencies list
│   ├── server.js               ← Main Express server
│   ├── setup.bat               ← Windows setup script
│   └── .env.example            ← Environment variables template
│
├── 📂 Backend Directories
│   ├── models/
│   │   └── schemas.js          ← MongoDB schemas (User, Bill, Cash)
│   │
│   ├── middleware/
│   │   └── auth.js             ← JWT authentication middleware
│   │
│   └── routes/
│       ├── auth.js             ← Login/Register routes
│       ├── bills.js            ← Bill CRUD operations
│       └── cash.js             ← Cash recording operations
│
├── 📚 Documentation Files
│   ├── README.md               ← Full documentation
│   ├── QUICKSTART.md           ← Quick setup guide
│   ├── DEPLOYMENT.md           ← Complete deployment guide
│   └── FILE_GUIDE.md           ← This file
│
└── 🛡️ Configuration Files
    ├── .env                    ← Your local environment variables (create from .env.example)
    ├── .env.example            ← Template for environment variables
    └── .gitignore              ← Files to exclude from Git
```

---

## File Descriptions

### Frontend Files

#### `login.html`
- **Purpose**: Authentication page with register/login forms
- **What it does**: 
  - Register new accounts
  - Login with email & password
  - Validates form inputs
  - Communicates with backend `/api/auth` endpoints
- **When to use**: First page users see when opening the app

#### `dashboard.html`
- **Purpose**: Main application where users manage bills and tracking
- **What it does**:
  - Displays statistics (cash, bills, loans, net balance)
  - Add new bills
  - Track cash inflows
  - View all bills and cash records in tables
  - Edit/delete bills
  - Delete cash records
  - Auto-loads data every 30 seconds
- **When to use**: After user logs in

#### `index.html`
- **Purpose**: Original bill management page (kept for reference)
- **Note**: Can be removed if you don't need it

---

### Backend Setup Files

#### `package.json`
- **Purpose**: Lists all Node.js dependencies and project metadata
- **Contains**:
  - Dependencies: express, mongoose, bcryptjs, jsonwebtoken, cors, dotenv
  - Dev dependencies: nodemon (for auto-restart)
  - Scripts: `npm start` and `npm run dev`
- **Edit**: Only if adding new packages

#### `server.js`
- **Purpose**: Main entry point for the backend server
- **What it does**:
  - Starts Express server on port 5000
  - Connects to MongoDB
  - Sets up CORS for frontend communication
  - Configures routes (auth, bills, cash)
  - Handles errors
- **Run with**: `npm start`

#### `setup.bat`
- **Purpose**: Automatic setup script for Windows
- **What it does**:
  - Checks if Node.js is installed
  - Creates .env file from template
  - Installs npm dependencies
  - Shows next steps
- **Run with**: Double-click in Windows Explorer

#### `.env.example`
- **Purpose**: Template showing what environment variables you need
- **Content**: 
  - MONGODB_URI - Database connection
  - JWT_SECRET - For signing tokens
  - PORT - Server port
  - NODE_ENV - Environment (development/production)
- **Action**: Copy to `.env` and fill in your own values

---

### Model File

#### `models/schemas.js`
- **Purpose**: Defines database structure
- **Schemas**:
  - **User**: name, email, password (encrypted)
  - **Bill**: name, amount, dueDate, category, status, description, userId
  - **Cash**: amount, date, description, userId
- **Methods**: Password hashing and comparison
- **Edit**: Only to add new fields or collection types

---

### Middleware

#### `middleware/auth.js`
- **Purpose**: Protects API routes that require authentication
- **What it does**:
  - Checks for JWT token in request headers
  - Verifies token validity
  - Adds userId to request object
  - Returns 401 error if token invalid/missing
- **Used by**: All /api/bills and /api/cash routes

---

### Route Files

#### `routes/auth.js`
- **Purpose**: Handle user authentication
- **Endpoints**:
  - `POST /api/auth/register` - Create new account
  - `POST /api/auth/login` - Login and get JWT token
- **What it does**:
  - Validates email not already registered
  - Hashes passwords
  - Creates JWT tokens
  - Returns user data

#### `routes/bills.js`
- **Purpose**: CRUD operations for bills
- **Endpoints**:
  - `GET /api/bills` - Get all user's bills
  - `GET /api/bills/:id` - Get specific bill
  - `POST /api/bills` - Create new bill
  - `PUT /api/bills/:id` - Update bill
  - `DELETE /api/bills/:id` - Delete bill
- **What it does**: Database operations with user isolation

#### `routes/cash.js`
- **Purpose**: CRUD operations for cash records
- **Endpoints**:
  - `GET /api/cash` - Get all cash records
  - `GET /api/cash/:id` - Get specific record
  - `POST /api/cash` - Create new record
  - `PUT /api/cash/:id` - Update record
  - `DELETE /api/cash/:id` - Delete record

---

### Configuration Files

#### `.env`
- **Purpose**: Store sensitive information locally (never commit to Git!)
- **Create by**: Copying `.env.example` and filling your values
- **Must have**:
  ```
  MONGODB_URI=<your-mongodb-connection>
  JWT_SECRET=<random-secret-string>
  PORT=5000
  ```

#### `.gitignore`
- **Purpose**: Tell Git which files to ignore
- **Excludes**:
  - node_modules/
  - .env (keeps passwords secret!)
  - IDE files
  - System files

---

### Documentation Files

#### `README.md`
- **For**: Complete documentation
- **Includes**:
  - Features list
  - Installation instructions
  - API documentation
  - Troubleshooting
  - Deployment options

#### `QUICKSTART.md`
- **For**: Getting up and running in 5 minutes
- **Good for**: First-time setup

#### `DEPLOYMENT.md`
- **For**: Deploying to GitHub and cloud
- **Step-by-step**: 
  - MongoDB Atlas setup
  - GitHub repository creation
  - Railway deployment
  - GitHub Pages deployment

---

## How Files Connect

```
User opens login.html
    ↓
JavaScript calls /api/auth/login
    ↓
server.js routes to auth.js
    ↓
auth.js checks database using schemas.js
    ↓
Returns JWT token to frontend
    ↓
Frontend stores token and opens dashboard.html
    ↓
Dashboard calls /api/bills and /api/cash
    ↓
Middleware (auth.js) verifies token
    ↓
Routes (bills.js, cash.js) perform database operations
    ↓
data returned and displayed in dashboard
```

---

## Important Notes

### Never Modify
- `package.json` - Unless you know what you're doing
- `models/schemas.js` - Database structure
- `middleware/auth.js` - Security critical

### Can Modify
- Frontend HTML/CSS - Change styling/layout
- `routes/` files - Add new API endpoints
- `.env` - Your local configuration

### Must Create/Edit
- `.env` - Copy from `.env.example` and fill values
- GitHub - For code version control
- MongoDB Atlas - For cloud database

---

## File Sizes & Performance

- **login.html**: ~8 KB
- **dashboard.html**: ~18 KB
- **server.js**: ~2 KB
- **Total project**: ~1.5 MB (including node_modules: ~200 MB)
- **Database size**: Start at 0 KB, grows with data

---

## Backup Important Files

Keep backups of:
1. ✅ `.env` - Your configuration
2. ✅ `models/schemas.js` - Database structure
3. ✅ Custom code in `routes/` - Your API modifications
4. ✅ Git history on GitHub - Complete code history

---

## When to Edit Which File

**User wants to change styling**: Edit HTML `<style>` block
**User wants new bill categories**: Edit `dashboard.html` dropdown options
**User wants new database fields**: Edit `models/schemas.js`
**User wants new API endpoint**: Create file in `routes/`
**User has MongoDB URI**: Edit `.env`
**User wants to host online**: Follow `DEPLOYMENT.md`

---

## Common Tasks

### Add new field to bills
1. Edit `models/schemas.js` - Add to billSchema
2. Edit `routes/bills.js` - Add to POST endpoint
3. Edit `dashboard.html` - Add input field to form

### Create new API endpoint
1. Add route in `routes/` folder
2. Import in `server.js`
3. Use `verifyToken` middleware if protected
4. Call from frontend with proper headers

### Change database name
1. Edit `.env` - Change MONGODB_URI database name
2. Or edit `server.js` - Change default connection string

### Add new user field
1. Edit `models/schemas.js` - Add to userSchema
2. Edit `routes/auth.js` - Add to register endpoint
3. Edit `login.html` - Add input field if user can enter it

---

## Version Control

The `.gitignore` file prevents these from being uploaded:
- `.env` - Keep your passwords secret!
- `node_modules/` - Recreated with `npm install`
- `.idea/` and `.vscode/` - IDE files

Always safe to commit:
- `.js`, `.html`, `.css` files
- `.json`, `.md` files
- `.env.example` (without actual secrets)
- `.gitignore`

---

**Need more details? Check the specific documentation files above! 📚**
