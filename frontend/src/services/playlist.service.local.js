import { storageService } from './async-storage.service'
import { utilService } from './util.service'
import defaultPhoto from '../assets/imgs/add-pic.png'
const STORAGE_KEY = 'playlist'

_createPlaylists()

export const playlistService = {
  query,
  getById,
  save,
  remove,
  getEmptyPlaylist,
  getDefaultFilter,
  pop,
  hiphop,
  latin
}

async function query() {
  let playlists = await storageService.query(STORAGE_KEY)

  return playlists
}

function getById(playlistId) {
  return storageService.get(STORAGE_KEY, playlistId)
}

async function remove(playlistId) {
  await storageService.remove(STORAGE_KEY, playlistId)
}

async function save(playlist) {
  let savedPlaylist
  if (playlist._id) {
    savedPlaylist = await storageService.put(STORAGE_KEY, playlist)
  } else {
    savedPlaylist = await storageService.post(STORAGE_KEY, playlist)
  }
  return savedPlaylist
}

function getEmptyPlaylist() {
  return {
    name: "playlist",
    tags: ["Funk", "Happy"],
    createdBy: {
      "_id": "u101",
      "fullname": "Puki Ben David",
      "imgUrl": "../assets/imgs/add-pic.png"
    },
    imgUrl: defaultPhoto,
    songs: []
  }
}
function getDefaultFilter() {
  return { txt: '' }
}

function _createPlaylists() {
  let playlists = utilService.loadFromStorage(STORAGE_KEY)
  if (!playlists || !playlists.length) {
    playlists = [{
      "_id": "642ccee08a4d6ae1ec6766c8",
      "name": "Spears",
      "tags": [
        "Funk",
        "Happy"
      ],
      "createdBy": {
        "_id": "u101",
        "username": "Puki",
        "imgUrl": "../assets/imgs/add-pic.png"
      },
      "likedByUsers": ['{minimal-user}', '{minimal-user}'],
      "songs": [
        {
          "id": "Q4VK9_CfOLQ",
          "title": "Spears1",
          "url": "youtube/song.mp4",
          "imgUrl": "https://i.ytimg.com/vi/C-u5WLJ9Yk4/default.jpg",
          "artist": "Spears"
        },
        {
          "id": "8YzabSdk7ZA",
          "title": "Spears2",
          "url": "youtube/song.mp4",
          "imgUrl": "https://i.ytimg.com/vi/CduA0TULnow/default.jpg",
          "artist": "Spears"
        },
        {
          "id": "t0bPrt69rag",
          "title": "Spears3",
          "url": "youtube/song.mp4",
          "imgUrl": "https://i.ytimg.com/vi/t0bPrt69rag/hqdefault.jpg",
          "artist": "Spears"
        },
        {
          "id": "AJWtLf4-WWs",
          "title": "Spears4",
          "url": "youtube/song.mp4",
          "imgUrl": "https://i.ytimg.com/vi/AJWtLf4-WWs/hqdefault.jpg",
          "artist": "Spears"
        },
        {
          "id": "XniAE34FShA",
          "title": "Spears5",
          "url": "youtube/song.mp4",
          "imgUrl": "https://i.ytimg.com/vi/XniAE34FShA/hqdefault.jpg",
          "artist": "Spears"
        },
        {
          "id": "s6b33PTbGxk",
          "title": "Spears6",
          "url": "youtube/song.mp4",
          "imgUrl": "https://i.ytimg.com/vi/s6b33PTbGxk/hqdefault.jpg",
          "artist": "Spears"
        },
        {
          "id": "T-sxSd1uwoU",
          "title": "Spears7",
          "url": "youtube/song.mp4",
          "imgUrl": "https://i.ytimg.com/vi/T-sxSd1uwoU/hqdefault.jpg",
          "artist": "Spears"
        },
        {
          "id": "PZYSiWHW8V0",
          "title": "Spears8",
          "url": "youtube/song.mp4",
          "imgUrl": "https://i.ytimg.com/vi/PZYSiWHW8V0/hqdefault.jpg",
          "artist": "Spears"
        },

      ],
    },
    {
      "_id": "5cksxjas89xjsa8xjsa8jxs10",
      "name": "Madona",
      "tags": [
        "Funk",
        "Happy"
      ],
      "createdBy": {
        "_id": "u101",
        "username": "Puki",
        "imgUrl": defaultPhoto,
      },
      "likedByUsers": ['{minimal-user}', '{minimal-user}'],
      "songs": [
        {
          "id": "GTxPUFWjOlQ",
          "title": "Madona1",
          "url": "youtube/song.mp4",
          "imgUrl": "https://i.ytimg.com/vi/zpzdgmqIHOQ/default.jpg",
          "artist": "Madona"
        },
        {
          "id": "zpzdgmqIHOQ",
          "title": "Madona2",
          "url": "youtube/song.mp4",
          "imgUrl": "https://i.ytimg.com/vi/EDwb9jOVRtU/default.jpg",
          "artist": "Madona"

        },
      ],
    }]
    utilService.saveToStorage(STORAGE_KEY, playlists)
  }
}



