type Status = "vacant" | "closed" | "applying"
type MansionType = "マンション" | "アパート" | "テナント" | "ビル"
type Structure = "鉄筋コンクリート" | "木造" | "鉄骨" | "軽量鉄骨"

export type Property = {
  id: string;
  basic: {
    name: string;
  };
  common: {
    addr: string;
    structure: Structure;
    mansionType: MansionType;
    local: string;
    station: string;
    garbage: string;
    autoLock: string;
    gas: string;
    floors: string;
    year: string;
  };
  images: {
    content_type: string;
    file_name: string;
    image_key: string;
  }[],
  imageUrl: string,
}

export type Room = {
  id: string;
  uid: string;
  roomNumber: string;
  direction: string;
  status: Status;
  exclusiveArea: string;
  equipments: string[];
  floorPlan: string;
  keyMoney: number;
  managementFee: number;
  numberFloors: string;
  rent: number;
  securityDeposit: number;
  images: [
    {
      content_type: string;
      file_name: string;
      image_key: string;
    }
  ];
  imageUrls?: string[]
};

// 部屋詳細type
export type RoomForm = {
  roomNumber: string
  floorPlan: string
  exclusiveArea: string
  numberFloors: string
  direction: string
  status: string
  rent: string
  managementFee: string
  keyMoney: string
  securityDeposit: string
}

