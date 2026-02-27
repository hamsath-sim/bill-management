# 🔥 Firewood Business Management System

A complete full-stack bill management system for firewood businesses in Sri Lanka. Built with **Express.js**, **MongoDB**, and **vanilla JavaScript**.

## Features

✅ **User Authentication** - Register/Login with JWT tokens  
✅ **Worker Management** - Track firewood suppliers  
✅ **Bill Tracking** - Government bills with KG rates  
✅ **Loan Management** - Give loans to workers, track repayments  
✅ **Cash Management** - Real-time cash flow tracking  
✅ **Activity Logging** - Complete audit trail of all transactions  
✅ **Responsive Dashboard** - Modern dark theme UI  

## System Overview

### Business Model

1. **Workers** supply firewood in KG (kilograms)
2. **Government bills** based on KG × Government Rate (e.g., LKR 10/kg)
3. **Worker payment** based on KG × Our Rate (e.g., LKR 9/kg)
4. **Profit** = KG × (Government Rate - Our Rate)
5. **Loans** can be given to workers and deducted from bill payments

### Currency

All amounts are in **LKR** (Sri Lankan Rupees)

## Installation

### Step 2: Install Dependencies

```bash
npm install
```

### Step 3: Setup Environment Variables

Copy `.env.example` to `.env`:

```bash
cp .env.example .env
```

Edit `.env` and add your MongoDB connection string:

```
MONGODB_URI=mongodb://localhost:27017/bill-management
JWT_SECRET=your-secret-key-change-this
PORT=5000
```

### Step 4: Start the Backend Server

```bash
npm start
```

Or for development with auto-restart:

```bash
npm run dev
```

You should see: `Server is running on http://localhost:5000`

### Step 5: Open the Application

Open `login.html` in your browser (or use VS Code Live Server):

- **Frontend URL**: `http://localhost:5500` or `http://127.0.0.1:5500`
- **Registry**: Create a new account
- **Dashboard**: Access your bill management system

## Deploying Online

### Option 1: Using MongoDB Atlas (Recommended)

1. **Create MongoDB Atlas Account**:
   - Go to [mongodb.com/cloud/atlas](https://www.mongodb.com/cloud/atlas)
   - Sign up for free
   - Create a new cluster

2. **Get Connection String**:
   - Click "Connect" on your cluster
   - Select "Drivers"
   - Copy the connection string
   - Update your `.env`:
     ```
     MONGODB_URI=mongodb+srv://<username>:<password>@cluster.mongodb.net/bill-management
     ```

### Option 2: Deploy Backend to Railway, Heroku, or Render

#### Using Railway (Easiest)

1. Push code to GitHub
2. Go to [railway.app](https://railway.app)
3. Connect your GitHub repository
4. Add MongoDB connection string in environment variables
5. Deploy!

#### Using Render

1. Go to [render.com](https://render.com)
2. Create new Web Service from GitHub
3. Enter build command: `npm install`
4. Enter start command: `npm start`
5. Add environment variables
6. Deploy!

#### Using Heroku

```bash
heroku login
heroku create your-app-name
heroku config:set MONGODB_URI=<your-mongodb-uri>
git push heroku main
```

### Option 3: Deploy Frontend to GitHub Pages

1. **Create GitHub Repository**:
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPO.git
   git branch -M main
   git push -u origin main
   ```

2. **Enable GitHub Pages**:
   - Go to repository Settings
   - Scroll to "Pages"
   - Select `main` branch
   - Save

3. **Update Frontend URLs** in `login.html` and `dashboard.html`:
   ```javascript
   const API_URL = 'https://your-backend-url/api';
   ```

## API Documentation

### Authentication Endpoints

#### Register
```
POST /api/auth/register
Content-Type: application/json

{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "securePassword123"
}

Response:
{
  "message": "User registered successfully",
  "token": "jwt_token_here",
  "user": {
    "id": "user_id",
    "name": "John Doe",
    "email": "john@example.com"
  }
}
```

#### Login
```
POST /api/auth/login
Content-Type: application/json

{
  "email": "john@example.com",
  "password": "securePassword123"
}

Response:
{
  "message": "Login successful",
  "token": "jwt_token_here",
  "user": {
    "id": "user_id",
    "name": "John Doe",
    "email": "john@example.com"
  }
}
```

### Bill Endpoints

#### Get All Bills
```
GET /api/bills
Header: Authorization: Bearer <token>
```

#### Create Bill
```
POST /api/bills
Header: Authorization: Bearer <token>
Content-Type: application/json

{
  "name": "Monthly Rent",
  "amount": 1200,
  "dueDate": "2024-03-15",
  "category": "Rent",
  "status": "Pending",
  "description": "Apartment rent"
}
```

#### Update Bill
```
PUT /api/bills/:id
Header: Authorization: Bearer <token>
Content-Type: application/json

{
  "name": "Updated Name",
  "status": "Paid"
}
```

#### Delete Bill
```
DELETE /api/bills/:id
Header: Authorization: Bearer <token>
```

### Cash Endpoints

#### Get All Cash Records
```
GET /api/cash
Header: Authorization: Bearer <token>
```

#### Create Cash Record
```
POST /api/cash
Header: Authorization: Bearer <token>
Content-Type: application/json

{
  "amount": 2500,
  "date": "2024-03-10",
  "description": "Salary Deposit"
}
```

#### Delete Cash Record
```
DELETE /api/cash/:id
Header: Authorization: Bearer <token>
```

## Environment Variables

Create a `.env` file with:

```env
# MongoDB
MONGODB_URI=mongodb://localhost:27017/bill-management

# Server
PORT=5000
NODE_ENV=development

# JWT
JWT_SECRET=your-super-secret-key-min-32-chars

# CORS Origins
CORS_ORIGINS=http://localhost:3000,http://localhost:5500
```

## Troubleshooting

### "Cannot connect to server" error in login page
- Make sure backend server is running: `npm start`
- Check that MongoDB is running
- Check CORS settings in server.js

### "MongoDB connection error"
- Install MongoDB locally OR use MongoDB Atlas
- Check MONGODB_URI in .env file
- Make sure MongoDB service is running (if local)

### Port 5000 already in use
- Change PORT in .env file
- Update API_URL in HTML files accordingly

### JWT Token Errors
- Clear browser localStorage: `localStorage.clear()`
- Make sure JWT_SECRET matches between .env and code
- Check token expiration (tokens expire after 7 days)

## Data Safety & Backup

Your data is safely stored in MongoDB:

- **Local MongoDB**: Data stored on your machine
- **MongoDB Atlas**: Data stored in cloud with automatic backup

To backup data:

1. **Using MongoDB Atlas**:
   - Snapshots are automatically created
   - Access backup snapshots in Atlas dashboard

2. **Using Local MongoDB**:
   ```bash
   mongodump --db bill-management --out ./backup
   ```

## Features Coming Soon

- [ ] Bill payment history and tracking
- [ ] Statistical charts and reports
- [ ] Recurring bills automation
- [ ] Email notifications for due bills
- [ ] Mobile app version
- [ ] Budget planning and alerts

## Security Tips

⚠️ **Important for Production**:

1. Change JWT_SECRET to a strong random string
2. Enable HTTPS on your domain
3. Use environment variables for all sensitive data
4. Enable MongoDB Atlas IP whitelist
5. Never commit `.env` file to GitHub
6. Use strong, unique passwords

## License

MIT

## Support

For issues or questions:
1. Check this README
2. Review API endpoints
3. Check browser console for errors (F12)
4. Check server logs in terminal

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make changes
4. Push and create a Pull Request

---

**Happy bill management! 💰**
