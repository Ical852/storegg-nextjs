import Cookies from 'js-cookie'
import jwtDecode from 'jwt-decode'
import { useEffect, useState } from 'react'
import { JWTPayloadTypes } from '../../../services/data-types'
import { IMG_URL } from '../../../utils/link'

export default function Profile() {
  const [user, setUser] = useState({
    avatar: '',
    name: '',
    email: ''
  })

  useEffect(() => {
    const token = Cookies.get('token')
    if (token) {
      const jwtToken = atob(token)
      const payload: JWTPayloadTypes = jwtDecode(jwtToken)
      const userDataToken = payload.player
      if (userDataToken.id) {
        setUser(userDataToken)
      }
    }
  }, [])

  return (
    <div className="user text-center pb-50 pe-30">
      <img src={`${IMG_URL}/${user.avatar}`} width="90" height="90" className="img-fluid mb-20 img-profile-overview" />
      <h2 className="fw-bold text-xl color-palette-1 m-0">{user.name}</h2>
      <p className="color-palette-2 m-0">{user.email}</p>
    </div>
  )
}
