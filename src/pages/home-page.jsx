import React, { useEffect, useState } from 'react'
import { PlaylistList } from '../cmps/playlist-list'
import { PlaylistPreview } from '../cmps/playlist-preview'
import { GreenBtn, LibrarySvg } from '../cmps/form'
import { playlistService } from '../services/playlist.service.local'
import { youtubeService } from '../services/youtube.service'

export function HomePage() {
  const [pop, setPop] = useState()
  const [latin, setLatin] = useState()
  const [hiphop, setHiphop] = useState()

  useEffect(() => {

    const latin = playlistService.latin()
    // console.log("latin", latin.songs)
    setLatin(latin)
    const hiphop = playlistService.hiphop()
    // console.log("hiphop", hiphop.songs)
    setHiphop(hiphop)
    const pop = playlistService.pop()
    // console.log("pop", pop.songs)
    setPop(pop)
  }, [])

  youtubeService.getVideoResults("pink")
    .then(res => {
      // console.log('res:', res)
    })

  if (!pop) return
  return <section className="main-page home-page">
    {/* <Music /> */}
    <h2>POP</h2>
    <PlaylistList playlists={pop.songs} />
    <h2>HIPHOP</h2>
    <PlaylistList playlists={hiphop.songs} />
    <h2>LATIN</h2>
    <PlaylistList playlists={latin.songs} />
  </section >
}