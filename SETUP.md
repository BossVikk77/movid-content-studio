# Movid Academy — GitHub Pages Setup Guide

Your content studio is a single HTML file. GitHub Actions injects your API keys at deploy time, so they never appear in source code. Here's how to go live in about 10 minutes.

---

## Step 1 — Create a Private GitHub Repo

1. Go to https://github.com/new
2. Name it something like `movid-content-studio`
3. Set visibility to **Private**
4. Click **Create repository**

---

## Step 2 — Push Your Files

Open Terminal (or Git Bash on Windows) in the `Trial` folder:

```bash
git init
git add movid-academy.html .github/ .gitignore .env.example
git commit -m "Initial commit — Movid Academy Content Studio"
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/movid-content-studio.git
git push -u origin main
```

Replace `YOUR_USERNAME` with your GitHub username.

---

## Step 3 — Add GitHub Secrets (Your API Keys)

Go to your repo on GitHub → **Settings** → **Secrets and variables** → **Actions** → **New repository secret**

Add these three secrets:

| Secret Name | Value |
|-------------|-------|
| `GROQ_KEY`  | Your Groq API key (from console.groq.com/keys) |
| `HCTI_UID`  | Your HCTI User ID (from htmlcsstoimage.com) |
| `HCTI_KEY`  | Your HCTI API Key |

---

## Step 4 — Enable GitHub Pages

1. Go to your repo → **Settings** → **Pages**
2. Under **Source**, select **GitHub Actions**
3. Click Save

---

## Step 5 — Trigger a Deploy

Either:
- Push any change to the `main` branch, OR
- Go to **Actions** tab → click `Deploy Movid Academy to GitHub Pages` → click **Run workflow**

Your site will be live at:
```
https://YOUR_USERNAME.github.io/movid-content-studio/movid-academy.html
```

Bookmark that URL — it's your private content studio link.

---

## Step 6 (Optional) — Make.com Scheduled Posting

To enable the **Schedule via Make** button in your app:

1. Create a free account at https://make.com
2. Create a new Scenario with a **Webhooks → Custom webhook** trigger
3. Add actions for Facebook Pages, Instagram, and LinkedIn posting
4. Copy the webhook URL
5. Paste it into the **Settings** page of your content studio

Now when you click "Schedule via Make" on any generated post, it sends the caption, schedule date, and platform content to Make automatically.

---

## Updating Your App

Whenever you want to update the app:

```bash
git add movid-academy.html
git commit -m "Update: [describe your change]"
git push
```

GitHub Actions will automatically redeploy within ~60 seconds.

---

## Security Notes

- Your API keys are stored as **GitHub Secrets** — GitHub employees cannot see them
- They are injected into the HTML only during the build step, not stored in the repo
- The deployed HTML file contains the keys, so keep your Pages URL private (don't share it publicly)
- If you ever suspect a key is compromised, rotate it at the provider and update the GitHub Secret
