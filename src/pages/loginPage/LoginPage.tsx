import { useNavigate } from "react-router-dom"
import { useAuth } from "../../contexts/AuthContext"
import { useState, type SubmitEventHandler } from "react"
import styles from "./LoginPage.module.css"


export default function LoginPage() {
  const { login } = useAuth()
  const navigate = useNavigate()

  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")
  
  const handleSubmit : SubmitEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault()

    try {
      setError("")
      await login(email, password)
      navigate("/")
    } catch {
      setError("ログインに失敗しました")
    }
  }

  return (
    <div className={styles.stack}>
      <div className={styles.row}>
        <div className={styles.title}>Simple</div>
        <form onSubmit={handleSubmit} className={styles.formField}>
          <div className={styles.inputField}>
            <label htmlFor="email" className={styles.labelField}>Email</label>
            <input 
              id="email"
              type="email" 
              className={styles.input}
              value={email}
              onChange={(e) => setEmail(e.target.value)}  
            />
          </div>

          <div className={styles.inputField}>
            <label htmlFor="password" className={styles.labelField}>Password</label>
            <input
              id="password"
              type="password"
              className={styles.input}
              value={password}
              onChange={(e) => setPassword(e.target.value)}  
            />
          </div>

          <button type="submit" className={styles.button}>Login</button>
        </form>

        {error && <p className={styles.errorField}>❗️{error}</p>}
      </div>
    </div>
  )
}
