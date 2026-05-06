from fastapi import FastAPI, Depends
from fastapi.middleware.cors import CORSMiddleware
from app.core.firebase_admin import initialize_firebase_admin
from app.dependencies.auth import get_current_user

app = FastAPI()

initialize_firebase_admin()

app.add_middleware(
  CORSMiddleware,
  allow_origins=["http://localhost:5173"],
  allow_credentials=True,
  allow_methods=["*"],
  allow_headers=["*"],
)

@app.get("/")
def health_check():
  return {"message": "backend is running"}

@app.get("/me")
def read_me(current_user: dict = Depends(get_current_user)):
  return {
    "message": "authenticated",
    "user": current_user,
  }