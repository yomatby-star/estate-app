from pydantic import BaseModel, Field

class RoomData(BaseModel):
  roomNumber: str = Field(..., min_length=1)
  rent: int = Field(..., ge=0)
  managementFee: int = Field(..., ge=0)
  securityDeposit: int = Field(default=0, ge=0)
  keyMoney: int = Field(default=0, ge=0)
  floorPlan: str = Field(..., min_length=1)
  exclusiveArea: str = Field(..., min_length=1)
  numberFloors: str = Field(..., min_length=1)
  direction: str | None = None
  status: str = Field(default="vacant")
  equipments: list[str] = []
  

class RoomCreateRequest(BaseModel):
  building_id: str = Field(..., min_length=1)
  room: RoomData


class RoomUpdateRequest(BaseModel):
  room: RoomData
  removedImageKeys: list[str] = Field(default_factory=list)