import { useCallback, useEffect, useState } from "react";
import { getCategory } from "../services/player";
import { CategoryTypes } from "../services/data-types"
import { signUp } from "../services/auth";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useRouter } from "next/router";

export default function SignUpPhoto() {
    const [categories, setCategories] : any = useState([])
    const [favorite, setFavorite] = useState('')
    const [image, setImage] = useState('')
    const [imagePreview, setImagePreview] = useState(null)
    const [localForm, setLocalForm] : any = useState({
        name: '',
        email: ''
    })

    const router = useRouter()

    const getCategoryApi = useCallback( async () => {
        const data:any = await getCategory()
        setCategories(data)
        setFavorite(data[0]._id)
    }, [getCategory])

    const onSubmit = async () => {
        const localForm:any = await localStorage.getItem('user-form')
        const form = JSON.parse(localForm)
        const data = new FormData()

        data.append('image', image)
        data.append('email', form.email)
        data.append('name', form.name)
        data.append('username', form.name)
        data.append('phoneNumber', '08975463881')
        data.append('password', form.password)
        data.append('role', 'user')
        data.append('status', 'Y')
        data.append('favorite', favorite)

        const result :any = await signUp(data)
        if (result.error == 1) {
            localStorage.removeItem('user-form')
            toast.error(result.message)
            setTimeout(() => {
                router.back()
            }, 3000);
        } else {
            toast.success('Register Success')
            setTimeout(() => {
                router.push('/sign-up-success')
                localStorage.removeItem('user-form')
            }, 3000);
        }
    }

    useEffect(() => {
        getCategoryApi()
    }, [])

    useEffect(() => {
        const getLocalForm: any = localStorage.getItem('user-form')
        setLocalForm(JSON.parse(getLocalForm))
    }, [])

    return (
        <section className="sign-up-photo mx-auto pt-lg-227 pb-lg-227 pt-130 pb-50">
            <div className="container mx-auto">
                <form action="">
                    <div className="form-input d-md-block d-flex flex-column">
                        <div>
                            <div className="mb-20">
                                <div className="image-upload text-center">
                                    <label htmlFor="avatar">
                                        <img src={imagePreview ?? "/icon/upload.svg"} className="img-upload" alt="upload"/>
                                    </label>
                                    <input id="avatar" type="file" name="avatar" accept="image/png, image/jpeg" 
                                        onChange={(image) => {
                                            const img = image.target.files[0]
                                            setImagePreview(URL.createObjectURL(img))
                                            setImage(img)
                                        }}/>
                                </div>
                            </div>
                            <h2 className="fw-bold text-xl text-center color-palette-1 m-0">{localForm.name}</h2>
                            <p className="text-lg text-center color-palette-1 m-0">{localForm.email}</p>
                            <div className="pt-50 pb-50">
                                <label htmlFor="category" className="form-label text-lg fw-medium color-palette-1 mb-10">Favorite
                                    Game</label>
                                <select className="form-select d-block w-100 rounded-pill text-lg" 
                                    onChange={(select) => setFavorite(select.target.value)}
                                    value={favorite}
                                    aria-label="Favorite Game">
                                    {
                                        categories ? categories.map((data: CategoryTypes) => {
                                            return (
                                                <option key={data._id} value={data._id}>{data.name}</option>
                                            )
                                        }) : 
                                        <h2>On Process...</h2>
                                    }
                                </select>
                            </div>
                        </div>

                        <div className="button-group d-flex flex-column mx-auto">
                            <button className="btn btn-create fw-medium text-lg text-white rounded-pill mb-16"
                                type="button" onClick={onSubmit}>Create My Account</button>
                            <a className="btn btn-tnc text-lg color-palette-1 text-decoration-underline pt-15" href="#"
                                role="button">Terms &
                                Conditions</a>
                        </div>
                    </div>
                </form>
            </div>
        </section>
    )
}
