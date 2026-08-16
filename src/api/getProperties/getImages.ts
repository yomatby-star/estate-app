import { authFetch } from "../authFetch";

export const getImages = async (imageKey: string) => {
    const ENDPOINT = "http://127.0.0.1:8000"
    const PATH = `/api/v1/images/url?image_key=${imageKey}`
    const ENDPOINT_URL = `${ENDPOINT}${PATH}`
    // console.log("ENDPOINT_URL:", ENDPOINT_URL)
    
    const res = await authFetch(ENDPOINT_URL)

    if(!res.ok) {
        alert("画像取得に失敗")
        return
    }

    return await res.json()
}