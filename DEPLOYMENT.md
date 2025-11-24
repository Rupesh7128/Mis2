# Deployment Guide

## ✅ GitHub Setup - COMPLETED
- Repository: https://github.com/Rupesh7128/Mis2
- All code pushed successfully

## 🚀 Vercel Deployment Steps

### 1. Connect to Vercel
1. Go to https://vercel.com/new
2. Sign in with your GitHub account (Rupesh7128)
3. Click "Import Project"
4. Select the `Rupesh7128/Mis2` repository

### 2. Configure Environment Variables
In the Vercel project settings, add these environment variables:

**Required:**
```
VITE_API_KEY=your_gemini_api_key_here
```

**Optional (for OpenAI fallback):**
```
VITE_OPENAI_API_KEY=your_openai_api_key_here
```

### 3. Get Your API Keys

**Gemini API Key (Required):**
- Visit: https://aistudio.google.com/apikey
- Create a new API key
- Copy and paste it as `VITE_API_KEY` in Vercel

**OpenAI API Key (Optional):**
- Visit: https://platform.openai.com/api-keys
- Create a new API key
- Copy and paste it as `VITE_OPENAI_API_KEY` in Vercel

### 4. Deploy
1. Click "Deploy"
2. Wait for the build to complete (2-3 minutes)
3. Your app will be live at: `https://mis2-[random].vercel.app`

### 5. Custom Domain (Optional)
- Go to Project Settings → Domains
- Add your custom domain if you have one

## 📝 Important Notes

- The app requires at least the Gemini API key to function
- OpenAI key is optional and used as a fallback
- All environment variables must be prefixed with `VITE_` for Vite to expose them
- After adding environment variables, redeploy the project

## 🔄 Future Updates

To update your deployed app:
```bash
git add .
git commit -m "Your update message"
git push origin main
```

Vercel will automatically redeploy on every push to the main branch.
