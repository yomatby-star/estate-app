from fastapi import Depends, HTTPException, status
from fastapi.security import HTTPAuthorizationCredentials, HTTPBearer
from firebase_admin import auth

security = HTTPBearer()

def get_current_user(credentials: HTTPAuthorizationCredentials = Depends(security)) -> dict:
  if credentials.scheme.lower() != "bearer":
    raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="invalid authenttication scheme",)

  token = credentials.credentials
  print("token", token)

  try: 
    decoded_token = auth.verify_id_token(token)
    return {
      "uid": decoded_token["uid"],
      "email": decoded_token["email"]
    }
  except Exception:
    raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="invalid or expired token")