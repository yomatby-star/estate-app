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
    }
}

export const updateProperty = async (id: string, payload: UpdatePropertyPayload) => {
    const PATH = `/api/v1/buildingRegister/${id}`
    const ENDPOINT = `${ENDPOINT_URL}${PATH}`

    return await authFetch(ENDPOINT, {
        method: "put",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload)
    })
}
