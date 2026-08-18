import { authFetch } from "../authFetch";
import { ENDPOINT_URL } from "../mixin/mixin"

type UpdatePropertyPayload = {
    basic: {
        name: string
    },
    common: {
        addr: string
        structure: string
        mansionType: string
        local: string
        station: string
        year: number
        floors: number
        autoLock: string
        gas: string
        garbage: string
    },
    removedImageKeys: string[]
}

export const updateProperty = async (id: string, payload: UpdatePropertyPayload, files: File[] = []) => {
    const PATH = `/api/v1/buildingRegister/${id}`
    const ENDPOINT = `${ENDPOINT_URL}${PATH}`

    const formData = new FormData()
    formData.append("payload", JSON.stringify(payload))
    files.forEach((file) => formData.append("files", file))

    return await authFetch(ENDPOINT, {
        method: "put",
        body: formData
    })
}
