import Cookies from 'js-cookie'

export const getUserToken = () => {
    let token = ""
    const userToken = Cookies.get('token')
    if (userToken) {
        const jwtToken = atob(userToken)
        token = jwtToken
    }

    return token
}