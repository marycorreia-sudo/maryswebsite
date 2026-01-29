# Daily Planner - Full Stack App

A beautiful, cross-device syncing daily planner with authentication and cloud storage.

## Features

- 🔐 User authentication (login/register)
- ☁️ Cloud sync across all your devices
- 📱 Works on phone, tablet, and desktop
- 📅 Daily schedule, to-do lists, goals, and journal
- 📊 Weekly planning view
- 📁 Archive of all past days
- 🖼️ Customizable hero image
- 🎨 Beautiful dark theme with elegant design

## Tech Stack

- **Frontend**: HTML, CSS, JavaScript (Vanilla)
- **Backend**: Node.js + Express
- **Database**: MongoDB
- **Authentication**: JWT (JSON Web Tokens)

## Setup Instructions

### Prerequisites

- Node.js (v18 or higher)
- MongoDB account (free tier available at MongoDB Atlas)

### Step 1: Install Dependencies

```bash
npm install
```

### Step 2: Set Up MongoDB

1. Go to [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
2. Create a free account
3. Create a new cluster (free tier is fine)
4. Click "Connect" → "Connect your application"
5. Copy the connection string

### Step 3: Configure Environment Variables

1. Copy `.env.example` to `.env`:
```bash
cp .env.example .env
```

2. Edit `.env` and add your values:
```env
MONGODB_URI=mongodb+srv://your-username:your-password@your-cluster.mongodb.net/daily-planner
JWT_SECRET=your-random-secret-key-here
PORT=3000
```

**Important**: Generate a strong random string for `JWT_SECRET`. You can use this command:
```bash
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
```

### Step 4: Run Locally

```bash
npm start
```

Visit `http://localhost:3000` in your browser!

## Deployment

### Option 1: Deploy to Render (Recommended - Free!)

1. Push your code to GitHub
2. Go to [Render.com](https://render.com) and sign up
3. Click "New +" → "Web Service"
4. Connect your GitHub repository
5. Configure:
   - **Build Command**: `npm install`
   - **Start Command**: `npm start`
6. Add environment variables:
   - `MONGODB_URI` - Your MongoDB connection string
   - `JWT_SECRET` - Your secret key
7. Click "Create Web Service"

Your app will be live at `https://your-app-name.onrender.com`!

### Option 2: Deploy to Railway

1. Push your code to GitHub
2. Go to [Railway.app](https://railway.app) and sign up
3. Click "New Project" → "Deploy from GitHub repo"
4. Select your repository
5. Add environment variables in the "Variables" tab
6. Deploy!

### Option 3: Deploy to Fly.io

1. Install Fly CLI: `https://fly.io/docs/hands-on/install-flyctl/`
2. Run `fly launch`
3. Set secrets:
```bash
fly secrets set MONGODB_URI="your-mongodb-uri"
fly secrets set JWT_SECRET="your-secret-key"
```
4. Deploy: `fly deploy`

## Project Structure

```
daily-planner/
├── server.js           # Backend API server
├── package.json        # Dependencies
├── .env.example        # Environment variables template
├── public/
│   └── index.html      # Frontend app
└── README.md          # This file
```

## API Endpoints

- `POST /api/register` - Create new account
- `POST /api/login` - Log in
- `GET /api/verify` - Verify token
- `GET /api/planner` - Get all planner data
- `POST /api/planner` - Update planner data

## Usage

1. **Create an account** - Sign up with your email and password
2. **Log in** on any device with the same credentials
3. **Your data syncs automatically** - Changes save within 1 second
4. **Access anywhere** - Use the same URL on phone, tablet, laptop

## Security Notes

- Passwords are hashed with bcrypt
- JWT tokens expire after 30 days
- All API requests require authentication
- Never commit your `.env` file

## Troubleshooting

**Can't connect to database**
- Check your MongoDB Atlas IP whitelist (allow all IPs: 0.0.0.0/0)
- Verify your connection string is correct

**Data not syncing**
- Check browser console for errors
- Make sure you're logged in
- Verify your backend is running

**Deployment issues**
- Ensure environment variables are set correctly
- Check deployment logs for errors
- Make sure MongoDB Atlas allows connections from your hosting provider

## Support

For issues or questions, check:
- MongoDB Atlas documentation
- Render/Railway deployment guides
- Node.js and Express documentation

## License

MIT License - feel free to use and modify!
