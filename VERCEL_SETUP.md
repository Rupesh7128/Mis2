# Vercel Environment Variables Setup

## 🚨 CRITICAL: Your app needs API keys to work!

Your app is deployed but showing "API Configuration Missing" because environment variables aren't set yet.

## Quick Fix (2 minutes):

### Step 1: Get Your Gemini API Key
1. Go to: https://aistudio.google.com/apikey
2. Click "Create API Key"
3. Copy the key (starts with `AIza...`)

### Step 2: Add to Vercel (Choose ONE method)

#### Method A: Via Dashboard (Easiest)
1. Go to: https://vercel.com/rupesh-kumars-projects-8be3cf82/mis2-ai-resume/settings/environment-variables
2. Click "Add New"
3. Enter:
   - **Key**: `VITE_API_KEY`
   - **Value**: Paste your Gemini API key
   - **Environment**: Select all (Production, Preview, Development)
4. Click "Save"
5. Go to "Deployments" tab → Click "..." on latest → "Redeploy"

#### Method B: Via CLI (From Terminal)
```bash
# Add the API key
vercel env add VITE_API_KEY production

# When prompted, paste your Gemini API key

# Redeploy
vercel --prod
```

### Step 3: Test Your App
Visit: https://mis2-ai-resume-kd6mu1bae-rupesh-kumars-projects-8be3cf82.vercel.app

## Optional: Add OpenAI Fallback
If you want OpenAI as a backup:
1. Get key from: https://platform.openai.com/api-keys
2. Add as `VITE_OPENAI_API_KEY` (same process as above)

## Troubleshooting
- **Still seeing error?** Make sure you redeployed after adding the variable
- **Wrong key format?** Gemini keys start with `AIza`, OpenAI keys start with `sk-`
- **Need help?** Check the browser console (F12) for detailed error messages
