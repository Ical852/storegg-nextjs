import Link from "next/link"
import { useRouter } from "next/router";
import { useCallback, useState } from "react"
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { signIn } from "../../../services/auth";
import jwtDecode from "jwt-decode";
import Cookies from 'js-cookie'

export default function SignInForm() {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const router = useRouter()

    const onSubmit = () => {
        const data = {
            email,
            password
        }
        if (!email || !password) {
            toast.error('Complete Your Form !')
        } else {
            signInApi(data)
        }
    }

    const signInApi = useCallback(async (data) => {
        const result:any = await signIn(data)
        if (result?.status == 403) {
            toast.error(result.data.message)
        } else {
            toast.success('Sign In Success')
            const tokenBase64 = btoa(result.token)
            Cookies.set('token', tokenBase64, { expires: 1 })
            setTimeout(() => {
                router.push('/')
            }, 2000);
        }
    }, [signIn])

    return (
        <>
            <h2 className="text-4xl fw-bold color-palette-1 mb-10">Sign In</h2>
            <p className="text-lg color-palette-1 m-0">Masuk untuk melakukan proses top up</p>
            <div className="pt-50">
                <label htmlFor="email" className="form-label text-lg fw-medium color-palette-1 mb-10">Email
                    Address</label>
                <input type="email" className="form-control rounded-pill text-lg"
                    aria-describedby="email" placeholder="Enter your email address" 
                    onChange={(text) => setEmail(text.target.value)} value={email}/>
            </div>
            <div className="pt-30">
                <label htmlFor="password"
                    className="form-label text-lg fw-medium color-palette-1 mb-10">Password</label>
                <input type="password" className="form-control rounded-pill text-lg"
                    aria-describedby="password" placeholder="Your password" 
                    onChange={(text) => setPassword(text.target.value)} value={password}/>
            </div>
            <div className="button-group d-flex flex-column mx-auto pt-50">
                <button className="btn btn-sign-in fw-medium text-lg text-white rounded-pill mb-16"
                    type="button" onClick={onSubmit}>Continue to Sign In</button>
                <Link href={"/sign-up"}>
                    <a className="btn btn-sign-up fw-medium text-lg color-palette-1 rounded-pill"
                        role="button">
                        SignUp
                    </a>
                </Link>
            </div>
        </>
    )
}
