import gaikan from "../../assets/gaikan.jpg"
import gaikan2 from "../../assets/gaikan2.jpg"
import roomPhoto from "../../../public/ai_20241220_05.jpg"
import roomPhotoItem from "../../../public/3ldkdemo.jpg"

type Status = "vacant" | "closed"
type MansionType = "マンション" | "アパート" | "テナント" | "ビル"
type Structure = "鉄筋コンクリート" | "木造" | "鉄骨" | "軽量鉄骨"

export type Property = {
  id: string;
  basic: {
    name: string;
    addr: string;
  };
  common: {
    structure: Structure
    mansionType: MansionType;
    local: string;
    station: string;
    garbage: string;
    autoLock: string;
    gas: string;
    floors: string;
    year: string;
  };
  roomStatus: {
    roomNumber: string;
    status: Status;
    basic: {
      type: string;
      occupiedArea: string;
      roomFloor: string;
    };
    equipment: string[];
    conditions: {
      rent: string;
      managementFee: string;
      reikin: string;
      shikikin: string;
    },
    photo: string[];
  }[];
  image: string;
  images: string[]
}

export const mockProperties: Property[] = [
  {
    id: "p1",
    basic: {
      name: "MTBマンション",
      addr: "東京都渋谷区道玄坂1-2-3",
    },
    common: {
      structure: "鉄筋コンクリート",
      mansionType: "マンション",
      local: "JR山手線",
      station: "渋谷",
      garbage: "有",
      autoLock: "有",
      gas: "都市ガス",
      floors: "20",
      year: "2025/10"
    },
    roomStatus: [
      { 
        roomNumber: "101", 
        status: "vacant",
        basic: {
          type: "2LDK",
          occupiedArea: "56.77",
          roomFloor: "6",
        },
        equipment: [
          "エアコン",
          "バストイレ別",
          "クローゼット",
          "2階以上",
          "洗濯機置き場",
          "防音",
          "ペット相談可",
          "エアコン",
          "バストイレ別",
          "クローゼット",
          "2階以上",
          "洗濯機置き場",
          "防音",
          "ペット相談可",
          "エアコン",
          "バストイレ別",
          "クローゼット",
          "2階以上",
          "洗濯機置き場",
          "防音",
          "ペット相談可",
          "バストイレ別",
          "クローゼット",
          "2階以上",
          "洗濯機置き場",
          "防音",
          "ペット相談可",
          "バストイレ別",
          "クローゼット",
          "2階以上",
          "洗濯機置き場",
          "防音",
          "ペット相談可",
        ],
        conditions: {
          rent: "146000",
          managementFee: "7000",
          reikin: "146000",
          shikikin: "146000"
        },
        photo: [roomPhoto, roomPhotoItem]
      },
      { 
        roomNumber: "102", 
        status: "vacant",
        basic: {
          type: "4LDK",
          occupiedArea: "86.33",
          roomFloor: "13",
        },
        equipment: [
          "エアコン",
          "バストイレ別",
          "クローゼット",
          "2階以上",
          "洗濯機置き場",
          "防音",
          "ペット相談可",
          "エアコン",
          "バストイレ別",
        ],
        conditions: {
          rent: "456000",
          managementFee: "0",
          reikin: "0",
          shikikin: "0"
        },
        photo: [roomPhoto]
      },
      { 
        roomNumber: "201",
        status: "closed",
        basic: {
          type: "1K",
          occupiedArea: "24.77",
          roomFloor: "3",
        },
        equipment: [
          "エアコン",
          "ペット相談可",
          "エアコン",
          "ペット相談可",
          "エアコン",
          "ペット相談可",
          "エアコン",
          "ペット相談可",
          "エアコン",
          "ペット相談可",
          "エアコン",
          "ペット相談可",
          "エアコン",
          "ペット相談可",
          "エアコン",
          "ペット相談可",
          "エアコン",
          "ペット相談可",
          "エアコン",
          "ペット相談可",
        ],
        conditions: {
          rent: "86000",
          managementFee: "6000",
          reikin: "50000",
          shikikin: "0"
        },
        photo: [roomPhoto]
      },
    ],
    image: gaikan2,
    images: [gaikan, gaikan2]
  },
  {
    id: "p2",
    basic: {
      name: "新宿マンション",
      addr: "東京都新宿区大久保1-2-3",
    },
    common: {
      structure: "木造",
      mansionType: "アパート",
      local: "JR山手線",
      station: "新大久保",
    },
    roomStatus: [
      { roomNumber: "101", status: "vacant"},
      { roomNumber: "102", status: "closed"},
      { roomNumber: "103", status: "closed"},
      { roomNumber: "201", status: "closed"},
      { roomNumber: "202", status: "closed"},
    ],
    image: gaikan,
    images: [gaikan, gaikan2]
  },
  {
    id: "p3",
    basic: {
      name: "新宿マンション",
      addr: "東京都新宿区大久保1-2-3",
    },
    common: {
      structure: "鉄筋コンクリート",
      mansionType: "テナント",
      local: "JR山手線",
      station: "新大久保",
    },
    roomStatus: [
      { roomNumber: "101", status: "closed"},
      { roomNumber: "102", status: "closed"},
      { roomNumber: "103", status: "closed"},
      { roomNumber: "201", status: "closed"},
      { roomNumber: "202", status: "closed"},
    ],
    image: gaikan,
    images: [gaikan, gaikan2]
  },
  {
    id: "p4",
    basic: {
      name: "テスト",
      addr: "東京都新宿区大久保1-2-3",
    },
    common: {
      structure: "鉄骨",
      mansionType: "マンション",
      local: "JR山手線",
      station: "新大久保",
    },
    roomStatus: [
      { roomNumber: "101", status: "closed"},
      { roomNumber: "102", status: "closed"},
      { roomNumber: "103", status: "closed"},
      { roomNumber: "201", status: "closed"},
      { roomNumber: "202", status: "closed"},
    ],
    image: gaikan,
    images: [gaikan, gaikan2]
  },
  {
    id: "p5",
    basic: {
      name: "新宿マンション",
      addr: "東京都新宿区大久保1-2-3",
    },
    common: {
      structure: "軽量鉄骨",
      mansionType: "マンション",
      local: "JR山手線",
      station: "新大久保",
    },
    roomStatus: [
      { roomNumber: "101", status: "vacant"},
      { roomNumber: "102", status: "vacant"},
      { roomNumber: "103", status: "closed"},
      { roomNumber: "201", status: "closed"},
      { roomNumber: "202", status: "closed"},
    ],
    image: gaikan,
    images: [gaikan, gaikan2]
  },
  {
    id: "p6",
    basic: {
      name: "新宿マンション",
      addr: "東京都新宿区大久保1-2-3",
    },
    common: {
      structure: "鉄筋コンクリート",
      mansionType: "マンション",
      local: "JR山手線",
      station: "新大久保",
    },
    roomStatus: [
      { roomNumber: "101", status: "vacant"},
      { roomNumber: "102", status: "vacant"},
      { roomNumber: "103", status: "closed"},
      { roomNumber: "201", status: "closed"},
      { roomNumber: "202", status: "closed"},
    ],
    image: gaikan,
    images: [gaikan, gaikan2]
  },
  {
    id: "p7",
    basic: {
      name: "新宿マンション",
      addr: "東京都新宿区大久保1-2-3",
    },
    common: {
      structure: "鉄筋コンクリート",
      mansionType: "マンション",
      local: "JR山手線",
      station: "新大久保",
    },
    roomStatus: [
      { roomNumber: "101", status: "vacant"},
      { roomNumber: "102", status: "vacant"},
      { roomNumber: "103", status: "closed"},
      { roomNumber: "201", status: "closed"},
      { roomNumber: "202", status: "closed"},
    ],
    image: gaikan,
    images: [gaikan, gaikan2]
  },
  {
    id: "p8",
    basic: {
      name: "新宿マンション",
      addr: "東京都新宿区大久保1-2-3",
    },
    common: {
      structure: "鉄筋コンクリート",
      mansionType: "マンション",
      local: "JR山手線",
      station: "新大久保",
    },
    roomStatus: [
      { roomNumber: "101", status: "vacant"},
      { roomNumber: "102", status: "vacant"},
      { roomNumber: "103", status: "closed"},
      { roomNumber: "201", status: "closed"},
      { roomNumber: "202", status: "closed"},
    ],
    image: gaikan,
    images: [gaikan, gaikan2]
  },
  
]