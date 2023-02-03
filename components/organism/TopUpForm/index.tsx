import { useRouter } from "next/router";
import { useState } from "react";
import { PaymentTypes, BanksTypes, NominalsTypes } from "../../../services/data-types";
import NominalItem from "./NominalItem";
import PaymentItem from "./PaymentItem";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

interface TopUpFormProps {
    nominals: NominalsTypes[],
    payment: PaymentTypes[]
}
export default function TopUpForm(props: TopUpFormProps) {
    const { nominals, payment } = props
    
    const [verifyID, setVerifyID] = useState('')
    const [bankAccountName, setBankAccountName] = useState('')
    const [nominalItem, setNominalItem] = useState({_id: ''})
    const [paymentItem, setPaymentItem] = useState({ bank: { _id: '' } })

    const router = useRouter()

    const onNominalItemChange = (data:NominalsTypes) => {
        setNominalItem(data)
    }

    const onPaymentItemChange = (payment: PaymentTypes, bank: BanksTypes) => {
        const data = {
            payment,
            bank
        }
        setPaymentItem(data)
    }

    const onSubmit = () => {
        if (verifyID == '') {
            toast.error('Isi Verify ID Anda !')
        } else if (nominalItem._id == '') {
            toast.error('Pilih Nominal !')
        } else if (paymentItem.bank._id == '') {
            toast.error('Pilih Metode Pembayaran !')
        } else if (bankAccountName == '') {
            toast.error('Isi Nama Akun Bank Anda !')
        } else {
            const data = {
                verifyID,
                bankAccountName,
                nominalItem,
                paymentItem
            }
            localStorage.setItem('data-topup', JSON.stringify(data))
            router.push('/checkout')
        }
    }

    return (
        <>
            <form action="./checkout.html" method="POST">
                <div className="pt-md-50 pt-30">
                    <div className="">
                        <label htmlFor="ID" className="form-label text-lg fw-medium color-palette-1 mb-10">
                            Verify ID
                        </label>
                        <input type="text" className="form-control rounded-pill text-lg"
                            aria-describedby="verifyID" placeholder="Enter your ID" 
                            value={verifyID} onChange={text => setVerifyID(text.target.value)}/>
                    </div>
                </div>
                <div className="pt-md-50 pb-md-50 pt-30 pb-20">
                    <p className="text-lg fw-medium color-palette-1 mb-md-10 mb-0">Nominal Top Up</p>
                    <div className="row justify-content-between">
                        {
                            nominals ? nominals.map(data => {
                                return (
                                    <NominalItem
                                        key={data._id}
                                        _id={data._id}
                                        coinQuantity={data.coinQuantity}
                                        coinName={data.coinName}
                                        price={data.price}
                                        onChange={() => onNominalItemChange(data)}
                                    />
                                )
                            }) :
                            <h3>On Process</h3>
                        }
                        <div className="col-lg-4 col-sm-6">
                        </div>
                    </div>
                </div>
                <div className="pb-md-50 pb-20">
                    <p className="text-lg fw-medium color-palette-1 mb-md-10 mb-0">Payment Method</p>
                    <fieldset id="paymentMethod">
                        <div className="row justify-content-between">
                            {
                                payment ? payment.map((data:PaymentTypes) => {
                                    return (
                                        data.banks.map((banks: BanksTypes) => {
                                            return (
                                                <PaymentItem
                                                    key={banks._id}
                                                    type={data.type} 
                                                    name={banks.bankName} 
                                                    id={banks._id}
                                                    onChange={() => onPaymentItemChange(data, banks)}
                                                />
                                            )
                                        })
                                    )
                                }) : 
                                <h3>On Process</h3>
                            }
                            <div className="col-lg-4 col-sm-6">
                            </div>
                        </div>
                    </fieldset>
                </div>
                <div className="pb-50">
                    <label htmlFor="bankAccount" className="form-label text-lg fw-medium color-palette-1 mb-10">
                        Bank Account Name
                    </label>
                    <input type="text" className="form-control rounded-pill text-lg" id="bankAccount"
                        name="bankAccount" aria-describedby="bankAccount"
                        placeholder="Enter your Bank Account Name"
                        value={bankAccountName} onChange={text => setBankAccountName(text.target.value)}/>
                </div>
                <div className="d-sm-block d-flex flex-column w-100">
                    <button type="button" className="btn btn-submit rounded-pill fw-medium text-white border-0 text-lg"
                        onClick={onSubmit}>
                        Continue
                    </button>
                </div>
            </form>
        </>
    )
}
