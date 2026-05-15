# HomeLab Dashboard

A simple homelab monitoring dashboard built with:

- React (Frontend)
- FastAPI (Backend)

---

## 🚀 Startup

### ▶ Recommended (One command)

```powershell
.\start-dev.bat
```
This starts both frontend and backend automatically.

### ▶ Manual startup (for debugging)

#### Frontend

```powershell
cd frontend
npm install
npm run dev
```

Frontend URL:

```txt
http://localhost:5173
```

#### Backend

```powershell
cd backend
.\venv\Scripts\activate
uvicorn main:app --reload
```

Backend URL:
```txt
http://127.0.0.1:8000
```

Endpoints:
- GET /status

---

## Current Features

- Display CPU usage
- Display memory usage
- React dashboard card UI
- FastAPI API integration

---

## 🛠️ Tech Stack

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