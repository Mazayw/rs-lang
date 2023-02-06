import { makeAutoObservable } from 'mobx'
import { IAnswer } from '../components/types/sprint-interface'

export default class AudioCallStore {
  private _current: number
  private _answers: string[]
  private _gameState: number
  private _looseCounter: number
  private _answersArr: IAnswer[]

  constructor() {
    this._current = 0
    this._answers = []
    this._gameState = 0
    this._looseCounter = 0
    this._answersArr = []

    makeAutoObservable(this)
  }

  setCurrent(num: number) {
    this._current = num
  }

  setAnswers(str: string[]) {
    this._answers = str
  }

  setGameState(num: number) {
    this._gameState = num
  }

  setLooseCounter(num: number) {
    this._looseCounter = num
  }

  setAnswersArr(arr: IAnswer[]) {
    this._answersArr = arr
  }

  get currentState() {
    return this._current
  }

  get answers() {
    return this._answers
  }

  get gameState() {
    return this._gameState
  }

  get looseCounter() {
    return this._looseCounter
  }

  get answersArr() {
    return this._answersArr
  }
}
