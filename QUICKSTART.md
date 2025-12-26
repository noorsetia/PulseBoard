# 🚀 Quick Start Guide - PulseBoard

## Start the Application

```bash
cd /home/navgurukul/PulseBoard/pulseboard-app
npm run dev
```

Then open: **http://localhost:5173**

## Login

Use any username/password combination:
- Username: `demo`
- Password: `demo`

## What to Try

### 1. Create Your First Task
1. Click **"+ New Task"** button
2. Enter a task title and description
3. Click **"Create Task"**

### 2. Manage Task Status
- Click status buttons on any task card to change its state
- Try moving tasks: Pending → In Progress → Done

### 3. Filter Tasks
- Use the tabs: **All Tasks | Pending | In Progress | Done**
- See how the list updates instantly

### 4. View Analytics
1. Click **"Analytics"** in the navigation
2. See real-time charts and statistics
3. Watch insights update as you complete tasks

### 5. Navigate
- **Dashboard** - Overview and quick stats
- **Tasks** - Full task management
- **Analytics** - Charts and insights

## Features at a Glance

✅ **Create** tasks instantly
✅ **Update** task status with one click  
✅ **Delete** tasks (with confirmation)  
✅ **Filter** by status  
✅ **View** analytics in real-time  
✅ **Persistent** data (saved to localStorage)

## Project Structure

```
pulseboard-app/
├── src/
│   ├── features/          # Auth, Tasks, Analytics
│   ├── components/        # Reusable UI components
│   ├── pages/             # Page components
│   └── app/               # Redux store
└── public/                # Static assets
```

## Tech Stack

- React 18 + Vite
- Redux Toolkit
- React Router
- Tailwind CSS v4
- Recharts

## Need Help?

Check the full documentation:
- **README.md** - Project overview
- **PROJECT_SUMMARY.md** - Complete implementation details
- **pulseboard-app/README.md** - App-specific docs

---

**Enjoy using PulseBoard!** 🎯
