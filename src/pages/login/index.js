import { useNavigate } from 'react-router-dom'
import '../../components/CustomCss/login.scss'
import { loginUser, loginManager } from '../../service/userService'
import Cookies from 'js-cookie'
import { notification } from 'antd'
import Logo from '../../components/Logo'
import LogoManager from '../../components/Logo/LogoManager'
import { Checkbox } from 'antd'
import useLoginForm from '../../components/CustomHook/useLoginForm'

function Login() {
  const navigate = useNavigate()
  const pathName = window.location.pathname
  const isManagerLogin = pathName.includes('loginManager')
  const { handleSubmit, errors, fields } = useLoginForm()

  const onSubmit = async (data) => {
    try {
      let response
      if (isManagerLogin) {
        response = await loginManager(data.email, data.password)
      } else {
        response = await loginUser(data.email, data.password)
      }
      console.log('Login response:', response)

      if (response.status === 200 || response.status === 201 || response.token) {
        const tokenKey = isManagerLogin ? 'managerToken' : 'token'
        const expiresInDays = data.rememberMe ? 30 : 1
        const userData = response.data
        const token = userData.token
        Cookies.set(tokenKey, token, { expires: expiresInDays })

        if (isManagerLogin) {
          localStorage.setItem('manager', JSON.stringify(response.data))
          navigate('/admin/managePage')
        } else {
          localStorage.setItem('user', JSON.stringify(response.data))
          navigate('/')
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
        <form className="login__form" onSubmit={handleSubmit(onSubmit)}>
          <div className="login__form-group">
            <label className="login__label" htmlFor="email">
              Email address
            </label>
            <input className="login__input" type="text" id="email" {...fields.email} />
            {errors.email && (
              <span className="error" style={{ color: 'red' }}>
                {errors.email.message}
              </span>
            )}
            <label className="login__label" htmlFor="password">
              Password
            </label>
            <input className="login__input" type="password" id="password" {...fields.password} />
            {errors.password && (
              <span className="error" style={{ color: 'red' }}>
                {errors.password.message}
              </span>
            )}
          </div>
          <div className="login__authentication">
            <Checkbox className="login__checkbox" {...fields.rememberMe}>
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
