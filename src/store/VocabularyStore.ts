import { makeAutoObservable } from 'mobx'
import { IWord } from '../components/types/interface'

export default class VocabularyStore {
  private _word: IWord
  private _words: IWord[]
  private _group: number
  private _page: number
  private _selectedWordId: string
  private _selectedWordIndex: number

  constructor() {
    this._word = {} as IWord
    this._words = []
    this._group = 0
    this._page = 0
    this._selectedWordId = ''
    this._selectedWordIndex = 0

    makeAutoObservable(this)
  }

  setWord(obj: IWord) {
    this._word = obj
  }

  setSelectedWordIndex(num: number) {
    this._selectedWordIndex = num
  }

  setSelectedWordId(id: string) {
    this._selectedWordId = id
  }

  setWords(arr: IWord[]) {
    this._words = arr
  }

  setPage(num: number) {
    this._page = num
  }

  setGroup(num: number) {
    this._group = num
  }

  get word() {
    return this._word
  }

  get selectedWordId() {
    return this._selectedWordId
  }

  get selectedWordIndex() {
    return this._selectedWordIndex
  }

  get words() {
    return this._words
  }

  get page() {
    return this._page
  }
  get group() {
    return this._group
  }
}
