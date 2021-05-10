import { httpService } from './httpService'

export const authService = {
  login,
  logout,
  signup,
}

async function login(username, password) {
  try {
    const loggedInUser = await httpService.post('auth/login', {
      username,
      password,
    })
    sessionStorage.setItem('loggedInUser', JSON.stringify(loggedInUser))
    return loggedInUser
  } catch (err) {
    console.log('error while fetching login: ', err)
    throw err
  }
}
async function logout() {
  try {
    await httpService.post('auth/logout')
    sessionStorage.setItem('loggedInUser', '')
  } catch (err) {
    console.log('error while fetching logout: ', err)
    throw err
  }
}

async function signup(details) {
  try {
    const loggedInUser = await httpService.post('auth/signup', details)
    sessionStorage.setItem('loggedInUser', JSON.stringify(loggedInUser))
    return loggedInUser
  } catch (err) {
    console.log('error while fetching signup: ', err)
    throw err
  }
}
