import { useState } from 'react'
import { BackBtn, ForwardBtn, UserBtn } from './form'

export function AppHeader() {
  const [isOpenMenu, setIsOpenMenu] = useState(false)

  function onToggleMenu() {
    setIsOpenMenu(!isOpenMenu)
  }

  return <>
    {/* <div className="place"></div> */}
    <header className="app-header">
      <main>
        <nav>
          <BackBtn />
          <ForwardBtn />
        </nav>
        <UserBtn />
        {/* <button className="fa-solid bars menu-toggle-btn"
                    onClick={() => onToggleMenu()}></button>
                {isOpenMenu && <div className="main-screen" onClick={() => onToggleMenu()}>
                    <div className="mobile-menu"></div>
                </div>} */}
      </main>
    </header>
  </>
}