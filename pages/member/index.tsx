import jwtDecode from "jwt-decode";
import ContentOverview from "../../components/organism/ContentOverview";
import SideBar from "../../components/organism/SideBar";
import { JWTPayloadTypes } from "../../services/data-types";

export default function Member() {
    return (
        <section className="overview overflow-auto">
            <SideBar activeMenu="overview"/>
            <ContentOverview/>
        </section>
    )
}

export async function getServerSideProps({ req }: any) {
    const { token } = req.cookies
    if (!token) {
        return {
            redirect: {
                destination: '/sign-in',
                permanent: false
            }
        }
    }
    const jwtToken = Buffer.from(token, 'base64').toString('ascii')
    const payload: JWTPayloadTypes = jwtDecode(jwtToken)
    const userFromPayload = payload.player
    return {
        props: {
            user: userFromPayload
        }
    }
}