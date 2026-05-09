# from fastapi import APIRouter
# from app.core.firebase_admin import get_firebase_client

# router = APIRouter(prefix="/api/v1/buildingRegister", tags=["buildingRegister"])

# @router.post("test")
# async def create_test_buildingRegister():
#   db = get_firebase_client()
#   uid = "test-user-01"
#   data = {
#     "basic": {
#       "name": "新宿マンション",
#       "addr": "東京都新宿区1-1-1"
#     },
#     "common": {
#       "structure": "RC"
#     }
#   }
#   doc_ref = db.collection("users").document(uid).collection("test_building_register").document()
#   doc_ref.set(data)

#   return {
#     "id": doc_ref.id,
#     "message": "Firestoreに保存しました"
#   }