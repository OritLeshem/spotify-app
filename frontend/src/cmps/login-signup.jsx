import { useState } from 'react'
import { LoginForm } from './login-form.jsx'
import { login, signup } from '../store/user.actions'

export function LoginSignup({ onChangeLoginStatus }) {

    const [isSignup, setIsSignUp] = useState(false)

    function onLogin(credentials) {
        isSignup ? signup(credentials) : login(credentials)
    }

    return (
        <div className='login-page'>
            <LoginForm
                onLogin={onLogin}
                isSignup={isSignup}
            />
            <div className='btns'>
                <a href='#' onClick={() => setIsSignUp(!isSignup)}>
                    {isSignup ?
                        'Already a member? Login' :
                        'New user? Signup here'
                    }
                </a >
            </div>
        </div >
    )
}
