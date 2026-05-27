from fastapi import FastAPI, Depends
from fastapi.middleware.cors import CORSMiddleware
from app.core.firebase_admin import initialize_firebase_admin
# from app.dependencies.auth import get_current_user
from app.routers.properties import buildingRegister, room, ownerRegister
from app.routers.properties.getProperties import getProperties
from dotenv import load_dotenv

load_dotenv()
app = FastAPI()

initialize_firebase_admin()

app.add_middleware(
  CORSMiddleware,
  allow_origins=["http://localhost:5173"],
  allow_credentials=True,
  allow_methods=["*"],
  allow_headers=["*"],
)

# @app.get("/")
# def health_check():
#   return {"message": "backend is running"}

# @app.get("/me")
# def read_me(current_user: dict = Depends(get_current_user)):
#   return {
#     "message": "authenticated",
#     "user": current_user,
#   }


# 「新規登録　物件・部屋・貸主」
app.include_router(buildingRegister.router)
app.include_router(room.router)
app.include_router(ownerRegister.router)

# 物件リスト　表示
app.include_router(getProperties.router)