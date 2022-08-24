interface IMembers {
  [key: string]: { [keyInn: string]: string }
}

export const members: IMembers = {
  Mazayw: {
    name: 'Igor Dronishinets',
    photo: './image/Mazayw.jpg',
    title: 'Junior JavaScript/Frontend Developer',
    content: 'some works',
    link: 'https://github.com/Mazayw/',
  },
  niknikolay: {
    name: 'Nikolay Kyev',
    photo: './image/niknikolay.png',
    title: 'Junior JavaScript/Frontend Developer',
    content: 'some works',
    link: 'https://github.com/niknikolay/',
  },
  rydvone: {
    name: 'Alexander Verbitsky',
    photo: './image/rydvone.jpg',
    title: 'Junior JavaScript/Frontend Developer',
    content: 'some works',
    link: 'https://github.com/rydvone/',
  },
}
