import { makeAutoObservable } from 'mobx'

export default class GlobalStore {
  private _isAuth: boolean
  private _isLoading: boolean
  // private _user: Record<string, unknown>

  constructor() {
    this._isAuth = false
    this._isLoading = false

    // this._user = {}
    makeAutoObservable(this)
  }

  setIsAuth(bool: boolean) {
    this._isAuth = bool
  }

  setIsLoading(bool: boolean) {
    this._isLoading = bool
  }
  /*
  setUser(user) {
    this._user = user
  }*/

  get isAuth() {
    return this._isAuth
  }

  get isLoading() {
    return this._isLoading
  }
  /*
  get user() {
    return this._user
  }*/
}
