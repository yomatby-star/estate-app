import os
from uuid import uuid4
from fastapi import UploadFile
from app.core.backblaze import get_b2_client

def upload_building_image(
    file: UploadFile,
    building_id: str
) -> dict:
  client = get_b2_client()
  backet_name = os.getenv("B2_BUCKET_NAME")

  extension = file.filename.split(".")[-1]
  image_key = f"buildings/{building_id}/{uuid4()}.{extension}"
  print("image_key:", image_key)
  
  client.upload_fileobj(
    file.file,
    backet_name,
    image_key,
    ExtraArgs={
      "ContentType": file.content_type
    }
  )

  return {
    "image_key": image_key,
    "file_name": file.filename,
    "content_type": file.content_type,
  }


# 画像削除
def delete_building_image(image_key: str) -> None:
  client = get_b2_client()
  backet_name = os.getenv("B2_BUCKET_NAME")

  client.delete_object(
    Bucket=backet_name,
    Key=image_key,
  )