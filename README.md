# Acorn

Integrated student information system for every school in the US to deliver the best student outcomes at the lowest cost.

## Project Structure

```
acorn/
├── backend/        # FastAPI Python backend
└── frontend/       # React + TypeScript frontend (Vite)
```

## Getting Started

### Backend

```bash
cd backend
python -m venv .venv
source .venv/bin/activate
pip install -r requirements.txt
cp .env.example .env
uvicorn app.main:app --reload
```

### Frontend

```bash
cd frontend
npm install
npm run dev
```
