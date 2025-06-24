# CollabSpot Render Deployment Guide

## 🚀 Deploy to Render

This guide will help you deploy your CollabSpot application to Render with both backend API and frontend.

### Prerequisites

1. **GitHub Account**: Your code must be in a GitHub repository
2. **Render Account**: Sign up at [render.com](https://render.com)
3. **Project Prepared**: All configuration files are already set up

### 📋 Pre-Deployment Checklist

- ✅ `render.yaml` file created
- ✅ PostgreSQL configuration updated in Prisma schema
- ✅ Frontend build configuration updated
- ✅ `.gitignore` updated for deployment
- ✅ All changes committed to GitHub

### 🔧 Step-by-Step Deployment

#### Step 1: Push to GitHub

```bash
git add .
git commit -m "Prepare for Render deployment"
git push origin main
```

#### Step 2: Connect to Render

1. Go to [render.com](https://render.com) and sign up/login
2. Click **"New +"** → **"Blueprint"**
3. Connect your GitHub account
4. Select your CollabSpot repository
5. Render will automatically detect the `render.yaml` file

#### Step 3: Configure Environment Variables

The deployment will automatically create:
- **Backend Service**: `collabspot-backend`
- **Frontend Service**: `collabspot-frontend`  
- **PostgreSQL Database**: `collabspot-db`

#### Step 4: Monitor Deployment

1. Watch the build logs for any errors
2. The backend will run database migrations automatically
3. The frontend will build and deploy as a static site

### 🌐 Access Your Application

After successful deployment:
- **Frontend**: `https://collabspot-frontend.onrender.com`
- **Backend API**: `https://collabspot-backend.onrender.com`

### 🗄️ Database Setup

The PostgreSQL database will be automatically:
- Created with the name `collabspot`
- Connected to your backend service
- Migrated with your Prisma schema
- Seeded with initial domain data

### 📁 File Uploads

File uploads are configured with:
- Persistent disk storage (1GB)
- Mounted at `/opt/render/project/src/Backend/uploads`
- Supports PDF, DOCX, and PPTX files

### 🔧 Environment Variables

The following are automatically configured:

**Backend:**
- `NODE_ENV=production`
- `PORT=10000`
- `DATABASE_URL` (from PostgreSQL service)

**Frontend:**
- `VITE_API_URL=https://collabspot-backend.onrender.com`

### 🚨 Troubleshooting

#### Build Failures
- Check build logs in Render dashboard
- Ensure all dependencies are in `package.json`
- Verify Node.js version compatibility

#### Database Issues
- Migration errors: Check Prisma schema syntax
- Connection issues: Verify DATABASE_URL is set correctly

#### File Upload Issues
- Check disk mount configuration
- Verify upload directory permissions
- Ensure file size limits are appropriate

#### API Connection Issues
- Verify CORS settings in backend
- Check API URL configuration in frontend
- Ensure both services are deployed successfully

### 📊 Performance Optimization

**Backend:**
- Runs on Render's free tier (750 hours/month)
- Automatically scales based on traffic
- Database connections are pooled

**Frontend:**
- Served from global CDN
- Cached for fast loading
- Optimized build output

### 🔒 Security Features

- HTTPS enabled by default
- Environment variables encrypted
- Database access restricted to backend service
- File uploads validated and size-limited

### 📝 Updating Your Application

To update your deployed application:

1. Make changes to your code
2. Commit and push to GitHub
3. Render will automatically redeploy

```bash
git add .
git commit -m "Update feature X"
git push origin main
```

### 💡 Next Steps

1. **Custom Domain**: Configure a custom domain in Render dashboard
2. **Monitoring**: Set up alerts and monitoring
3. **Backup**: Configure database backups
4. **Scaling**: Upgrade to paid plans for better performance

### 🆘 Support

- **Render Docs**: [render.com/docs](https://render.com/docs)
- **Community**: [community.render.com](https://community.render.com)
- **Support**: Available through Render dashboard

---

## 🎉 Deployment Complete!

Once deployed, your CollabSpot application will be live and accessible worldwide. The automatic deployments ensure your app stays up-to-date with every GitHub push.

**Happy Deploying! 🚀** 