# How to update your website (no coding needed!)

Hi Bhawana! 👋 This is your guide to updating the website yourself.

## 1. Open the admin dashboard

1. Go to **your-website.com/admin** (while testing on this computer: `http://localhost:3000/admin`)
2. Enter your password.
3. You'll see the dashboard with big cards — each card is one part of the website.

> **Your password** is stored in the file `.env.local` (the line `ADMIN_PASSWORD=...`).
> Please change it from the default before the site goes live, and keep it secret.

## 2. The golden rules

- **Nothing changes until you press Save.** Feel free to explore.
- **Changes go live about a minute after Save.** Open the website in another tab and refresh to see them.
- Every form field has a small grey hint explaining what it's for.
- Use the **↑ ↓ buttons** to change the order things appear on the website.

## 3. Common tasks

### Write a new blog post
Dashboard → **Journal / Blog** → **＋ Add new** → fill in the title, date, category →
upload a cover picture → write your story → **Save**. Done — it's live!

Writing tips for the story box:
- Leave an **empty line** between paragraphs.
- Start a line with `## ` to make a **heading** (e.g. `## Day one in Palpa`).
- Start lines with `- ` to make a **bullet list**.

### Change a project's pictures
Dashboard → **Projects** → **✏️ Edit** on the project →
- **Cover picture**: press "📷 Choose picture" and pick a file from your computer.
- **Project gallery**: press "📷 Add pictures" (you can select many at once), then write a caption under each. Use ↑↓ to reorder.
- Press **💾 Save**.

### Update your photo, bio, or CV
Dashboard → **About & Profile**. Change what you need, press **Save everything** at the bottom.
To update the CV, upload the new PDF in the "Your CV" field.

### Add a pin to the map
Dashboard → **Map Locations** → **＋ Add new**.
To get coordinates: open Google Maps, **right-click** the exact spot, click the numbers that pop up
(they are copied automatically), then paste — the first number is Latitude, the second is Longitude.

### Read messages from visitors
Dashboard → **Messages**. Press "↩ Reply by email" to answer from your email app.

## 4. Pictures — quick advice

- **JPG** is best for photos; keep each under ~1.5 MB for a fast website.
  (On your phone, sharing a photo at "Large" size instead of "Original" is usually perfect.)
- Landscape (wide) pictures look best for project covers and journal covers.
- Always write captions — they also help people using screen readers and Google.

## 5. Backup

All your words live in the `content` folder and all your uploaded pictures in the `uploads` folder.
Copying those two folders (e.g. to Google Drive) is a complete backup of your website's content.

## 6. Running the site on this computer (for the developer)

```
npm install     # first time only
npm run dev     # development — http://localhost:3000
npm run build   # build for production
npm start       # run the production site
```

Deployment (Vercel): the site is hosted on Vercel, which has no writable disk,
so when `GITHUB_TOKEN` and `GITHUB_REPO` are set, the admin dashboard saves
content and uploads by committing them to the GitHub repo. Each content save
triggers a Vercel rebuild (~1 minute). Uploads and messages are committed with
`[skip deploy]` in the message, which `vercel.json` uses to skip the rebuild.

Environment variables to set in Vercel:
- `ADMIN_PASSWORD` — the admin login password
- `SESSION_SECRET` — any long random text
- `GITHUB_TOKEN` — fine-grained GitHub token with Contents: Read and write on this repo only
- `GITHUB_REPO` — e.g. `quietdraft3-afk/Bhawana`
- `GITHUB_BRANCH` — optional, defaults to `main`
- `SITE_URL` — optional, defaults to https://bhawanaaryal.com.np

Because the dashboard commits to GitHub, run `git pull` before changing code
locally so you don't overwrite Bhawana's edits.

Without the GitHub variables (e.g. when running locally), everything is saved
to the `content` and `uploads` folders on disk instead.
