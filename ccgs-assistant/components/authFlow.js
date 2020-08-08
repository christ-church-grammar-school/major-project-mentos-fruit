import { useRouter } from 'next/router'
import URLSafeBase64 from 'urlsafe-base64'

function Login({ children }) {
    const router = useRouter()
    return (
        <a href={"/api/login?redirect=" + URLSafeBase64.encode(Buffer.from(router.pathname))}>
        {children}
        </a>
    )
}

function Logout({ children }) {
    return (
        <a href={"/api/logout"}>
        {children}
        </a>
    )
}

export {
    Login,
    Logout
}