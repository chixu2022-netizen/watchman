# Enable Supabase Authentication

## Step 1: Go to Supabase Dashboard
1. Visit https://supabase.com
2. Select your project: **nzugwnffhegzbtfwjffn**
3. Click **Authentication** in left sidebar

## Step 2: Enable Email Auth
1. Go to **Providers** tab
2. Find **Email**
3. Make sure it's **ENABLED** (toggle should be ON)
4. **IMPORTANT:** Uncheck "Confirm email" for testing
   - Or check your email for confirmation link

## Step 3: Check Auth Settings
Go to **Settings** → **Authentication** and verify:
- ✅ Enable email signups: **ON**
- ✅ Enable email confirmations: **OFF** (for testing)
- Site URL: `http://localhost:3000`

## Step 4: Test Again
After enabling, restart your app:
```bash
npm start
```

Then try signup at http://localhost:3000/signup
