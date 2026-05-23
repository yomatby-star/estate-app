import logging
from fastapi import APIRouter, Depends, status, HTTPException
from app.schemas.owner import OwnerCreateRequest
from app.dependencies.auth import get_current_user
from app.service.owner_service import create_owner

logger = logging.getLogger(__name__)
router = APIRouter(prefix="/api/v1/ownerRegister", tags=["ownerRegister"])

@router.post("", status_code=status.HTTP_201_CREATED)
async def create_property_owner(
    request: OwnerCreateRequest,
    current_user: dict = Depends(get_current_user)
) -> dict:
    try:
        data = create_owner(
            request,
            uid=current_user["uid"]
        )

        return {
            "message": "オーナー登録成功",
            "data": data
        }

    except Exception:
        logger.exception("オーナー登録処理でエラーが発生しました")
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail="オーナー登録に失敗しました"
        )
