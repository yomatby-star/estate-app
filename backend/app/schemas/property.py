from pydantic import BaseModel, Field

class PropertyBasic(BaseModel):
  name: str = Field(..., min_length=1)

class PropertyCommon(BaseModel):
  addr: str = Field(..., min_length=1)
  structure: str = ""
  # mansionType: str = ""
  # local: str = ""
  # station: str = ""
  # year: int
  # floors: int
  # autoLock: bool
  # gas: str = ""
  # garbage: str = ""

class PropertyCreateRequest(BaseModel):
  basic: PropertyBasic
  common: PropertyCommon