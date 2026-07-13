import { authFetch } from "../authFetch";
import { ENDPOINT_URL } from "../mixin/mixin"

export const getRooms = async (buildingId: string) => {
    const PATH = `/api/v1/rooms/${buildingId}`
    const ENDPOINT = `${ENDPOINT_URL}${PATH}`
    console.log("ENDPOINT:", ENDPOINT)
    
    const res = await authFetch(ENDPOINT)

    if(!res.ok) {
        alert(`部屋情報取得に失敗: ${buildingId}`)
        return 
    }

    console.log("部屋情報取得成功")
    return await res.json()
}