function hiphop() {
  const hiphop = {
    "_id": "5cksxjas89xjsa8xjsa8jxs30",
    "name": "HIPHOP",
    "tags": [
      "hiphop",
      "Happy"
    ],
    "songs": [{
      "id": "rwYrEEka1mc",
      "name": "Best of Old School Rap Songs",
      "description": "The best of 90's Hip Hop! Strictly Old School Rap Songs from the Eastcoast all the way to the Westcoast. Rap Classics by some of ...",
      "tags": [
        "Hiphop",
        "Happy"
      ],
      "imgUrl": "https://i.ytimg.com/vi/rwYrEEka1mc/hqdefault.jpg",
    },
    {
      "id": "D0XUFnkJf8o",
      "name": "🔥 Hot Right Now - Best of 2022",
      "description": "The best Hip Hop and R&B songs of 2022 in the mix! Including the hottest club edits and remixes of the year. The perfect mix for ...",
      "tags": [
        "Hiphop",
        "Happy"
      ],
      "imgUrl": "https://i.ytimg.com/vi/D0XUFnkJf8o/hqdefault.jpg",
    },
    {
      "id": "4UZtwZYB55Q",
      "name": "HipHop 2022 🔥 Hip Hop",
      "description": "Hi bro, every day my channel updates a music playlist that synthesizes carefully selected hip-hop songs to bring a good ...",
      "tags": [
        "Hiphop",
        "Happy"
      ],
      "imgUrl": "https://i.ytimg.com/vi/4UZtwZYB55Q/hqdefault.jpg",
    },

    {
      "id": "bImx3tpGR5w",
      "name": "Hip Hop Mix 2020",
      "description": "Hip Hop l Mix 2020 The Best of Hip Hop 2020 ",
      "tags": [
        "Hiphop",
        "Happy"
      ],
      "imgUrl": "https://i.ytimg.com/vi/bImx3tpGR5w/hqdefault.jpg",
    }
    ]
  }
  return hiphop
}

function pop() {
  const pop = {
    "_id": "5cksxjas89xjsa8xjsa8jxs20",
    "name": "POP",
    "tags": [
      "POP",
      "Happy"
    ],

    "songs": [{
      "_id": "4m1EFMoRFvY",
      "name": "Beyoncé - Single Ladies",
      "description": "Beyoncé's official 'Single Ladies",
      "tags": [
        "Pop",
        "Happy"
      ],
      "imgUrl": "https://i.ytimg.com/vi/4m1EFMoRFvY/hqdefault.jpg",
    },
    {
      "_id": "7hPMmzKs62w",
      "name": "Madonna - Bitch I&#39",
      "description": "Bitch I'm Madonna” from 'Rebel Heart",
      "tags": [
        "Pop",
        "Happy"
      ],
      "imgUrl": "https://i.ytimg.com/vi/7hPMmzKs62w/hqdefault.jpg",
    },
    {
      "_id": "My2FRPA3Gf8",
      "name": "Miley Cyrus - Wrecking Ball",
      "description": "Miley Cyrus' - 'Wrecking Ball",
      "tags": [
        "Pop",
        "Happy"
      ],
      "imgUrl": "https://i.ytimg.com/vi/My2FRPA3Gf8/hqdefault.jpg",
    },
    {
      "_id": "HjBo--1n8lI",
      "name": "Rihanna’s FULL Apple Music Super Bowl LVII Halftime Show",
      "description": "Listen to Rihanna's iconic hits in Spatial Audio on Apple Music: http://apple.co/RihannaSpatialYT ...",
      "tags": [
        "Pop",
        "Happy"
      ],
      "imgUrl": "https://i.ytimg.com/vi/HjBo--1n8lI/hqdefault.jpg",
    },
    ],
  }
  return pop
}

function latin() {
  const latin = {
    "_id": "5cksxjas89xjsa8xjsa8jxs30",
    "name": "LATIN",
    "tags": [
      "hiphop",
      "Happy"
    ],
    "songs": [

      {
        "id": "2pXRfMy-aEM",
        "name": "Fiesta Latina Mix 2020",
        "description": "Fiesta Latina Mix 2020 - Maluma, Shakira, Daddy Yankee, Wisin, Nicky Jam Pop Latino Reggaeton.",
        "tags": [
          "latino",
          "Happy"
        ],
        "imgUrl": "https://i.ytimg.com/vi/2pXRfMy-aEM/hqdefault.jpg",
      },
      {
        "id": "kT-wiUv1VmE",
        "name": "Café Latino - Putumayo Presents",
        "description": "Experience Latin café culture with these exceptional singer-songwriters from Mexico City to Buenos Aires.",
        "tags": [
          "latino",
          "Happy"
        ],
        "imgUrl": "https://i.ytimg.com/vi/kT-wiUv1VmE/hqdefault.jpg",
      },
      {
        "id": "pRpeEdMmmQ0",
        "name": "Shakira - Waka Waka (This Time for Africa)",
        "description": "Watch the official music video for Waka Waka (This Time for Africa)",
        "tags": [
          "latino",
          "Happy"
        ],
        "imgUrl": "https://i.ytimg.com/vi/pRpeEdMmmQ0/hqdefault.jpg",
      },
      {
        "id": "4I25nV9hXGA",
        "name": "Shakira",
        "description": "Shakira, Rauw Alejandro - Te Felicito: https://SML.lnk.to/TeFelicito Apple Music: https://SML.lnk.to/TeFelicito/applemusic Spotify: ...",
        "tags": [
          "latino",
          "Happy"
        ],
        "imgUrl": "https://i.ytimg.com/vi/4I25nV9hXGA/hqdefault.jpg",
      },
    ]
  }
  return latin
}