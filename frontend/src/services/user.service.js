
import { storageService } from './async-storage.service.js'
import { showErrorMsg } from './event-bus.service'
import { httpService } from './http.service.js'
import { utilService } from './util.service.js'

const USER_KEY = 'userDB'
// _createUsers()
const STORAGE_KEY_LOGGEDIN_USER = 'loggedinUser'

export const userService = {
  getById,
  // remove,
  signup,
  login,
  logout,
  getEmptyCredentials,
  getLoggedinUser,
}


function getById(userId) {
  return httpService.get(`user/${userId}`)
}

// function remove(userId) {
//   return storageService.remove(USER_KEY, userId)
// }

// function signup(credentials) {
//   return storageService.query(USER_KEY)
//     .then(users => {
//       const existingUser = users.find(u => u.username === credentials.username)
//       if (existingUser) {
//         showErrorMsg('Username already exists, pick another one')
//         return Promise.reject('Username already exists')
//       } else {
//         return storageService.post(USER_KEY, credentials)
//           .then((user) => {
//             _saveLoggedinUser(user)
//             return user
//           })
//       }
//     })
// }
async function signup(userCred) {
  const user = await httpService.post('auth/signup', userCred)
  return saveLocalUser(user)
}
function saveLocalUser(user) {
  user = { _id: user._id, username: user.username }
  sessionStorage.setItem(STORAGE_KEY_LOGGEDIN_USER, JSON.stringify(user))
  return user
}

async function login(userCred) {

  const user = await httpService.post('auth/login', userCred)
  if (user) {
    return saveLocalUser(user)
  }
}
async function logout() {
  sessionStorage.removeItem(STORAGE_KEY_LOGGEDIN_USER)
  return await httpService.post('auth/logout')
}

// function login(credentials) {
//   return storageService.query(USER_KEY)
//     .then(users => {
//       const user = users.find(u => u.username === credentials.username)
//       if (!user) {
//         showErrorMsg("Username doesn't exist, Login failed")
//         return Promise.reject("Username doesn't exist, Login failed")
//       }
//       _saveLoggedinUser(user)
//       return user
//     })
// }

function getEmptyCredentials(username = '') {
  return { username }
}

function getLoggedinUser() {
  console.log(JSON.parse(sessionStorage.getItem('loggedinUser') || null))
  return JSON.parse(sessionStorage.getItem('loggedinUser') || null)
}

// function logout() {
//   sessionStorage.removeItem('loggedinUser')
//   return Promise.resolve()
// }

// function _saveLoggedinUser(user) {
//   sessionStorage.setItem('loggedinUser', JSON.stringify(user))
// }


// function _createUsers() {
//   let users = utilService.loadFromStorage(USER_KEY)
//   if (!users || !users.length) {
//     users = []
//     users.push(_createUser('muki'))
//     users.push(_createUser('puki'))

//     utilService.saveToStorage(USER_KEY, users)
//   }
// }

// function _createUser(username) {
//   const user = getEmptyCredentials(username)
//   user._id = utilService.makeId()
//   return user
// }
//     update
// }

// window.us = userService

// function getUsers() {
//     // return storageService.query('user')
//     return httpService.get(`user`)
// }

// async function getById(userId) {
//     // const user = await storageService.get('user', userId)
//     const user = await httpService.get(`user/${userId}`)

//     // socketService.emit(SOCKET_EMIT_USER_WATCH, userId)
//     // socketService.off(SOCKET_EVENT_USER_UPDATED, onUserUpdate)
//     // socketService.on(SOCKET_EVENT_USER_UPDATED, onUserUpdate)

//     return user
// }

// function remove(userId) {
//     // return storageService.remove('user', userId)
//     return httpService.delete(`user/${userId}`)
// }

// async function update({ _id, score }) {
//     // const user = await storageService.get('user', _id)
//     // user.score = score
//     // await storageService.put('user', user)

//     const user = await httpService.put(`user/${_id}`, { _id, score })
//     // Handle case in which admin updates other user's details
//     if (getLoggedinUser()._id === user._id) _setLoggedinUser(user)
//     return user
// }

// function login(credentials) {
//     console.log('credentials:', credentials)
//     return httpService.post(BASE_URL + 'login', credentials)
//         .then(_setLoggedinUser)
//         .catch(err => {
//             console.log('err:', err)
//             throw new Error('Invalid login')
//         })
// }

// function signup({ username }) {
//     const user = { username }
//     return httpService.post(BASE_URL + 'signup', user)
//         .then(_setLoggedinUser)
// }



// function logout() {
//     return httpService.post(BASE_URL + 'logout')
//         .then(() => {
//             sessionStorage.removeItem(STORAGE_KEY_LOGGEDIN)
//         })
// }

// function getLoggedinUser() {
//     return JSON.parse(sessionStorage.getItem(STORAGE_KEY_LOGGEDIN))
// }

// function _setLoggedinUser(user) {
//     const userToSave = { _id: user._id, username: user.username }
//     sessionStorage.setItem(STORAGE_KEY_LOGGEDIN, JSON.stringify(userToSave))
//     return userToSave
// }




