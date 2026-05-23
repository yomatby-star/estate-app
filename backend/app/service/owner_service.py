from datetime import datetime, timezone
from app.core.firebase_admin import get_firebase_client
from app.schemas.owner import OwnerCreateRequest

def create_owner(
    request: OwnerCreateRequest,
    uid: str    
):
    db = get_firebase_client()
    owner_ref = db.collection("owners").document()

    now = datetime.now(timezone.utc)

    data = {
        "id": owner_ref.id,
        "building_id": request.buiding_id,
        "uid": uid,
        "ownerName": request.ownerName,
        "ownerAddr": request.ownerAddr,
        "created_at": now,
        "updated_at": now,
    }

    owner_ref.set(data)

    return data
