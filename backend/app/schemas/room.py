from pydantic import BaseModel, Field

class RoomData(BaseModel):
  roomNumber: int = Field(..., ge=1)
  rent: int = Field(..., ge=0)
  status: str = Field(default="vacant")

class RoomCreateRequest(BaseModel):
  building_id: str = Field(..., min_length=1)
  room: RoomData