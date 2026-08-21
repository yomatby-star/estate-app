import json
import logging
from fastapi import APIRouter, Depends, HTTPException, Form, File, UploadFile
from app.dependencies.auth import get_current_user
from app.schemas.property import PropertyCreateRequest, PropertyUpdateRequest
from app.service.building_service import create_building, update_building

# from app.dependencies.auth import get_current_user

logger = logging.getLogger(__name__)
router = APIRouter(prefix="/api/v1/buildingRegister", tags=["buildingRegister"])


@router.post("")
async def create_property_building(
  payload: str = Form(...),
  file: UploadFile | None = File(None),
  current_user: dict = Depends(get_current_user)
):
  try: 
    request = PropertyCreateRequest(**json.loads(payload))

    data = create_building(
      request=request, 
      uid=current_user["uid"],
      file=file,
    )

    return {
      "message": "物件登録完了",
      "data": data
    }
  
  except Exception:
    logger.exception("物件登録処理でエラーが発生しました")
    raise HTTPException (
      status_code=500,
      detail="物件登録に失敗しました"
    )


@router.put("/{building_id}")
async def update_property_building(
  building_id: str,
  payload: str = Form(...),
  files: list[UploadFile] = File(default=[]),
  current_user: dict = Depends(get_current_user)
):
  try:
    request = PropertyUpdateRequest(**json.loads(payload))

    data = update_building(
      building_id=building_id,
      request=request,
      files=files,
    )

    return {
      "message": "物件更新完了",
      "data": data
    }

  except Exception:
    logger.exception("物件更新処理でエラーが発生しました")
    raise HTTPException (
      status_code=500,
      detail="物件更新に失敗しました"
    )

