import axios from "axios"
import callAPI from "../config/api"
import { LINK_API } from "../utils/link"
import { CheckoutTypes } from "./data-types"

export const getFeaturedGame = async () => {
    return callAPI({
        url: `${LINK_API}/player/landingpage`,
        method: 'get',
    })
}

export const getDetailVoucher = async (id : any) => {
    return callAPI({
        url: `${LINK_API}/player/detail/${id}`,
        method: 'get',
    })
}

export const getCategory = async () => {
    return callAPI({
        url: `${LINK_API}/player/category`,
        method: 'get',
    })
}

export const checkout = async (data: CheckoutTypes, token: any) => {
    return callAPI({
        url: `${LINK_API}/player/checkout`,
        method: 'post',
        apiData: data,
        token: token
    })
}

export const getOverview = async (token: any) => {
    return callAPI({
        url: `${LINK_API}/player/dashboard`,
        method: 'get',
        token: token
    })
}

export const getHistory = async (token: any, status: string) => {
    return callAPI({
        url: `${LINK_API}/player/history?status=${status}`,
        method: 'get',
        token: token
    })
}

export const getDetailHistory = async (token: any, id: any) => {
    return callAPI({
        url: `${LINK_API}/player/history/detail/${id}`,
        method: 'get',
        token: token
    })
}

export const updateProfile = async (token: any, data: any) => {
    return callAPI({
        url: `${LINK_API}/player/profile`,
        method: 'put',
        token: token,
        apiData: data
    })
}