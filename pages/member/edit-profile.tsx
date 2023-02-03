import { useState } from "react";
import jwtDecode from "jwt-decode";
import { useEffect } from "react";
import Input from "../../components/atoms/Input";
import SideBar from "../../components/organism/SideBar";
import { getUserToken } from '../../utils/getToken'
import { IMG_URL } from "../../utils/link";
import { updateProfile } from "../../services/player";
import { useRouter } from "next/router";
import { toast } from "react-toastify";

export default function EditProfile() {
    const [user, setUser] = useState({
        avatar: '',
        email: '',
        name: '',
        phoneNumber: ''
    })

    const [newImage, setNewImage] = useState('')
    const [newName, setNewName] = useState('')
    const [newPhoneNumber, setNewPhoneNumber] = useState('')

    const router = useRouter()

    useEffect(() => {
        const userToken = getUserToken()
        const decoded: any = jwtDecode(userToken)
        const userData = decoded.player
        setUser(userData)
        setNewName(userData.name)
        setNewPhoneNumber(userData.phoneNumber)
    }, [])

    const onUpdateProfile = async () => {
        const data = new FormData()
        data.append('name', newName)
        data.append('phoneNumber', newPhoneNumber)
        if (newImage != '') {
            data.append('image', newImage)
        }

        const result:any = await updateProfile(getUserToken(), data)
        if (result?.data?.error) {
            toast.error(result.data.message)
        } else {
            toast.success('Success Update Profile')
        }
        console.log(result)
    }

    return (
        <>
            <SideBar activeMenu="settings"/>
            <section className="edit-profile overflow-auto">
                <main className="main-wrapper">
                    <div className="ps-lg-0">
                        <h2 className="text-4xl fw-bold color-palette-1 mb-30">Settings</h2>
                        <div className="bg-card pt-30 ps-30 pe-30 pb-30">
                            <form action="">
                                <div className="photo d-flex">
                                    <div className="position-relative me-20">
                                        <img src={`${IMG_URL}/${user.avatar}`} className="avatar img-fluid img-edit-profile" />
                                        <div
                                            className="avatar-overlay position-absolute top-0 d-flex justify-content-center align-items-center">
                                            <img src="/icon/icon-trash.svg" alt="" />
                                        </div>
                                    </div>
                                    <div className="image-upload">
                                        <label htmlFor="avatar">
                                            <img src="/icon/upload.svg" alt=""width={90} height={90} />
                                        </label>
                                        <input id="avatar" type="file" name="avatar" accept="image/png, image/jpeg" onChange={(event) => setNewImage(event.target.files[0])}/>
                                    </div>
                                </div>
                                <div className="pt-30">
                                    <label htmlFor="name" className="form-label text-lg fw-medium color-palette-1 mb-10">Full Name</label>
                                    <input type="text" className="form-control rounded-pill text-lg" placeholder="Enter your name" value={newName} onChange={(event) => setNewName(event.target.value)}/>
                                </div>
                                <div className="pt-30">
                                    <label htmlFor="name" className="form-label text-lg fw-medium color-palette-1 mb-10">Email Address</label>
                                    <input type="email" className="form-control rounded-pill text-lg" placeholder="Enter your email address" readOnly value={user.email} onChange={() => console.log('')}/>
                                </div>
                                <div className="pt-30">
                                    <label htmlFor="name" className="form-label text-lg fw-medium color-palette-1 mb-10">Phone Number</label>
                                    <input type="text" className="form-control rounded-pill text-lg" placeholder="Enter your phone number" value={newPhoneNumber} onChange={(event) => setNewPhoneNumber(event.target.value)}/>
                                </div>
                                <div className="button-group d-flex flex-column pt-50">
                                    <button type="button" className="btn btn-save fw-medium text-lg text-white rounded-pill"
                                        role="button" onClick={onUpdateProfile}>Save My Profile</button>
                                </div>
                            </form>
                        </div>
                    </div>
                </main>
            </section>
        </>
    )
}
