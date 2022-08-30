import styles from './styles.module.scss';
import { CreateTextbookSectionsButtons } from './CreateTextbookSectionsButtons';
import { useState } from 'react';
import { WordButtons } from './WordButtons';
import { Word } from './Word';
import { TextbookPagesButtons } from './TextbookPagesButtons';
import { IWord, IUserWord } from '../../types/interface';
import apiService from '../../api/api-service';
import { base } from '../../settings';

export const INDEX_STAR_SECTION_BUTTON = 10;

function Vocabulary({ isAuthorized, setIsAuthorized, words, setWords, dbUserWords, setDbUserWords, hardWord, setHardWord, easyWord, setEasyWord, hardWordsId, setHardWordsId, easyWordsId, setEasyWordsId, check20EasyWordsInPage, setCheck20EasyWordsInPage, word, setWord }: { isAuthorized: boolean, setIsAuthorized: React.Dispatch<React.SetStateAction<boolean>>, words: IWord[], setWords: React.Dispatch<React.SetStateAction<IWord[]>>, dbUserWords: IUserWord[], setDbUserWords: React.Dispatch<React.SetStateAction<IUserWord[]>>, hardWord: IWord[], setHardWord: React.Dispatch<React.SetStateAction<IWord[]>>, easyWord: IWord[], setEasyWord: React.Dispatch<React.SetStateAction<IWord[]>>, hardWordsId: string[], setHardWordsId: React.Dispatch<React.SetStateAction<string[]>>, easyWordsId: string[], setEasyWordsId: React.Dispatch<React.SetStateAction<string[]>>, check20EasyWordsInPage: IWord[], setCheck20EasyWordsInPage: React.Dispatch<React.SetStateAction<IWord[]>>, word: IWord, setWord: React.Dispatch<React.SetStateAction<IWord>> }) {

  const sectionsButtonsText = ['A1', 'A2', 'B1', 'B2', 'C1', 'C2'];
  const [buttonSectionCurrentIndex, setButtonSectionCurrentIndex] = useState(0);
  const [buttonWordCurrentIndex, setButtonWordCurrentIndex] = useState(0);
  const [textbookNumberPage, setTextbookNumberPage] = useState(0);
  const [token, setToken] = useState(localStorage.getItem('token'));

  function chek20EasyWords(first: string[], second: IWord[]) {
    return first.reduce((acc: IWord[], item) => {
      const val = second.find(el => el.id === item);
      return val ? [...acc, val] : acc;
    }, []);
  }

  const handlerClickCreateUserWord = async (e: React.MouseEvent<HTMLButtonElement, MouseEvent>, wordId: string) => {
    const userId = localStorage.getItem('userId') as string;
    const token = localStorage.getItem('token') as string;

    setToken(token);
    if (INDEX_STAR_SECTION_BUTTON === buttonSectionCurrentIndex) {

      await apiService.deleteUserWord(userId, wordId, token);

      const dbDelWord = dbUserWords.filter((word) => word.optional.wordId !== wordId) as IUserWord[];
      setDbUserWords(() => dbDelWord);
      const deleteHardWordsId = hardWordsId.filter((id) => id !== wordId);
      setHardWordsId(deleteHardWordsId);
      const data = await apiService.getAllAgregatedWordsFilterHard(userId, '3600', token) as [{ paginatedResults: Array<IWord>, totalCount: [{ count: number } | []] }];

      if (data[0].paginatedResults.length !== 0) {

        setWords(() => data[0].paginatedResults);
        setWord(() => data[0].paginatedResults[0]);
        setHardWord(() => data[0].paginatedResults);
        setButtonWordCurrentIndex(0);
      } else {
        setWords(() => []);
        setWord({} as IWord);
        setHardWord(() => []);
        setHardWordsId(() => []);
      }
      return;
    }

    if (easyWordsId.includes(wordId)) {
      setCheck20EasyWordsInPage([]);

      await apiService.deleteUserWord(userId, wordId, token);

      const dbDelWord = dbUserWords.filter((word) => word.optional.wordId !== wordId) as IUserWord[];
      const deleteEasyWordsId = easyWordsId.filter((id) => id !== wordId);
      setEasyWordsId(deleteEasyWordsId);
      const deleteEasyWord = easyWord.filter((word) => (word.id || word._id) !== wordId);
      setEasyWord(deleteEasyWord);

      const body = {
        difficulty: 'hard',
        optional: {
          isStudied: false,
          activeColor: '#F5443B',
          wordId: wordId
        }
      };
      const data = await apiService.createUserWord(userId, wordId, body, token) as IUserWord;

      setDbUserWords(() => [...dbDelWord, data])
      setHardWord([...hardWord, word]);
      setHardWordsId([...hardWordsId, wordId]);

      const arrWordsInPage = await apiService.getAllWords(buttonSectionCurrentIndex.toString(), textbookNumberPage.toString()) as IWord[];
      const check = chek20EasyWords(deleteEasyWordsId, arrWordsInPage);
      setCheck20EasyWordsInPage(() => check);
    } else {
      const body = {
        difficulty: 'hard',
        optional: {
          isStudied: false,
          activeColor: '#F5443B',
          wordId: wordId
        }
      };
      const data = await apiService.createUserWord(userId, wordId, body, token) as IUserWord;

      setDbUserWords(() => [...dbUserWords, data])
      setHardWord([...hardWord, word])
      setHardWordsId([...hardWordsId, wordId])
    }
  }

  const handlerClickSectionButton = async (e: React.MouseEvent<HTMLButtonElement, MouseEvent>, index: number) => {
    setCheck20EasyWordsInPage([]);
    setButtonWordCurrentIndex(0);
    setButtonSectionCurrentIndex(index);
    setTextbookNumberPage(0);
    const data = await apiService.getAllWords(index.toString(), '0') as IWord[];
    const check = chek20EasyWords(easyWordsId, data);
    setCheck20EasyWordsInPage(() => check);
    setWords(() => data);
    setWord(() => data[0]);
    sessionStorage.setItem('sectionButtonNumber', index.toString());
  }

  const handlerClickHardButton = async () => {
    setButtonWordCurrentIndex(0);
    setButtonSectionCurrentIndex(10);
    setTextbookNumberPage(0);
    const userId = localStorage.getItem('userId') as string;
    const token = localStorage.getItem('token') as string;

    if (!isAuthorized) {
      setWords(() => []);
      setWord({} as IWord);
      sessionStorage.setItem('sectionButtonNumber', '10');
    } else {
      const data = await apiService.getAllAgregatedWordsFilterHard(userId, '3600', token) as [{ paginatedResults: Array<IWord>, totalCount: [{ count: number } | []] }];

      if (data[0].paginatedResults.length !== 0) {

        setWords(() => data[0].paginatedResults);
        setWord(() => data[0].paginatedResults[0]);
      } else {
        setWords(() => []);
        setWord({} as IWord);
      }
      sessionStorage.setItem('sectionButtonNumber', '10');
    }

  }

  const handlerClickWordButtons = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>, index: number) => {
    const wordIndex = words.findIndex((_, wordIndex) => wordIndex === index);
    setWord(() => words[wordIndex]);
    setButtonWordCurrentIndex(index);
  }

  const handlerClickPrevPage = async (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    setCheck20EasyWordsInPage([]);
    const page = textbookNumberPage - 1;
    const data = await apiService.getAllWords(buttonSectionCurrentIndex.toString(), page.toString()) as IWord[];
    const check = chek20EasyWords(easyWordsId, data);
    setCheck20EasyWordsInPage(() => check);
    setWords(() => data);
    setWord(() => data[0]);
    setTextbookNumberPage(() => page);
    setButtonWordCurrentIndex(0);
    sessionStorage.setItem('pageButtonNumber', page.toString());
  }

  const handlerClickNextPage = async (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    setCheck20EasyWordsInPage([]);
    const page = textbookNumberPage + 1;
    const data = await apiService.getAllWords(buttonSectionCurrentIndex.toString(), page.toString()) as IWord[];
    const check = chek20EasyWords(easyWordsId, data);
    setCheck20EasyWordsInPage(() => check);
    setWords(() => data);
    setWord(() => data[0]);
    setTextbookNumberPage(() => page);
    setButtonWordCurrentIndex(0);
    sessionStorage.setItem('pageButtonNumber', page.toString());
  }

  const handlerClickStudiedWord = async (e: React.MouseEvent<HTMLButtonElement, MouseEvent>, wordId: string) => {
    const userId = localStorage.getItem('userId') as string;
    const token = localStorage.getItem('token') as string;
    setToken(token);
    setCheck20EasyWordsInPage([]);

    if (INDEX_STAR_SECTION_BUTTON === buttonSectionCurrentIndex) {

      await apiService.deleteUserWord(userId, wordId, token);

      const dbDelWord = dbUserWords.filter((word) => word.optional.wordId !== wordId) as IUserWord[];
      const deleteHardWordsId = hardWordsId.filter((id) => id !== wordId);
      setHardWordsId(deleteHardWordsId);
      const data = await apiService.getAllAgregatedWordsFilterHard(userId, '3600', token) as [{ paginatedResults: Array<IWord>, totalCount: [{ count: number } | []] }];

      if (data[0].paginatedResults.length !== 0) {

        setWords(() => data[0].paginatedResults);
        setWord(() => data[0].paginatedResults[0]);
        setHardWord(() => data[0].paginatedResults);
        setButtonWordCurrentIndex(0);
      } else {
        setWords(() => []);
        setWord({} as IWord);
        setHardWord(() => []);
        setHardWordsId(() => []);
      }

      const body = {
        difficulty: 'easy',
        optional: {
          isStudied: true,
          activeColor: '#F5443B',
          wordId: wordId
        }
      };

      const create = await apiService.createUserWord(userId, wordId, body, token) as IUserWord;

      setDbUserWords(() => [...dbDelWord, create]);
      setEasyWord([...easyWord, word]);
      setEasyWordsId([...easyWordsId, wordId]);

      return;
    }

    if (easyWordsId.includes(wordId)) {

      await apiService.deleteUserWord(userId, wordId, token);

      const dbDelWord = dbUserWords.filter((word) => word.optional.wordId !== wordId) as IUserWord[];
      setDbUserWords(() => dbDelWord);
      const deleteEasyWordsId = easyWordsId.filter((id) => id !== wordId);
      setEasyWordsId(deleteEasyWordsId);
      const deleteEasyWord = easyWord.filter((word) => (word.id || word._id) !== wordId);
      setEasyWord(deleteEasyWord);
      setWords(() => words);

      const data = await apiService.getAllWords(buttonSectionCurrentIndex.toString(), textbookNumberPage.toString()) as IWord[];
      const check = chek20EasyWords(deleteEasyWordsId, data);
      setCheck20EasyWordsInPage(() => check);
      return;
    }

    if (hardWordsId.includes(wordId)) {

      await apiService.deleteUserWord(userId, wordId, token);

      const dbDelWord = dbUserWords.filter((word) => word.optional.wordId !== wordId) as IUserWord[];
      const deleteHardWordsId = hardWordsId.filter((id) => id !== wordId);
      setHardWordsId(deleteHardWordsId);
      setHardWord(hardWord.filter((word) => (word.id || word._id) !== wordId));

      const body = {
        difficulty: 'easy',
        optional: {
          isStudied: true,
          activeColor: '#F5443B',
          wordId: wordId
        }
      };
      const data = await apiService.createUserWord(userId, wordId, body, token) as IUserWord;

      setDbUserWords(() => [...dbDelWord, data]);
      setEasyWord([...easyWord, word]);
      const addEasyWordsId = [...easyWordsId, wordId];
      setEasyWordsId([...easyWordsId, wordId]);

      const arrWordsInPage = await apiService.getAllWords(buttonSectionCurrentIndex.toString(), textbookNumberPage.toString()) as IWord[];
      const check = chek20EasyWords(addEasyWordsId, arrWordsInPage);
      setCheck20EasyWordsInPage(() => check);
    } else {
      const body = {
        difficulty: 'easy',
        optional: {
          isStudied: true,
          activeColor: '#F5443B',
          wordId: wordId
        }
      };
      const data = await apiService.createUserWord(userId, wordId, body, token) as IUserWord;

      setDbUserWords(() => [...dbUserWords, data]);
      setEasyWord([...easyWord, word]);
      const addEasyWordsId = [...easyWordsId, wordId];
      setEasyWordsId(() => [...easyWordsId, wordId]);

      const arrWordsInPage = await apiService.getAllWords(buttonSectionCurrentIndex.toString(), textbookNumberPage.toString()) as IWord[];
      setCheck20EasyWordsInPage(() => chek20EasyWords(addEasyWordsId, arrWordsInPage));
    }
  }

  const handlerClickAudio = async (e: React.MouseEvent<HTMLButtonElement, MouseEvent>, audio: string, audioMeaning: string, audioExample: string) => {
    const audioPlayer = new Audio(`${base}/${audio}`);
    audioPlayer.play();
    audioPlayer.onended = function () {
      const audioPlayer = new Audio(`${base}/${audioMeaning}`);
      audioPlayer.play();
      audioPlayer.onended = function () {
        const audioPlayer = new Audio(`${base}/${audioExample}`);
        audioPlayer.play();
      }
    }
  }

  console.log('currentIndex', buttonSectionCurrentIndex, words, textbookNumberPage, hardWord);
  return <main className={styles.main}>
    <CreateTextbookSectionsButtons sections={sectionsButtonsText} buttonSectionCurrentIndex={buttonSectionCurrentIndex} onClickSectionButton={handlerClickSectionButton} onClickSectionHardButton={handlerClickHardButton} />
    <Word {...word} ClickStudiedWord={handlerClickStudiedWord} ClickCreateUserWord={handlerClickCreateUserWord} hardWordsId={hardWordsId} easyWordsId={easyWordsId} ClickAudio={handlerClickAudio} isAuthorized={isAuthorized} buttonSectionCurrentIndex={buttonSectionCurrentIndex} />
    <WordButtons words={words} buttonWordCurrentIndex={buttonWordCurrentIndex} clickWordButtons={handlerClickWordButtons} hardWord={hardWord} hardWordsId={hardWordsId} easyWordsId={easyWordsId} isAuthorized={isAuthorized} dbUserWords={dbUserWords} easyWord={easyWord} />
    <TextbookPagesButtons textbookNumberPage={textbookNumberPage} buttonSectionCurrentIndex={buttonSectionCurrentIndex} clickPrevPage={handlerClickPrevPage} clickNextPage={handlerClickNextPage} check20EasyWordsInPage={check20EasyWordsInPage} />
  </main>
}
export default Vocabulary
