# 🚀 QUICK START GUIDE

## Fastest Way to Get Your Planner Online (15 minutes)

### Step 1: Set Up MongoDB (5 min)

1. Go to https://www.mongodb.com/cloud/atlas/register
2. Sign up for free
3. Create a free cluster (M0 - it's completely free!)
4. Click **"Connect"** → **"Connect your application"**
5. Copy the connection string (looks like: `mongodb+srv://username:password@...`)
6. Replace `<password>` with your database password

### Step 2: Deploy to Render (10 min)

**Why Render?** Free, easy, and perfect for this app!

1. **Push to GitHub**:
   - Create a new repository on GitHub
   - Upload all these files to it
   - Make sure `.env` is NOT uploaded (it's in .gitignore)

2. **Deploy on Render**:
   - Go to https://render.com and sign up
   - Click **"New +"** → **"Web Service"**
   - Connect your GitHub account
   - Select your repository
   
3. **Configure**:
   - **Name**: daily-planner (or whatever you want)
   - **Build Command**: `npm install`
   - **Start Command**: `npm start`
   - Click **"Advanced"** and add these environment variables:
     
     ```
     MONGODB_URI = [paste your MongoDB connection string here]
     JWT_SECRET = [paste any random long string here]
     ```
     
     To generate a JWT_SECRET, you can use: https://www.uuidgenerator.net/

4. Click **"Create Web Service"**

That's it! Your app will be live in a few minutes at `https://your-app-name.onrender.com`

### Step 3: Use Your App! 🎉

1. Visit your Render URL
2. Create an account
3. Start using your planner!
4. Open the same URL on your phone - log in with the same credentials
5. Everything syncs automatically!

---

## Alternative: Test Locally First

If you want to try it on your computer first:

```bash
# 1. Install dependencies
npm install

# 2. Create .env file
cp .env.example .env

# 3. Edit .env and add your MongoDB URI and a random JWT secret

# 4. Run the server
npm start

# 5. Open http://localhost:3000
```

---

## Troubleshooting

**"Can't connect to MongoDB"**
- In MongoDB Atlas, go to "Network Access" → Add IP Address → Allow Access from Anywhere (0.0.0.0/0)

**"App is slow after being inactive"**
- Render free tier sleeps after inactivity. First visit takes ~30 seconds to wake up. Upgrade to paid tier for always-on.

**"Changes not syncing"**
- Check that you're logged in
- Open browser console (F12) and look for errors
- Make sure your MongoDB connection string is correct

---

## Need Help?

- **MongoDB Issues**: Check MongoDB Atlas dashboard → browse collections
- **Deployment Issues**: Check Render logs in the dashboard
- **App Issues**: Open browser console (F12) to see error messages

Enjoy your planner! 📝✨
