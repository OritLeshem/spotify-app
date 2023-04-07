
import { showErrorMsg } from './event-bus.service'
import { httpService } from './http.service.js'

const STORAGE_KEY_LOGGEDIN_USER = 'loggedinUser'

export const userService = {
  getById,
  signup,
  login,
  logout,
  getEmptyCredentials,
  getLoggedinUser,
}

function getById(userId) {
  return httpService.get(`user/${userId}`)
}

async function signup(userCred) {
  try {
    const user = await httpService.post('auth/signup', userCred)
    return saveLocalUser(user)
  }
  catch { showErrorMsg('Username is already taken') }
}

function saveLocalUser(user) {
  user = { _id: user._id, username: user.username }
  sessionStorage.setItem(STORAGE_KEY_LOGGEDIN_USER, JSON.stringify(user))
  return user
}

async function login(userCred) {
  try {
    const user = await httpService.post('auth/login', userCred)
    if (user) {
      return saveLocalUser(user)
    }
  } catch {
    showErrorMsg('Invalid username')
  }
}

async function logout() {
  sessionStorage.removeItem(STORAGE_KEY_LOGGEDIN_USER)
  return await httpService.post('auth/logout')
}

function getEmptyCredentials(username = '') {
  return { username }
}

function getLoggedinUser() {
  return JSON.parse(sessionStorage.getItem('loggedinUser') || null)
}

