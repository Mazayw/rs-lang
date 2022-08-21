import apiService from '../api/api-service'
import { useEffect, useState } from 'react'
import styles from './styles.module.scss'
import { IUser } from '../types/interface'

// @ts-ignore: Unreachable code error
function Auth({ active, setActive }) {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [emailDirty, setEmailDirty] = useState(false)
  const [passwordDirty, setPasswordDirty] = useState(false)
  const [emailError, setEmailError] = useState('E-mail не может быть пустым')
  const [passwordError, setPasswordError] = useState('Пароль не может быть пустым')
  const [formValid, setFormValid] = useState(false)

  useEffect(() => {
    emailError || passwordError ? setFormValid(false) : setFormValid(true)
  })

  const passwordHandler = (e: React.ChangeEvent<HTMLInputElement>): void => {
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

  const auth = (obj: IUser) => {
    const result = apiService.createUser(obj)
    console.log(result)
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
          onClick={() => auth({ name: email, email: email, password: password })}
        >
          Регистрация
        </button>
      </form>
    </div>
  )
}
export default Auth
