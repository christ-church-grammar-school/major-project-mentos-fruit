import { useRouter } from 'next/router'
import URLSafeBase64 from 'urlsafe-base64'
import styles from "../styles/nav.module.css"

function Login({ children }) {
    const router = useRouter()
    return (
        <a className={styles.sioButton} href={"/api/login?redirect=" + URLSafeBase64.encode(Buffer.from(router.pathname))}>
        {children}
        </a>
    )
}

function Logout({ children }) {
    return (
        <a className={styles.sioButton} href={"/api/logout"}>
        {children}
        </a>
    )
}

export {
    Login,
    Logout
}