import { IWord } from '../../../types/interface'
import { IDataResultSprint } from '../../../types/sprint-interface'

export const dataResultSprint: IDataResultSprint = {
  score: 0,
  learned: {
    stateWords: 'Верно',
    countWords: 0,
    words: {},
    color: 'green',
  },
  unlearned: {
    stateWords: 'Не верно',
    countWords: 0,
    words: {},
    color: 'red',
  },
}

export const dataSprintWords: IWord[] = []

export interface ISprintDescription {
  [key: string]: { [keyInn: string]: string }
}

export const sprintDescription: ISprintDescription = {
  sprint: {
    name: 'Спринт',
    image: './../../rs-lang/img/games/sprint-icon.png',
    content: 'Проверьте, сколько очков вы можете набрать за одну минуту, делая обоснованные предположения о том, что правильно, а что нет',
    url: '/sprint',
  },
}
