import SideBar from "../../../components/organism/SideBar";
import TransactionContent from "../../../components/organism/TransactionContent";

export default function Transaction() {
    return (
        <>
            <SideBar activeMenu="transactions"/>
            <TransactionContent/>
        </>
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
    return {
        props: {
            token: jwtToken
        }
    }
}