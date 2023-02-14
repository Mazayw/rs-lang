import { useContext, useEffect, useState } from 'react'
import styles from './styles.module.scss'
import { IUser } from '../types/interface'
import { Context } from '../../index'
import { observer } from 'mobx-react-lite'
import { createUser, signIn } from '../../http/userApi'

const Auth = observer(
  ({
    active,
    setActive,
    authType,
  }: {
    active: boolean
    setActive: React.Dispatch<React.SetStateAction<boolean>>
    authType: string
  }) => {
    const { store } = useContext(Context)
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [emailDirty, setEmailDirty] = useState(false)
    const [passwordDirty, setPasswordDirty] = useState(false)
    const [emailError, setEmailError] = useState('E-mail не может быть пустым')
    const [passwordError, setPasswordError] = useState('Пароль не может быть пустым')
    const [formValid, setFormValid] = useState(false)
    const [regInfo, setRegInfo] = useState('')

    useEffect(() => {
      emailError || passwordError ? setFormValid(false) : setFormValid(true)
    })

    useEffect(() => {
      const onKeypress = (e: KeyboardEvent) => {
        if (e.key === 'Enter') authHandler({ name: email, email: email, password: password })
      }
      document.addEventListener('keypress', onKeypress)
      return () => {
        document.removeEventListener('keypress', onKeypress)
      }
    }, [authType, email, password])

    const passwordHandler = (e: React.ChangeEvent<HTMLInputElement>): void => {
      setRegInfo('')
      setPassword(e.target.value)
      if (e.target.value.length < 8) {
        setPasswordError('Пароль должен быть длиннее 8 символов')
        if (!e.target.value) {
          setPasswordError('Пароль не может быть пустым')
        }
      } else {
        setPasswordError('')
      }
    }

    const emailHandler = (e: React.ChangeEvent<HTMLInputElement>): void => {
      setRegInfo('')
      setEmail(e.target.value)
      const reg =
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      if (!reg.test(String(e.target.value).toLowerCase())) {
        setEmailError('Некорректный E-mail')
      } else {
        setEmailError('')
      }
    }

    const blurHandler = (e: React.ChangeEvent<HTMLInputElement>): void => {
      switch (e.target.name) {
        case 'email':
          setEmailDirty(true)
          break
        case 'password':
          setPasswordDirty(true)
          break
      }
    }

    const authorization = async (body: IUser) => {
      store.setIsLoading(true)
      try {
        const resp = await signIn(body)
        setEmail('')
        setPassword('')
        setActive(false)
        console.log(resp)
        store.setIsAuth(true)
      } catch (error) {
        setRegInfo('Такое сочетание E-mail/пароль не найдено')
      } finally {
        store.setIsLoading(false)
      }
    }

    const authHandler = async (obj: IUser) => {
      store.setIsLoading(true)
      switch (authType) {
        case 'Регистрация': {
          try {
            await createUser(obj)
            await authorization(obj)
          } catch (error) {
            setRegInfo('Пожалуйста проверьте email/пароль')
          } finally {
            store.setIsLoading(false)
          }
          break
        }

        case 'Войти':
          await authorization(obj)
          break
      }
    }

    return (
      <div
        className={active ? `${styles['modal']} ${styles['active']}` : styles['modal']}
        onClick={() => setActive(false)}
      >
        <form className={styles['modal__content']} onClick={(e) => e.stopPropagation()}>
          {emailDirty && emailError && (
            <div className={`${styles.info} ${styles['info-email']}`}>{emailError}</div>
          )}
          {regInfo && <div className={`${styles.info} ${styles['info-email']}`}>{regInfo}</div>}

          <input
            className={`${styles['input']} ${styles['input-email']}`}
            onBlur={(e) => blurHandler(e)}
            onChange={(e) => emailHandler(e)}
            value={email}
            name='email'
            type='text'
            placeholder='e-mail'
          />
          {passwordDirty && passwordError && (
            <div className={`${styles.info} ${styles['info-pass']}`}>{passwordError}</div>
          )}
          <input
            className={`${styles['input']} ${styles['input-pass']}`}
            onBlur={(e) => blurHandler(e)}
            onChange={(e) => passwordHandler(e)}
            value={password}
            name='password'
            type='password'
            placeholder='password'
          />
          <button
            className={styles['button']}
            disabled={!formValid}
            type='button'
            onClick={() => authHandler({ name: email, email: email, password: password })}
          >
            {authType}
          </button>
        </form>
      </div>
    )
  },
)

export default Auth
