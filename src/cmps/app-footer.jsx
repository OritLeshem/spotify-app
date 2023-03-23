import { OptionsBar } from './options-bar'
// import { PlayerBar } from './player-bar'
import { PlayerBar } from './player-bar-copy'

import { SongDisplay } from './song-display'

export function AppFooter() {

  return <footer className="app-footer">
    <main>
      <SongDisplay />
      <PlayerBar />
      <OptionsBar />
    </main>
  </footer>
}