# Quick Start Guide - Bill Management System

Follow these steps to get your application running in 5 minutes!

## 🚀 Quick Start (Local Development)

### 1. Install Node.js
Download from: https://nodejs.org/ (LTS version)

### 2. Open Terminal in Your Project Folder
```bash
cd "C:\Users\ASUS\Desktop\Bill managemnt"
```

### 3. Install Dependencies
```bash
npm install
```

### 4. Create .env File
```bash
cp .env.example .env
```

Open `.env` and make sure it has:
```
MONGODB_URI=mongodb://localhost:27017/bill-management
JWT_SECRET=your-secret-key-123
PORT=5000
```

### 5. Start MongoDB (if using local)
**Option A: Using MongoDB locally**
- Download from: https://www.mongodb.com/try/download/community
- Install and start MongoDB service

**Option B: Using MongoDB Atlas (Cloud - Recommended)**
- Go to: https://www.mongodb.com/cloud/atlas
- Create free account
- Create a cluster
- Copy connection string
- Paste into `.env` MONGODB_URI

### 6. Start Backend Server
```bash
npm start
```

You should see: `Server is running on http://localhost:5000`

### 7. Open Frontend in Browser
- Open `login.html` file directly, OR
- Use VS Code Live Server (right-click on HTML file → Open with Live Server)

### 8. Create Account & Test
- Click "Register"
- Create a new account
- Add bills and cash records
- See statistics update in real-time

---

## 🌐 Deploy to GitHub (Free Hosting)

### Step 1: Create GitHub Repository

Go to https://github.com/new and create new repository:
- Name: `Bill-Management-System`
- Description: "Full stack bill management with login and database"
- Make it **Public**
- Click "Create repository"

### Step 2: Upload Code to GitHub

```bash
cd "C:\Users\ASUS\Desktop\Bill managemnt"

git init
git config user.name "Your Name"
git config user.email "your.email@example.com"
git add .
git commit -m "Initial commit: Bill Management System"
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/Bill-Management-System.git
git push -u origin main
```

### Step 3: Deploy Backend to Railway (Easiest!)

1. Go to https://railway.app
2. Click "New Project"
3. Connect GitHub (authorize if needed)
4. Select your `Bill-Management-System` repository
5. Click "Deploy Now"
6. Add environment variables:
   - Go to Variables tab
   - Add:
     ```
     MONGODB_URI=mongodb+srv://user:password@cluster.mongodb.net/bill-management
     JWT_SECRET=your-secret-key-min-32-chars
     ```
   - Click "Deploy"

7. Copy your Railway URL (like `https://your-app.railway.app`)

### Step 4: Update Frontend API URLs

Edit both `login.html` and `dashboard.html`:

Find this line:
```javascript
const API_URL = 'http://localhost:5000/api';
```

Replace with:
```javascript
const API_URL = 'https://your-railway-url.railway.app/api';
```

### Step 5: Deploy Frontend to GitHub Pages

Go to your GitHub repository → Settings → Pages:
1. Select Source: `Deploy from a branch`
2. Select Branch: `main`
3. Select Folder: `/ (root)`
4. Click Save

Your app will be live at: `https://YOUR_USERNAME.github.io/Bill-Management-System/`

Visit the `login.html` URL to test your complete system!

---

## 📊 Using the System

### Dashboard Components:

**Statistics Cards**:
- **Total Cash**: Your available balance
- **Total Bills**: All bills (paid + pending)
- **Total Loans**: Pending bills only
- **Net Balance**: Cash minus pending bills

**Add Bill Form**:
- Fill all fields
- Select category (Rent, Utilities, Food, etc.)
- Set status (Pending or Paid)
- Click "Add Bill"

**Bills Table**:
- Shows all your bills
- Sort by due date
- View status at a glance
- Edit or delete bills

**Add Cash Form**:
- Record income or available cash
- Add date and description
- System automatically updates total

**Cash Table**:
- All cash records
- Delete as needed
- Newest first

---

## 🔒 Login & Security

**Remember**:
- Each user account is separate
- Bills and cash are private to your login
- Passwords are encrypted in database
- Logout to clear local session

---

## 💾 Your Data is Safe

**Local MongoDB**:
- Data stored on your computer
- You own all data

**MongoDB Atlas (Cloud)**:
- Data stored securely in clouds
- Automatic backups
- Access from anywhere

---

## ❌ Troubleshooting

**Issue**: "Cannot connect to server in login page"
- **Fix**: Make sure backend is running (`npm start` in terminal)

**Issue**: "MongoDB connection error"
- **Fix**: Check MONGODB_URI in .env file matches your setup

**Issue**: Bills not saving
- **Fix**: Check browser console (F12) for errors

**Issue**: Forgot password
- **Fix**: Currently no password reset. Delete account and register new one (your bills will be deleted too)

---

## 📝 What's Next?

1. ✅ Run locally and test everything works
2. ✅ Upload to GitHub
3. ✅ Deploy backend to Railway
4. ✅ Deploy frontend to GitHub Pages
5. ✅ Share your app URL with others!

---

## 🆘 Need Help?

1. Check console errors (Press F12)
2. Check terminal where backend is running
3. Make sure all .env variables are set
4. Make sure MongoDB is running
5. Review README.md for detailed documentation

---

**You're all set! Your bill management system is ready to use. 🎉**
