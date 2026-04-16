from pathlib import Path
import firebase_admin
print("Sacces!!")
from firebase_admin import credentials

BASE_DIR = Path(__file__).resolve().parents[2]
print("BASE_DIR", BASE_DIR)
SERVICE_ACCOUNT_PATH = BASE_DIR / "secrets" / "estate-project-ca51b-firebase-adminsdk-fbsvc-fb866b857e.json"
print("SERVICE_ACCOUNT_PATH", SERVICE_ACCOUNT_PATH)

def initialize_firebase_admin() -> None:
  if firebase_admin._apps:
    return
  
  cred = credentials.Certificate(str(SERVICE_ACCOUNT_PATH))
  firebase_admin.initialize_app(cred)