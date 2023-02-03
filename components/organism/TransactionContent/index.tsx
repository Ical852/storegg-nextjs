import { useCallback, useEffect, useState } from "react";
import { toast } from "react-toastify";
import { getHistory } from "../../../services/player";
import { getUserToken } from "../../../utils/getToken";
import ButtonTab from "./ButtonTab";
import TableRow from "./TableRow";
import NumberFormat from 'react-number-format'
import { HistoryTransactionTypes } from "../../../services/data-types";
import { IMG_URL } from "../../../utils/link";

export default function TransactionContent() {
    const [status, setStatus] = useState('')
    const [history, setHistory] = useState({
        data: [],
        total: 0
    })

    const setStatusHistory = (status: string) => {
        setStatus(status)
        getHistoryData(status)
    }

    const getHistoryData = useCallback( async (filterStatus) => {
        const result: any = await getHistory(getUserToken(), filterStatus)
        if (result?.data?.error) {
            return toast.error(result.data.error)
        }
        setHistory(result)
    }, [])

    useEffect(() => {
        getHistoryData(status)
    }, [])

    return (
        <section className="transactions overflow-auto">
            <main className="main-wrapper">
                <div className="ps-lg-0">
                    <h2 className="text-4xl fw-bold color-palette-1 mb-30">My Transactions</h2>
                    <div className="mb-30">
                        <p className="text-lg color-palette-2 mb-12">You’ve spent</p>
                        <h3 className="text-5xl fw-medium color-palette-1">
                            <NumberFormat
                                value={history.total}
                                prefix={"Rp. "}
                                displayType="text"
                                thousandSeparator='.'
                                decimalSeparator=','
                            />
                        </h3>
                    </div>
                    <div className="row mt-30 mb-20">
                        <div className="col-lg-12 col-12 main-content">
                            <div id="list_status_title">
                                <ButtonTab title="All Trx" active={status == ''} onClick={() => setStatusHistory('')}/>
                                <ButtonTab title="Success" active={status == 'success'} onClick={() => setStatusHistory('success')}/>
                                <ButtonTab title="Pending" active={status == 'pending'} onClick={() => setStatusHistory('pending')}/>
                                <ButtonTab title="Failed" active={status == 'failed'} onClick={() => setStatusHistory('failed')}/>
                            </div>
                        </div>
                    </div>
                    <div className="latest-transaction">
                        <p className="text-lg fw-medium color-palette-1 mb-14">Latest Transactions</p>
                        <div className="main-content main-content-table overflow-auto">
                            <table className="table table-borderless">
                                <thead>
                                    <tr className="color-palette-1">
                                        <th className="" scope="col">Game</th>
                                        <th scope="col">Item</th>
                                        <th scope="col">Price</th>
                                        <th scope="col">Status</th>
                                        <th scope="col">Action</th>
                                    </tr>
                                </thead>
                                <tbody id="list_status_item">
                                    {
                                        history.data.map((data: HistoryTransactionTypes) => {
                                            return (
                                                <TableRow
                                                    key={data._id}
                                                    id={data._id}
                                                    title={data.historyVoucherTopup.gameName} 
                                                    category={data.historyVoucherTopup.category}
                                                    item={parseInt(data.historyVoucherTopup.coinQuantity)} 
                                                    coinName={data.historyVoucherTopup.coinName}
                                                    price={data.value} 
                                                    status={data.status} 
                                                    img={`${IMG_URL}/${data.historyVoucherTopup.thumbnail}`} 
                                                />
                                            )
                                        })
                                    }
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </main>
        </section>
    )
}
