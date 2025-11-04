import { useNavigate } from 'react-router-dom'
import '../../components/CustomCss/login.scss'
import { register as registerUser } from '../../service/userService'
import { notification } from 'antd'
import Logo from '../../components/Logo'
import ShowPassword from '../../components/ShowPassword'
import useRegisterForm from '../../components/CustomHook/useRegisterForm'

function Register() {
  const navigate = useNavigate()
  const { handleSubmit, errors, fields } = useRegisterForm()

  const onSubmit = async (data) => {
    try {
      const response = await registerUser(data.email, data.password, data.fullName)
      console.log('response', response)
      notification.success({
        message: 'Registration successful',
        description: 'Please check your email to verify your account and complete the registration process.',
      })
      navigate(`/verify?email=${data.email}`)
    } catch (error) {
      console.error('Register error:', error)
      notification.error({
        message: 'Registration failed',
        description: 'An error occurred while registering your account. Please try again later.',
      })
    }
  }

  return (
    <>
      <div className="login__logo">
        <Logo />
      </div>
      <div className="login">
        <h2 className="login__title">Register</h2>
        <form className="login__form" onSubmit={handleSubmit(onSubmit)}>
          <div className="login__form-group">
            <label className="login__label" htmlFor="email">
              Email address
            </label>
            <input
              className="login__input"
              type="text"
              id="email"
              placeholder="Enter email address"
              {...fields.email}
            />
            {errors.email && (
              <span className="error" style={{ color: 'red' }}>
                {errors.email.message}
              </span>
            )}
            {/* Full name */}
            <label className="login__label" htmlFor="fullname">
              Full name
            </label>
            <input
              className="login__input"
              type="text"
              id="fullname"
              placeholder="Enter full name"
              {...fields.fullName}
            />
            {errors.fullName && (
              <span className="error" style={{ color: 'red' }}>
                {errors.fullName.message}
              </span>
            )}
            {/* end fullname */}
            {/* Create password */}
            <label className="login__label" htmlFor="password">
              Create password
            </label>
            <ShowPassword placeholder="Create password" {...fields.password} />
            {errors.password && (
              <span className="error" style={{ color: 'red' }}>
                {errors.password.message}
              </span>
            )}
            {/* Confirm password */}
            <label className="login__label" htmlFor="confirm-password">
              Confirm password
            </label>
            <ShowPassword placeholder="Confirm password" {...fields.confirmPassword} />
            {errors.confirmPassword && (
              <span className="error" style={{ color: 'red' }}>
                {errors.confirmPassword.message}
              </span>
            )}
          </div>
          <div className="login__authentication"></div>
          <button className="login__button" type="submit">
            Verify email
          </button>
          <p className="login__signup-text">
            Already have an account? <a href="/login">Sign in</a>
          </p>
        </form>
      </div>
    </>
  )
}

export default Register
