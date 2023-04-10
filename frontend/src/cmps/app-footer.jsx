import { useEffect, useState } from 'react'
import { OptionsBar } from './options-bar'
import { PlayerBar } from './play-bar'

import { SongDisplay } from './song-display'

export function AppFooter() {
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    function handleResize() {
      if (window.innerWidth < 700) setIsMobile(true)
      if (window.innerWidth > 700) setIsMobile(false)
    }
    handleResize()
    window.addEventListener('resize', handleResize)
    return () => {
      window.removeEventListener('resize', handleResize)
    }
  }, [])
  return <footer className='app-footer'>
    <main>
      <SongDisplay />
      <PlayerBar />
      {!isMobile && <OptionsBar />}
    </main>
  </footer>
}