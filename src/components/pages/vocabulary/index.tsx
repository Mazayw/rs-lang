import styles from './styles.module.scss';
import { CreateTextbookSectionsButtons } from './CreateTextbookSectionsButtons';
import { useEffect, useState } from 'react';
import { WordButtons } from './WordButtons';
import { Word } from './Word';
import { TextbookPagesButtons } from './TextbookPagesButtons';
import { IWord, IUserWord } from '../../types/interface';
import apiService from '../../api/api-service';
import { base } from '../../settings';

export const INDEX_STAR_SECTION_BUTTON = 10;

function Vocabulary({ check20WordsInPage, setCheck20WordsInPage }: { check20WordsInPage: IWord[], setCheck20WordsInPage: React.Dispatch<React.SetStateAction<IWord[]>> }) {

  const [word, setWord] = useState({} as IWord)
  const [words, setWords] = useState([] as IWord[]);
  const [hardWord, setHardWord] = useState([] as IWord[]);
  const [easyWord, setEasyWord] = useState([] as IWord[]);
  const [hardWordsId, setHardWordsId] = useState([] as string[]);
  const [easyWordsId, setEasyWordsId] = useState([] as string[]);
  const [dbUserWords, setDbUserWords] = useState([] as IUserWord[]);
  const sectionsButtonsText = ['A1', 'A2', 'B1', 'B2', 'C1', 'C2'];
  const [buttonSectionCurrentIndex, setButtonSectionCurrentIndex] = useState(0);
  const [buttonWordCurrentIndex, setButtonWordCurrentIndex] = useState(0);
  const [textbookNumberPage, setTextbookNumberPage] = useState(0);
  const [token, setToken] = useState(localStorage.getItem('token') as string);
  const [gramophoneButtonDisabled, setGramophoneButtonDisabled] = useState(false);

  const [allWordsId, setAllWordsId] = useState([] as string[]);
  let filterAllWordsId = [] as string[];

  function chek20EasyWords(first: string[], second: IWord[]) {
    return first.reduce((acc: IWord[], item) => {
      const val = second.find(el => el.id === item);
      return val ? [...acc, val] : acc;
    }, []);
  }

  useEffect(() => {
    (async function () {
      const sessionStorageSectionButton = sessionStorage.getItem('sectionButtonNumber') as string || '0';
      const sessionStoragePageButton = sessionStorage.getItem('pageButtonNumber') as string || '0';
      const userId = localStorage.getItem('userId') as string;
      const token = localStorage.getItem('token') as string;

      setToken(token);

      let data: IWord[];
      if (sessionStorage.getItem('sectionButtonNumber') || sessionStorage.getItem('pageButtonNumber')) {
        data = await apiService.getAllWords(sessionStorageSectionButton, sessionStoragePageButton) as IWord[];
        setButtonWordCurrentIndex(0);
        setButtonSectionCurrentIndex(+sessionStorageSectionButton);
        setTextbookNumberPage(() => +sessionStoragePageButton);
      } else {
        sessionStorage.setItem('sectionButtonNumber', '0');
        sessionStorage.setItem('pageButtonNumber', '0');
        data = await apiService.getAllWords() as IWord[];
      }
      setWords(() => data);
      setWord(() => data[0]);

      if (token) {
        setCheck20WordsInPage([]);
        const authUserWords = await apiService.getAllUserWords(localStorage.getItem('userId') as string, localStorage.getItem('token') as string) as IUserWord[];
        if (authUserWords) {
          const id = authUserWords.reduce((acc, item) => item.difficulty === 'hard' ? [...acc, item.optional.wordId] : acc, [] as string[]) as string[];
          const studiedWordsId = authUserWords.reduce((acc, item) => item.optional.isStudied ? [...acc, item.optional.wordId] : acc, [] as string[]) as string[];
          filterAllWordsId = [...id, ...studiedWordsId];

          setAllWordsId(() => filterAllWordsId);

          setHardWordsId(() => id);
          setEasyWordsId(() => studiedWordsId);
          const arrWordsInPage = await apiService.getAllWords(sessionStorageSectionButton, sessionStoragePageButton) as IWord[];
          const check = chek20EasyWords(filterAllWordsId, arrWordsInPage);

          setCheck20WordsInPage(() => check);

          if (+sessionStorageSectionButton === INDEX_STAR_SECTION_BUTTON) {
            const data = await apiService.getAllAgregatedWordsFilterHard(userId, '3600', token) as [{ paginatedResults: IWord[], totalCount: [{ count: number }] }];
            setWords(() => data[0].paginatedResults);
            setWord(() => data[0].paginatedResults[0]);
          }
        }
        setDbUserWords(() => authUserWords)
      }
    })();
  }, [])


  const handlerClickHardWord = async (e: React.MouseEvent<HTMLButtonElement, MouseEvent>, wordId: string) => {
    const userId = localStorage.getItem('userId') as string;
    const token = localStorage.getItem('token') as string;

    setToken(token);
    if (INDEX_STAR_SECTION_BUTTON === buttonSectionCurrentIndex) {

      await apiService.deleteUserWord(userId, wordId, token);

      const dbDelWord = dbUserWords.filter((word) => word.optional.wordId !== wordId) as IUserWord[];
      setDbUserWords(() => dbDelWord);
      const deleteHardWordsId = hardWordsId.filter((id) => id !== wordId);

      filterAllWordsId = allWordsId.filter((id) => id !== wordId);
      setAllWordsId(() => filterAllWordsId);

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
      setCheck20WordsInPage([]);

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
      const data = await apiService.updateUserWord(userId, wordId, body, token) as IUserWord;

      setDbUserWords(() => [...dbDelWord, data])
      setHardWord([...hardWord, word]);
      setHardWordsId([...hardWordsId, wordId]);

      const arrWordsInPage = await apiService.getAllWords(buttonSectionCurrentIndex.toString(), textbookNumberPage.toString()) as IWord[];
      const check = chek20EasyWords(allWordsId, arrWordsInPage);
      setCheck20WordsInPage(() => check);
    } else {
      setCheck20WordsInPage([]);
      const body = {
        difficulty: 'hard',
        optional: {
          isStudied: false,
          activeColor: '#F5443B',
          wordId: wordId
        }
      };
      const data = await apiService.createUserWord(userId, wordId, body, token) as IUserWord;

      setDbUserWords(() => [...dbUserWords, data]);
      setHardWord([...hardWord, word]);
      setHardWordsId([...hardWordsId, wordId]);

      filterAllWordsId = [...allWordsId, wordId];
      setAllWordsId(() => filterAllWordsId);

      const arrWordsInPage = await apiService.getAllWords(buttonSectionCurrentIndex.toString(), textbookNumberPage.toString()) as IWord[];
      const check = chek20EasyWords(filterAllWordsId, arrWordsInPage);
      setCheck20WordsInPage(() => check);
    }
  }

  const handlerClickSectionButton = async (e: React.MouseEvent<HTMLButtonElement, MouseEvent>, index: number) => {
    setCheck20WordsInPage([]);
    setButtonWordCurrentIndex(0);
    setButtonSectionCurrentIndex(index);
    setTextbookNumberPage(0);
    const data = await apiService.getAllWords(index.toString(), '0') as IWord[];
    const check = chek20EasyWords(allWordsId, data);
    setCheck20WordsInPage(() => check);
    setWords(() => data);
    setWord(() => data[0]);
    sessionStorage.setItem('sectionButtonNumber', index.toString());
    sessionStorage.setItem('pageButtonNumber', '0');
  }

  const handlerClickHardButton = async () => {
    setCheck20WordsInPage([]);
    setButtonWordCurrentIndex(0);
    setButtonSectionCurrentIndex(10);
    setTextbookNumberPage(0);
    const userId = localStorage.getItem('userId') as string;
    const token = localStorage.getItem('token') as string;

    setToken(token);

    if (!token) {
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

  const handlerClickPrevPage = async () => {
    setCheck20WordsInPage([]);
    const page = textbookNumberPage - 1;
    const data = await apiService.getAllWords(buttonSectionCurrentIndex.toString(), page.toString()) as IWord[];
    const check = chek20EasyWords(allWordsId, data);
    setCheck20WordsInPage(() => check);
    setWords(() => data);
    setWord(() => data[0]);
    setTextbookNumberPage(() => page);
    setButtonWordCurrentIndex(0);
    sessionStorage.setItem('pageButtonNumber', page.toString());
  }

  const handlerClickNextPage = async () => {
    setCheck20WordsInPage([]);
    const page = textbookNumberPage + 1;
    const data = await apiService.getAllWords(buttonSectionCurrentIndex.toString(), page.toString()) as IWord[];
    const check = chek20EasyWords(allWordsId, data);
    setCheck20WordsInPage(() => check);
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
    setCheck20WordsInPage([]);

    if (INDEX_STAR_SECTION_BUTTON === buttonSectionCurrentIndex) {

      const dbDelWord = dbUserWords.filter((word) => word.optional.wordId !== wordId) as IUserWord[];
      const deleteHardWordsId = hardWordsId.filter((id) => id !== wordId);
      setHardWordsId(deleteHardWordsId);

      const body = {
        difficulty: 'easy',
        optional: {
          isStudied: true,
          activeColor: '#F5443B',
          wordId: wordId
        }
      };

      const put = await apiService.updateUserWord(userId, wordId, body, token) as IUserWord;

      setDbUserWords(() => [...dbDelWord, put]);
      setEasyWord([...easyWord, word]);
      setEasyWordsId([...easyWordsId, wordId]);

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

      await apiService.deleteUserWord(userId, wordId, token);

      const dbDelWord = dbUserWords.filter((word) => word.optional.wordId !== wordId) as IUserWord[];
      setDbUserWords(() => dbDelWord);
      const deleteEasyWordsId = easyWordsId.filter((id) => id !== wordId);

      filterAllWordsId = allWordsId.filter((id) => id !== wordId);
      setAllWordsId(() => filterAllWordsId);

      setEasyWordsId(deleteEasyWordsId);
      const deleteEasyWord = easyWord.filter((word) => (word.id || word._id) !== wordId);
      setEasyWord(deleteEasyWord);
      setWords(() => words);

      const data = await apiService.getAllWords(buttonSectionCurrentIndex.toString(), textbookNumberPage.toString()) as IWord[];
      const check = chek20EasyWords(filterAllWordsId, data);
      setCheck20WordsInPage(() => check);
      return;
    }

    if (hardWordsId.includes(wordId)) {

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
      const data = await apiService.updateUserWord(userId, wordId, body, token) as IUserWord;

      setDbUserWords(() => [...dbDelWord, data]);
      setEasyWord([...easyWord, word]);
      setEasyWordsId([...easyWordsId, wordId]);

      const arrWordsInPage = await apiService.getAllWords(buttonSectionCurrentIndex.toString(), textbookNumberPage.toString()) as IWord[];
      const check = chek20EasyWords(allWordsId, arrWordsInPage);
      setCheck20WordsInPage(() => check);
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
      setEasyWordsId(() => [...easyWordsId, wordId]);

      filterAllWordsId = [...allWordsId, wordId];
      setAllWordsId(() => filterAllWordsId);

      const arrWordsInPage = await apiService.getAllWords(buttonSectionCurrentIndex.toString(), textbookNumberPage.toString()) as IWord[];
      setCheck20WordsInPage(() => chek20EasyWords(filterAllWordsId, arrWordsInPage));
    }
  }

  const handlerClickAudio = async (e: React.MouseEvent<HTMLButtonElement, MouseEvent>, audio: string, audioMeaning: string, audioExample: string) => {
    setGramophoneButtonDisabled(true);
    const audioPlayer = new Audio(`${base}/${audio}`);
    audioPlayer.play();
    audioPlayer.onended = function () {
      const audioPlayer = new Audio(`${base}/${audioMeaning}`);
      audioPlayer.play();
      audioPlayer.onended = function () {
        const audioPlayer = new Audio(`${base}/${audioExample}`);
        audioPlayer.play();
        setGramophoneButtonDisabled(false);
      }
    }
  }

  return <div className={`${styles.texbook} ${check20WordsInPage.length === 20 ? styles['texbook_active'] : ''}`} >
    <div className={`${styles['textbook-games-buttons']} ${buttonSectionCurrentIndex === INDEX_STAR_SECTION_BUTTON ? styles['textbook-games-buttons_none'] : ''} ${check20WordsInPage.length === 20 ? styles['textbook-games-buttons__link_disabled'] : ''}`}>
      <a href={`http:audiocall/${sessionStorage.getItem('sectionButtonNumber')}/${sessionStorage.getItem('pageButtonNumber')}`} className={styles['textbook-games-buttons__link']}>Аудиовызов</a><a href={`http:audiocall/${sessionStorage.getItem('sectionButtonNumber')}/${sessionStorage.getItem('pageButtonNumber')}`} className={styles['textbook-games-buttons__link']}>Спринт</a>
    </div>
    <CreateTextbookSectionsButtons sections={sectionsButtonsText} buttonSectionCurrentIndex={buttonSectionCurrentIndex} onClickSectionButton={handlerClickSectionButton} onClickSectionHardButton={handlerClickHardButton} />
    <Word {...word} ClickStudiedWord={handlerClickStudiedWord} ClickHardWord={handlerClickHardWord} hardWordsId={hardWordsId} easyWordsId={easyWordsId} ClickAudio={handlerClickAudio} token={token} buttonSectionCurrentIndex={buttonSectionCurrentIndex} gramophoneButtonDisabled={gramophoneButtonDisabled} setGramophoneButtonDisabled={setGramophoneButtonDisabled} />
    <WordButtons words={words} buttonWordCurrentIndex={buttonWordCurrentIndex} clickWordButtons={handlerClickWordButtons} hardWord={hardWord} hardWordsId={hardWordsId} easyWordsId={easyWordsId} allWordsId={allWordsId} token={token} dbUserWords={dbUserWords} easyWord={easyWord} />
    <TextbookPagesButtons textbookNumberPage={textbookNumberPage} buttonSectionCurrentIndex={buttonSectionCurrentIndex} clickPrevPage={handlerClickPrevPage} clickNextPage={handlerClickNextPage} check20WordsInPage={check20WordsInPage} />
  </div>
}
export default Vocabulary
