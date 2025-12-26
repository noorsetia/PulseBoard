# PulseBoard App

The complete PulseBoard application built with React + Vite.

## Features

✅ Authentication with protected routes  
✅ Task management (Create, Update, Delete)  
✅ Task status transitions (Pending → In Progress → Done)  
✅ Analytics dashboard with charts  
✅ Feature-based architecture  
✅ Redux Toolkit for state management  
✅ Tailwind CSS for styling  
✅ Responsive design  

## Getting Started

### Install Dependencies

```bash
npm install
```

### Run Development Server

```bash
npm run dev
```

The app will be available at `http://localhost:5173`

### Build for Production

```bash
npm run build
```

### Preview Production Build

```bash
npm run preview
```

## Login

Enter any username and password to login (mock authentication).

## Project Structure

```
src/
├── app/              # Redux store configuration
├── features/         # Feature modules (auth, tasks, analytics)
│   ├── auth/
│   ├── tasks/
│   └── analytics/
├── components/       # Reusable components
│   ├── common/       # Button, Card, Input, etc.
│   └── layout/       # Layout component
├── pages/            # Page components
├── routes/           # Route configuration
├── services/         # API services
└── utils/            # Constants and utilities
```

## Technology Stack

- **React 18** - UI library
- **Vite** - Build tool
- **Redux Toolkit** - State management
- **React Router** - Routing
- **Tailwind CSS v4** - Styling
- **Recharts** - Data visualization

## Key Features Details

### Authentication
- Mock authentication service
- Persistent login with localStorage
- Protected routes using route guards

### Task Management
- Create tasks with title and description
- Update task status (Pending, In Progress, Done)
- Delete tasks
- Filter tasks by status
- Real-time state updates

### Analytics
- Live statistics (Total, Pending, In Progress, Done)
- Bar chart for status distribution
- Pie chart for completion overview
- Intelligent insights based on task data

### Design Philosophy
- Clean, minimal UI
- Focus-first interaction design
- Immediate visual feedback
- Calm color palette
- No unnecessary confirmations
