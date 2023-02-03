import axios from "axios";

export default async function callAPI({url, method, apiData, token} : any){
    let data
    await axios({
        url: url,
        method: method,
        data: apiData,
        headers: {
            Authorization: token
        }
    })
    .then(res => {
        data = res.data.data
    })
    .catch(err => {
        data = err.response
    })
    return data
}