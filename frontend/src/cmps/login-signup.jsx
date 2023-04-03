import { useState } from 'react'
import { showErrorMsg, showSuccessMsg } from '../services/event-bus.service.js'
import { userService } from "../services/user.service.local"
import { LoginForm } from './login-form.jsx'
import { login, signup } from "../store/user/user.actions"


export function LoginSignup({ onChangeLoginStatus }) {

    const [isSignup, setIsSignUp] = useState(false)

    function onLogin(credentials) {
        isSignup ? signup(credentials) : login(credentials)
    }

    // function login(credentials) {
    //     userService.login(credentials)
    //         .then(onChangeLoginStatus)
    //         .then(() => { showSuccessMsg('Logged in successfully') })
    //         .catch((err) => { showErrorMsg('Oops try again') })
    // }

    // function signup(credentials) {
    //     userService.signup(credentials)
    //         .then(onChangeLoginStatus)
    //         .then(() => { showSuccessMsg('Signed in successfully') })
    //         .catch((err) => { showErrorMsg('Oops try again') })
    // }

    return (
        <div className="login-page">
            <LoginForm
                onLogin={onLogin}
                isSignup={isSignup}
            />
            <div className="btns">
                <a href="#" onClick={() => setIsSignUp(!isSignup)}>
                    {isSignup ?
                        'Already a member? Login' :
                        'New user? Signup here'
                    }
                </a >
            </div>
        </div >
    )
}
