# HomeLab Dashboard

A simple homelab monitoring dashboard built with:

- React (Frontend)
- FastAPI (Backend)

---

## Frontend Startup

### Move to frontend

```powershell
cd frontend
```

### Install dependencies

```powershell
npm install
```

### Start development server

```powershell
npm run dev
```

Frontend URL:

```txt
http://localhost:5173
```

---

## Backend Startup

### Move to backend

```powershell
cd backend
```

### Activate virtual environment

```powershell
.\venv\Scripts\activate
```

### Start FastAPI server

```powershell
uvicorn main:app --reload
```

Backend URL:

```txt
http://127.0.0.1:8000
```

API Endpoint:

```txt
http://127.0.0.1:8000/status
```

---

## Current Features

- Display CPU usage
- Display memory usage
- React dashboard card UI
- FastAPI API integration

---

## Tech Stack

### Frontend

- React
- Vite
- CSS

### Backend

- FastAPI
- Uvicorn
- psutil

---

## Git Commands

```powershell
git add .
git commit -m "message"
git push
```