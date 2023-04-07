import { utilService } from './util.service.js'
import { storageService } from './async-storage.service.js'
import { showErrorMsg, showSuccessMsg } from './event-bus.service'

const USER_KEY = 'userDB'
_createUsers()

export const userService = {
    getById,
    remove,
    signup,
    login,
    logout,
    getEmptyCredentials,
    getLoggedinUser,
}

function getById(userId) {
    return storageService.get(USER_KEY, userId)
}

function remove(userId) {
    return storageService.remove(USER_KEY, userId)
}

function signup(credentials) {
    return storageService.query(USER_KEY)
        .then(users => {
            const existingUser = users.find(u => u.username === credentials.username)
            if (existingUser) {
                showErrorMsg('Username already exists, pick another one')
                return Promise.reject('Username already exists')
            } else {
                return storageService.post(USER_KEY, credentials)
                    .then((user) => {
                        _saveLoggedinUser(user)
                        return user
                    })
            }
        })
}

function login(credentials) {
    return storageService.query(USER_KEY)
        .then(users => {
            const user = users.find(u => u.username === credentials.username)
            if (!user) {
                showErrorMsg("Username doesn't exist, Login failed")
                return Promise.reject("Username doesn't exist, Login failed")
            }
            _saveLoggedinUser(user)
            return user
        })
}

function getEmptyCredentials(username = '') {
    return { username }
}

function getLoggedinUser() {
    console.log(JSON.parse(sessionStorage.getItem('loggedinUser') || null))
    return JSON.parse(sessionStorage.getItem('loggedinUser') || null)
}

function logout() {
    sessionStorage.removeItem('loggedinUser')
    return Promise.resolve()
}

function _saveLoggedinUser(user) {
    sessionStorage.setItem('loggedinUser', JSON.stringify(user))
}


function _createUsers() {
    let users = utilService.loadFromStorage(USER_KEY)
    if (!users || !users.length) {
        users = []
        users.push(_createUser('muki'))
        users.push(_createUser('puki'))

        utilService.saveToStorage(USER_KEY, users)
    }
}

function _createUser(username) {
    const user = getEmptyCredentials(username)
    user._id = utilService.makeId()
    return user
}