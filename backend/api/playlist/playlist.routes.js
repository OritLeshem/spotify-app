const express = require('express')
// const { requireAuth, requireAdmin } = require('../../middlewares/requireAuth.middleware')
// const { log } = require('../../middlewares/logger.middleware')
const { getPlaylists, getPlaylistById, addPlaylist, updatePlaylist, removePlaylist, addPlaylistMsg, removePlaylistMsg } = require('./playlist.controller')
const router = express.Router()


router.get('/', getPlaylists)
router.get('/:id', getPlaylistById)
router.post('/', addPlaylist)
router.put('/:id', updatePlaylist)
router.delete('/:id', removePlaylist)

module.exports = router