import { useState } from 'react'
import { BackBtn, ForwardBtn, UserBtn } from './form'
import { userService } from "../services/user.service.local"
import { LoginSignup } from './login-signup.jsx'
import { logout } from "../store/user/user.actions"

export function AppHeader() {
  const [user, setUser] = useState(userService.getLoggedinUser())


  function onChangeLoginStatus(user) {
    setUser(user)
  }
  function onLogout() {
    logout()
      .then(() => {
        setUser(null)
      })
  }
  return <>
    <header className="app-header">
      <main>
        <nav>
          <BackBtn />
          <ForwardBtn />
        </nav>
        <UserBtn />
        {user ? (
          < section >
            <span>Hello {user.username} </span>
            <button className="user-login-logout" onClick={onLogout}> Logout</button>
          </ section >
        ) : (
          <section>
            <LoginSignup onChangeLoginStatus={onChangeLoginStatus} />
          </section>
        )}

      </main>
    </header>
  </>
}