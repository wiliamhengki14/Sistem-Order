import Button from "../../ui/Button"
import styles from './Home.module.css'
const Home = () => {
    return (
        <main className={styles.home}>
            <h1>Selamat Datang Di Cafe</h1>
            <Button>Login</Button>
        </main>
    )
}

export default Home