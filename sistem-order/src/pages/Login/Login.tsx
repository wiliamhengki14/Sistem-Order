import styles from './Login.module.css'
import Input from '../../ui/Input'
import Button from '../../ui/Button'
const Login = () => {
    return (
        <main className={styles.login}>
            <div className={styles.card}>
                <h1 className={styles.title}>Login</h1>
                <form className={styles.form}>
                    <Input label='Email' type='email' name='email' id='email' placeholder='Masukkan Email' required />
                    <Input label='Password' type='password' name='password' id='password' placeholder='Masukkan Password' required />
                    <Button type='submit'>Login</Button>
                </form>
            </div>
        </main>
    )
}

export default Login;