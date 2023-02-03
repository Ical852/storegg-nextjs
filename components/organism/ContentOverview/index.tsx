import { useCallback, useEffect, useState } from "react"
import Category from "./Category"
import TableRow from "./TableRow"
import { getUserToken } from "../../../utils/getToken"
import { getOverview } from "../../../services/player"
import { IMG_URL } from "../../../utils/link"
import { toast } from "react-toastify"
import { TopUpCategoriesTypes, HistoryTransactionTypes } from "../../../services/data-types"

export default function ContentOverview() {
    const [overview, setOverview] = useState({
        count: [],
        data: [],
    })

    useEffect(() => {
        getMemberOverview(getUserToken())
    }, [])

    const getMemberOverview = useCallback(async (token) => {
        const result:any = await getOverview(token)
        console.log(result)
        if (result?.data?.error) {
            return toast.error(result.data.error)
        }
        setOverview(result)
    }, [])
    
    return (
        <main className="main-wrapper">
            <div className="ps-lg-0">
                <h2 className="text-4xl fw-bold color-palette-1 mb-30">Overview</h2>
                <div className="top-up-categories mb-30">
                    <p className="text-lg fw-medium color-palette-1 mb-14">Top Up Categories</p>
                    <div className="main-content">
                        <div className="row">
                            {
                                overview ? overview.count.map((data : TopUpCategoriesTypes) => {
                                    return (
                                        <Category
                                            key={data._id}
                                            icon={data.name == 'PC' ? 'desktop' : data.name.toLowerCase()}
                                            nominal={data.value}
                                        >
                                            {data.name != 'PC' ? 'Game' : 'Other'} <br /> {data.name != 'PC' ? data.name : 'Categories'}
                                        </Category>
                                    )
                                }) :
                                <h3>Processing...</h3>
                            }
                        </div>
                    </div>
                </div>
                <div className="latest-transaction">
                    <p className="text-lg fw-medium color-palette-1 mb-14">Latest Transactions</p>
                    <div className="main-content main-content-table overflow-auto">
                        <table className="table table-borderless">
                            <thead>
                                <tr className="color-palette-1">
                                    <th className="text-start" scope="col">Game</th>
                                    <th scope="col">Item</th>
                                    <th scope="col">Price</th>
                                    <th scope="col">Status</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    overview ? overview.data.map((data: HistoryTransactionTypes) => {
                                        return (
                                            <TableRow
                                                key={data._id} 
                                                title={data.historyVoucherTopup.gameName}
                                                category={data.category.name}
                                                price={data.value} 
                                                status={data.status} 
                                                img={`${IMG_URL}/${data.historyVoucherTopup.thumbnail}`} 
                                                item={parseInt(data.historyVoucherTopup.coinQuantity)}
                                                coinName={data.historyVoucherTopup.coinName}
                                            />
                                        )
                                    }) :
                                    <h3>Processing...</h3>
                                }
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </main>
    )
}
