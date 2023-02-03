import { useState } from "react"
import { toast } from "react-toastify"
import { checkout } from "../../../services/player"
import { useRouter } from "next/router"
import { getUserToken } from "../../../utils/getToken"

export default function CheckoutConfirmation() {
    const [checkbox, setCheckbox] = useState(false)
    
    const router = useRouter()

    const onSubmit = async () => {
        if (!checkbox) {
            return toast.error('Make Sure You Have Transferred the Money !')
        }

        const token = getUserToken()

        const dataItemLocal:any = localStorage.getItem('data-item')
        const dataTopUpLocal:any = localStorage.getItem('data-topup')
        const dataItem = JSON.parse(dataItemLocal)
        const dataTopUp = JSON.parse(dataTopUpLocal)

        const data = {
            voucher: dataItem._id,
            nominal: dataTopUp.nominalItem._id,
            payment: dataTopUp.paymentItem.payment._id,
            bank: dataTopUp.paymentItem.bank._id,
            name: dataTopUp.bankAccountName,
            accountUser: dataTopUp.verifyID
        }

        const result:any = await checkout(data, token)
        if(result?.data?.error) {
            toast.error(result?.data?.error)
        } else {
            toast.success('Checkout Success')
            setTimeout(() => {
                router.push('/complete-checkout')
            }, 3000);
        }
    }
    return (
        <>
            <label className="checkbox-label text-lg color-palette-1">I have transferred the money
                <input type="checkbox" checked={checkbox} onChange={() => setCheckbox(!checkbox)}/>
                <span className="checkmark"></span>
            </label>
            <div className="d-md-block d-flex flex-column w-100 pt-50">
                <button className="btn btn-confirm-payment rounded-pill fw-medium text-white border-0 text-lg"
                    type="button" onClick={onSubmit}>
                    Confirm Payment
                </button>
            </div>
        </>
    )
}
