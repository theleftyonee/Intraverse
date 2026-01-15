# Intraverse Tech - Premium Landing Page

A modern, premium landing page built with React and FastAPI, featuring a sophisticated black/grey color scheme with dark pink accents.

## Features

- 🎨 Premium black/grey color scheme with dark pink highlights
- 🖱️ Custom animated cursor with background effects
- ✨ Scroll-triggered animations
- 🎯 Animated word highlights with dark pink text
- 🎠 Projects carousel with navigation
- 💳 Stacked testimonials with 3D animations
- 📱 Fully responsive design

## Tech Stack

### Frontend
- React 19
- Tailwind CSS
- shadcn/ui components
- Lucide React icons
- Custom animations

### Backend
- FastAPI
- MongoDB (Motor)
- Python 3.12+

## Deployment on Vercel

### Prerequisites
1. Vercel account (sign up at [vercel.com](https://vercel.com))
2. MongoDB connection string (for backend API - optional)

### Steps to Deploy

1. **Push to GitHub/GitLab/Bitbucket**:
   - Make sure your code is pushed to a Git repository

2. **Deploy via Vercel Dashboard**:
   - Go to [vercel.com/new](https://vercel.com/new)
   - Import your Git repository
   - **Important**: Set the **Root Directory** to `frontend` in project settings
   - Vercel will auto-detect React and build the frontend

3. **Set Environment Variables** in Vercel Dashboard (Settings → Environment Variables):
   - `MONGO_URL`: Your MongoDB connection string (if using API)
   - `DB_NAME`: Database name (default: `intraverse`)
   - `CORS_ORIGINS`: Allowed origins (e.g., `https://your-domain.vercel.app`)

4. **Configure Project Settings**:
   - **Root Directory**: `frontend`
   - **Build Command**: `npm run build` (or leave default)
   - **Output Directory**: `build`

5. **Deploy**:
   - Click "Deploy"
   - Vercel will automatically build and deploy
   - The frontend will be served as static files
   - The API will be available at `/api/*` (if configured)

### Alternative: Deploy Frontend Only (Recommended)

For simplicity, you can deploy just the frontend:
1. Set Root Directory to `frontend`
2. Deploy normally
3. The API can be deployed separately or hosted elsewhere

### Project Structure
```
.
├── frontend/          # React application
│   ├── src/
│   ├── public/
│   ├── package.json
│   └── vercel.json
├── api/              # FastAPI serverless functions
│   ├── index.py
│   └── requirements.txt
├── backend/          # Original backend (for local dev)
├── vercel.json       # Vercel configuration
└── package.json      # Root package.json
```

## Local Development

### Frontend
```bash
cd frontend
npm install
npm start
```

### Backend
```bash
cd backend
pip install -r requirements.txt
uvicorn server:app --reload
```

## Environment Variables

Create a `.env` file in the `backend` directory:
```
MONGO_URL=mongodb://localhost:27017
DB_NAME=intraverse
CORS_ORIGINS=http://localhost:3000,http://localhost:3001
```

## License

ISC
