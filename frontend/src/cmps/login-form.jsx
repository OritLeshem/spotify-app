import { useState } from 'react'
import { userService } from '../services/user.service'

export function LoginForm({ onLogin, isSignup }) {

    const [credentials, setCredentials] = useState(userService.getEmptyCredentials())

    function handleChange({ target }) {
        const { name: field, value } = target
        setCredentials(prevCreds => ({ ...prevCreds, [field]: value }))
    }

    function handleSubmit(ev) {
        ev.preventDefault()
        onLogin(credentials)
    }

    return (
        <form className='login-form' onSubmit={handleSubmit}>
            <input
                type='text'
                name='username'
                value={credentials.username}
                placeholder='Username'
                onChange={handleChange}
                required
                autoFocus
            />
            <button className='user-login-logout'>{isSignup ? 'Signup' : 'Login'}</button>
        </form>
    )
}