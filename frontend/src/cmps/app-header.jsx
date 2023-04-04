import { BackBtn, ForwardBtn, UserBtn } from './form'
import { LoginSignup } from './login-signup.jsx'
import { logout } from "../store/user.actions"
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'

export function AppHeader() {
  const user = useSelector(storeState => storeState.userModule.user)
  const navigate = useNavigate()

  function onLogout() {
    logout()
    navigate('/')

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
            <LoginSignup />
          </section>
        )}

      </main>
    </header>
  </>
}