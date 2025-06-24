# CollabSpot - Render Free Tier Deployment

## 🆓 Deploy to Render Free Tier

This guide shows you how to deploy CollabSpot on Render's **completely free tier** without needing payment details.

### 🎯 Free Tier Limitations & Solutions

**What's Free:**
- ✅ Web services (with 750 hours/month)
- ✅ PostgreSQL database (100MB storage)
- ✅ Static sites
- ✅ HTTPS certificates

**What's Not Free (and our solutions):**
- ❌ Persistent disk storage → **Solution**: Use temporary storage (files reset on restart)
- ❌ Always-on services → **Solution**: Services sleep after 15min inactivity (wake up on request)

### 🚀 Option 1: Blueprint Deployment (Updated for Free Tier)

1. **Push Updated Code:**
```bash
git add .
git commit -m "Update for free tier deployment"
git push origin main
```

2. **Deploy via Blueprint:**
   - Go to [render.com](https://render.com)
   - Click **"New +"** → **"Blueprint"**
   - Connect GitHub and select your repo
   - The updated `render.yaml` won't ask for payment!

### 🚀 Option 2: Manual Deployment (Recommended for Free Tier)

#### Step 1: Create PostgreSQL Database
1. In Render dashboard: **"New +"** → **"PostgreSQL"**
2. Name: `collabspot-db`
3. Database: `collabspot`
4. User: `collabspot_user`
5. Region: Choose closest to you
6. Plan: **Free**
7. Click **"Create Database"**

#### Step 2: Deploy Backend
1. **"New +"** → **"Web Service"**
2. Connect your GitHub repo
3. Configure:
   - **Name**: `collabspot-backend`
   - **Environment**: `Node`
   - **Region**: Same as database
   - **Branch**: `main`
   - **Root Directory**: `Backend`
   - **Build Command**: `npm install && npx prisma generate && npx prisma migrate deploy`
   - **Start Command**: `npm start`
   - **Plan**: **Free**

4. **Environment Variables:**
   - `NODE_ENV` = `production`
   - `DATABASE_URL` = (Copy from your database's "Internal Database URL")

5. Click **"Create Web Service"**

#### Step 3: Deploy Frontend
1. **"New +"** → **"Static Site"**
2. Connect your GitHub repo
3. Configure:
   - **Name**: `collabspot-frontend`
   - **Branch**: `main`
   - **Root Directory**: `Frontend`
   - **Build Command**: `npm install && npm run build`
   - **Publish Directory**: `dist`

4. **Environment Variables:**
   - `VITE_API_URL` = `https://your-backend-name.onrender.com`

5. Click **"Create Static Site"**

### 🌐 Your Live URLs

After deployment:
- **Frontend**: `https://collabspot-frontend.onrender.com`
- **Backend**: `https://collabspot-backend.onrender.com`
- **API Test**: `https://collabspot-backend.onrender.com/api/domains`

### ⚠️ Free Tier Considerations

#### File Uploads
- **Storage**: Temporary (files lost on service restart)
- **Solution**: For production, consider upgrading or using external storage (AWS S3, Cloudinary)
- **Development**: Works fine for testing

#### Service Sleep
- **Issue**: Backend sleeps after 15min inactivity
- **Impact**: First request after sleep takes ~30 seconds
- **Solution**: Use a service like UptimeRobot to ping every 14 minutes (optional)

#### Database Limits
- **Storage**: 100MB free
- **Connections**: Limited
- **Solution**: Adequate for development and small projects

### 🔧 Keeping Your App Awake (Optional)

To prevent your backend from sleeping:

1. Sign up for [UptimeRobot](https://uptimerobot.com) (free)
2. Add HTTP monitor:
   - URL: `https://your-backend-name.onrender.com`
   - Interval: 5 minutes
3. This keeps your app responsive

### 🚨 Troubleshooting Free Tier

#### "Service Unavailable" Error
- **Cause**: Service is waking up from sleep
- **Solution**: Wait 30-60 seconds and refresh

#### Database Connection Issues
- **Check**: DATABASE_URL environment variable
- **Verify**: Database is in same region as backend
- **Fix**: Restart the backend service

#### Build Failures
- **Node Version**: Ensure compatibility (Render uses Node 18 by default)
- **Dependencies**: Check all packages are in package.json
- **Logs**: Check build logs in Render dashboard

#### File Upload Issues
- **Remember**: Files are temporary on free tier
- **Test**: Upload small files first
- **Limit**: Keep uploads under 10MB

### 📈 Upgrading Later

When ready to upgrade:
1. **Persistent Storage**: $5/month for file uploads
2. **Always-On Services**: $7/month per service
3. **More Database Storage**: $15/month for 1GB

### 🎉 Success!

Your CollabSpot app is now live on the internet for **FREE**! 

**Perfect for:**
- ✅ Demos and portfolios
- ✅ Testing and development
- ✅ Small-scale usage
- ✅ Learning and experimentation

### 💡 Pro Tips

1. **First Load**: Always allow 30-60 seconds for initial wake-up
2. **Database**: Monitor usage in Render dashboard
3. **Logs**: Check service logs for any issues
4. **Updates**: Git push automatically redeploys
5. **Custom Domain**: Free custom domains available!

---

**Happy Free Hosting! 🎉** 