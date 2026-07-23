import { authFetch } from "../authFetch";
import { ENDPOINT_URL } from "../mixin/mixin"

export const getRoom = async (roomId: string) => {
    const PATH = `/api/v1/rooms/detail/${roomId}`
    const ENDPOINT = `${ENDPOINT_URL}${PATH}`
    console.log("ENDPOINT:", ENDPOINT)
    
    const res = await authFetch(ENDPOINT)

    if(!res.ok) {
        alert(`部屋情報取得に失敗: ${roomId}`)
        return 
    }

    console.log("単体部屋情報取得成功")
    return await res.json()
}