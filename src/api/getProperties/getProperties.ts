import { authFetch } from "../authFetch"

export const getProperties = async () => {
    const ENDPOINT = "http://127.0.0.1:8000"
    const PATH = "/api/v1/properties"
    const ENDPOINT_URL = `${ENDPOINT}${PATH}`
    
    const res = await authFetch(ENDPOINT_URL)

    if(!res.ok) {
        // throw new Error("物件一覧取得に失敗")
        alert("物件一覧取得に失敗")
        return
    }

    return await res.json()
}