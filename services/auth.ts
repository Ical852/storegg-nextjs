import callAPI from "../config/api"
import { LINK_API } from "../utils/link"

export const signUp = async (signUpData:any) => {
    return callAPI({
        url: `${LINK_API}/auth/signup`,
        method: 'post',
        apiData: signUpData
    })
}

export const signIn = async (formData:any) => {
    return callAPI({
        url: `${LINK_API}/auth/signin`,
        method: 'post',
        apiData: formData
    })
}