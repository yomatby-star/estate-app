# 新規オーナー登録 入力値　
# オーナー名 or 法人名
# 住所

from pydantic import BaseModel, Field

class OwnerData(BaseModel):
    ownerName: str = Field(..., min_length=1)
    ownerAddr: str = Field(..., min_length=1)

class OwnerCreateRequest(BaseModel):
    buiding_id: str = Field(..., min_length=1)
    owner: OwnerData