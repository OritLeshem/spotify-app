
import { Routes, Route } from 'react-router'
import { AppFooter } from './cmps/app-footer'
import { HomePage } from './pages/home-page'
import { AppHeader } from './cmps/app-header'
import { PlaylistIndex } from './pages/playlist-index'
import { PlaylistSearch } from './pages/playlist-search'
import { PlaylistDetail } from './pages/playlist-detail'
import { Navbar } from './cmps/navbar'
import { UserMsg } from './cmps/user-msg'
import { PlaylistEdit } from './pages/playlist-edit'
import { PlaylistGenre } from './pages/playlist-genre'
import { PlaylistLike } from './pages/playlist-like'

export function RootCmp() {


  return (
    <section className="app main-layout">
      <AppHeader />
      <Navbar />
      <Routes >
        <Route path="/" element={<HomePage />} />
        <Route path="/playlist" element={<PlaylistIndex />} />
        <Route path="/search" element={<PlaylistSearch />} />
        <Route path="/create" element={<PlaylistEdit />} />
        <Route path="/like" element={<PlaylistLike />} />
        <Route path="/detail/:playlistId" element={<PlaylistDetail />} />
        <Route path="/genre/:genreName" element={<PlaylistGenre />} />


      </Routes>
      <AppFooter />
      <UserMsg />
    </section>
  )
}

