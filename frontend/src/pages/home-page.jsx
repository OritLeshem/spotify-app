import React, { useEffect, useState } from 'react'
import { PlaylistList } from '../cmps/playlist-list'
import { PlaylistPreview } from '../cmps/playlist-preview'
import { GreenBtn, LibrarySvg } from '../cmps/form'
import { playlistService } from '../services/playlist.service'
import { youtubeService } from '../services/youtube.service'

export function HomePage() {
  const [pop, setPop] = useState()
  const [latin, setLatin] = useState()
  const [hiphop, setHiphop] = useState()

  useEffect(() => {
    const latin = playlistService.latin()
    setLatin(latin)
    const hiphop = playlistService.hiphop()
    setHiphop(hiphop)
    const pop = playlistService.pop()
    setPop(pop)
  }, [])

  youtubeService.getVideoResults('pink')
    .then(res => {
    })

  if (!pop) return
  return <section className='main-page home-page'>
    <h2 className='home-page-title'>POP</h2>
    <PlaylistList playlists={pop.songs} />
    <h2 className='home-page-title'>HIPHOP</h2>
    <PlaylistList playlists={hiphop.songs} />
    <h2 className='home-page-title'>LATIN</h2>
    <PlaylistList playlists={latin.songs} />
  </section >
}