import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import '../../components/CustomCss/login.scss'
import { loginUser, loginManager } from '../../service/userService' // Import separate functions
import Cookies from 'js-cookie'
import { notification } from 'antd'
import Logo from '../../components/Logo'
import LogoManager from '../../components/Logo/LogoManager'
import { Checkbox } from 'antd'

function Login() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [rememberMe, setRememberMe] = useState(false)
  const navigate = useNavigate()
  const pathName = window.location.pathname
  const isManagerLogin = pathName.includes('loginManager')

  const handleRememberMe = (e) => {
    setRememberMe(e.target.checked)
  }

  const handleSubmit = async (event) => {
    event.preventDefault()

    try {
      let response
      // Call the respective login service based on the login type
      if (isManagerLogin) {
        response = await loginManager(email, password)
      } else {
        response = await loginUser(email, password)
      }
      console.log('Login response:', response) // Debug log

      if (response.status === 200 || response.status === 201 || response.token) {
        // Set token in cookies with different keys based on login type
        const tokenKey = isManagerLogin ? 'managerToken' : 'token'
        const expiresInDays = rememberMe ? 30 : 1

        const userData = response.data
        const token = userData.token
        Cookies.set(tokenKey, token, { expires: expiresInDays })

        // Redirect to respective dashboard based on role or login type
        if (isManagerLogin) {
          //store to local storage
          localStorage.setItem('manager', JSON.stringify(response.data))
          navigate('/admin/managePage') // Redirect manager
        } else {
          localStorage.setItem('user', JSON.stringify(response.data))
          navigate('/') // Redirect normal user
        }
      } else if (response.status === 400) {
        notification.error({
          message: 'Invalid email or password',
          description: 'Please check your email and password and try again',
        })
      } else {
        notification.error({
          message: 'Login failed',
          description: 'An error occurred while logging in. Please try again later.',
        })
      }
    } catch (error) {
      notification.error({
        message: 'Login Error',
        description: 'An unexpected error occurred. Please try again later.',
      })
    }
  }

  return (
    <>
      <div className="login__logo">{isManagerLogin ? <LogoManager /> : <Logo />}</div>
      <div className="login">
        <h2 className="login__title">Sign In</h2>
        <form className="login__form" onSubmit={handleSubmit}>
          <div className="login__form-group">
            <label className="login__label" htmlFor="email">
              Email address
            </label>
            <input
              className="login__input"
              type="text"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <label className="login__label" htmlFor="password">
              Password
            </label>
            <input
              className="login__input"
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <div className="login__authentication">
            <Checkbox className="login__checkbox" onChange={handleRememberMe}>
              Keep me signed in
            </Checkbox>
            <a className="login__forgot-password" href="/forgot-password">
              Forgot password?
            </a>
          </div>
          <button className="login__button" type="submit">
            {isManagerLogin ? 'Sign In as a hotel manager' : 'Sign In'}
          </button>
          {!isManagerLogin && (
            <>
              <p className="login__signup-text">
                Don't have an account? <a href="/register">Sign up</a>
              </p>
              <p className="login__signup-text">
                <a href="/loginManager">Sign in as a hotel manager</a>
              </p>
            </>
          )}
        </form>
      </div>
    </>
  )
}

export default Login
