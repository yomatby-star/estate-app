from fastapi import APIRouter, Depends
from app.core.firebase_admin import get_firebase_client
from app.schemas.property import PropertyCreateRequest
from app.dependencies.auth import get_current_user

router = APIRouter(prefix="/api/v1/buildingRegister", tags=["buildingRegister"])

@router.post("")
async def create_property_building(request: PropertyCreateRequest, current_user: dict = Depends(get_current_user)):
  db = get_firebase_client()
  data = {
    "uid": current_user["uid"],
    "basic": request.basic.model_dump(),
    "common": request.common.model_dump(),
  }
  db.collection("buildings").document().set(data)
  return {
    "message": "物件登録完了",
    "data": data
  }