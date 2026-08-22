import { authFetch } from "../authFetch";
import { ENDPOINT_URL } from "../mixin/mixin"

type UpdateRoomPayload = {
    room: {
        roomNumber: string
        rent: number
        managementFee: number
        securityDeposit: number
        keyMoney: number
        floorPlan: string
        exclusiveArea: string
        numberFloors: string
        direction: string
        status: string
        equipments: string[]
    },
    removedImageKeys: string[]
}

export const updateRoom = async (roomId: string, payload: UpdateRoomPayload, files: File[] = []) => {
    const PATH = `/api/v1/roomRegister/${roomId}`
    const ENDPOINT = `${ENDPOINT_URL}${PATH}`

    const formData = new FormData()
    formData.append("payload", JSON.stringify(payload))
    files.forEach((file) => formData.append("files", file))

    return await authFetch(ENDPOINT, {
        method: "put",
        body: formData
    })
}
