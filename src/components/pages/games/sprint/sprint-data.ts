import { IWord } from '../../../types/interface'
import { IDataResultSprint } from '../../../types/sprint-interface'

export const dataResultSprint: IDataResultSprint = {
  score: 0,
  learned: {
    stateWords: 'You learned',
    countWords: 0,
    words: {},
    color: 'green',
  },
  unlearned: {
    stateWords: 'You unlearned',
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
  audiocall: {
    name: 'Audiocall',
    image: './img/games/audiocall-icon.png',
    content: 'Check your listening skills, trying to pick the right meaning after hearing a word. Be careful, as you just have one guess.',
    url: '/audiocall',
  },
  sprint: {
    name: 'Sprint',
    image: './img/games/sprint-icon.png',
    content: 'Check how much points you can get in one minute, making educated guesses about what is right and what is wrong.',
    url: '/sprint',
  },
}
