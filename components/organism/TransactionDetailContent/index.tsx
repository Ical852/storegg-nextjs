import { useRouter } from "next/router";
import { useCallback, useEffect, useState } from "react";
import { getDetailHistory } from "../../../services/player";
import { getUserToken } from "../../../utils/getToken";
import Row from "./Row";
import { HistoryTransactionTypes } from "../../../services/data-types"
import { IMG_URL } from "../../../utils/link";

export default function TransactionDetailContent() {
    const { query, isReady } : any = useRouter()
    const [detailData, setDetailData] = useState<HistoryTransactionTypes>()

    useEffect(() => {
        if (isReady) {
            getDetailHistoryData(query.id)
        }
    }, [isReady])

    const getDetailHistoryData = useCallback(async (id) => {
        const result = await getDetailHistory(getUserToken(), id)
        console.log(result)
        setDetailData(result)
    }, [])

    return (
        <section className="transactions-detail overflow-auto">
            <main className="main-wrapper">
                <div className="ps-lg-0">
                    <h2 className="text-4xl fw-bold color-palette-1 mb-30">Details #GG001</h2>
                    <div className="details">
                        <div className="main-content main-content-card overflow-auto">
                            <section className="checkout mx-auto">
                                <div className="d-flex flex-row  align-items-center justify-content-between mb-30">
                                    <div className="game-checkout d-flex flex-row align-items-center">
                                        <div className="pe-4">
                                            <div className="cropped">
                                                <img src={`${IMG_URL}/${detailData?.historyVoucherTopup.thumbnail}`} width="200" height="130"
                                                    className="img-fluid" alt="" />
                                            </div>
                                        </div>
                                        <div>
                                            <p className="fw-bold text-xl color-palette-1 mb-10">{detailData?.historyVoucherTopup.gameName}</p>
                                            <p className="color-palette-2 m-0">Category: {detailData?.historyVoucherTopup.category}</p>
                                        </div>
                                    </div>
                                    <div>
                                        <p className={`fw-medium text-center label ${detailData?.status} m-0 rounded-pill`}>{detailData?.status.toUpperCase()}</p>
                                    </div>
                                </div>
                                <hr />
                                <div className="purchase pt-30">
                                    <h2 className="fw-bold text-xl color-palette-1 mb-20">Purchase Details</h2>
                                    <Row label="Your Game ID" value={detailData?.accountUser} />
                                    <Row label="Order ID" value={detailData?._id} />
                                    <Row label="Item" value={`${detailData?.historyVoucherTopup.coinQuantity} ${detailData?.historyVoucherTopup.coinName}`} />
                                    <Row label="Price" value={detailData?.historyVoucherTopup.price} />
                                    <Row label="Tax (10%)" value={detailData?.tax} />
                                    <Row label="Total" value={(detailData?.historyVoucherTopup.price! + detailData?.tax!)} total/>
                                </div>
                                <div className="payment pt-10 pb-10">
                                    <h2 className="fw-bold text-xl color-palette-1 mb-20">Payment Informations</h2>
                                    <Row label="Your Account Name" value={detailData?.name} />
                                    <Row label="Type" value={detailData?.historyPayment.type} />
                                    <Row label="Bank Name" value={detailData?.historyPayment.bankName} />
                                    <Row label="Bank Account Name" value={detailData?.historyPayment.name} />
                                    <Row label="Bank Number" value={detailData?.historyPayment.noRekening} />
                                </div>
                                <div className="d-md-block d-flex flex-column w-100">
                                    <a className="btn btn-whatsapp rounded-pill fw-medium text-white border-0 text-lg" href={`https://wa.me/62XXXXXXXXXXX?text=Saya%20sudah%20membayar%20topup%20game%20yang%20sayapesan`}
                                        role="button">WhatsApp ke Admin</a>
                                </div>
                            </section>
                        </div>
                    </div>
                </div>
            </main>
        </section>
    )
}
